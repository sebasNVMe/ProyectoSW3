import {
  BadRequestException,
  ConflictException,
  Injectable,
  InternalServerErrorException,
  Logger,
  ServiceUnavailableException,
  UnauthorizedException,
} from '@nestjs/common';
import { ConfigService } from '@nestjs/config';

export interface KeycloakTokenResponse {
  access_token: string;
  expires_in: number;
  refresh_token?: string;
}

export interface CreateKeycloakUser {
  username: string;
  firstName: string;
  lastName: string;
  password: string;
  role: string;
}

@Injectable()
export class KeycloakService {
  private readonly logger = new Logger(KeycloakService.name);
  private readonly baseUrl: string;
  private readonly realm: string;
  private readonly clientId: string;
  private readonly clientSecret: string;

  constructor(config: ConfigService) {
    // getOrThrow hace que la app no arranque si falta una variable
    this.baseUrl = config.getOrThrow<string>('KEYCLOAK_URL');
    this.realm = config.getOrThrow<string>('KEYCLOAK_REALM');
    this.clientId = config.getOrThrow<string>('KEYCLOAK_CLIENT_ID');
    this.clientSecret = config.getOrThrow<string>('KEYCLOAK_CLIENT_SECRET');
  }

  private get tokenUrl(): string {
    return `${this.baseUrl}/realms/${this.realm}/protocol/openid-connect/token`;
  }

  private get adminUrl(): string {
    return `${this.baseUrl}/admin/realms/${this.realm}`;
  }

  /** Autentica a un usuario con su cédula y contraseña. */
  async login(
    username: string,
    password: string,
  ): Promise<KeycloakTokenResponse> {
    const res = await this.post(
      this.tokenUrl,
      new URLSearchParams({
        grant_type: 'password',
        client_id: this.clientId,
        client_secret: this.clientSecret,
        username,
        password,
      }),
    );

    if (!res.ok) {
      // El detalle real queda en el log del servidor, no se le muestra al cliente
      const body = await res.json().catch(() => ({}));
      this.logger.warn(
        `Login rechazado (${res.status}): ${body.error_description ?? body.error ?? 'sin detalle'}`,
      );
      throw new UnauthorizedException('Cédula o contraseña incorrectas');
    }
    return (await res.json()) as KeycloakTokenResponse;
  }

  /** Crea el usuario en Keycloak, le asigna el rol y devuelve su id. */
  async createUser(data: CreateKeycloakUser): Promise<string> {
    const headers = await this.adminHeaders();

    const res = await this.fetchOrFail(`${this.adminUrl}/users`, {
      method: 'POST',
      headers,
      body: JSON.stringify({
        username: data.username,
        firstName: data.firstName,
        lastName: data.lastName,
        enabled: true,
        credentials: [
          { type: 'password', value: data.password, temporary: false },
        ],
      }),
    });

    if (res.status === 409) {
      throw new ConflictException('Ya existe un usuario con esa cédula');
    }
    if (res.status === 400) {
      const body = await res.json().catch(() => ({}));
      throw new BadRequestException(
        body.errorMessage ?? 'Datos de usuario inválidos',
      );
    }
    if (!res.ok) {
      this.logger.error(`Crear usuario falló (${res.status})`);
      throw new InternalServerErrorException('No se pudo crear el usuario');
    }

    // Keycloak devuelve el id del nuevo usuario al final de la cabecera Location
    const userId = res.headers.get('Location')?.split('/').pop();
    if (!userId) {
      throw new InternalServerErrorException(
        'Keycloak no devolvió el id del usuario',
      );
    }

    try {
      await this.assignRealmRole(userId, data.role, headers);
    } catch (error) {
      // Si falla el rol, no dejamos un usuario a medias en Keycloak
      await this.deleteUser(userId).catch(() => undefined);
      throw error;
    }
    return userId;
  }

  /** Borra un usuario de Keycloak. Se usa para deshacer registros incompletos. */
  async deleteUser(userId: string): Promise<void> {
    const headers = await this.adminHeaders();
    await this.fetchOrFail(`${this.adminUrl}/users/${userId}`, {
      method: 'DELETE',
      headers,
    });
  }

  private async assignRealmRole(
    userId: string,
    roleName: string,
    headers: Record<string, string>,
  ): Promise<void> {
    const roleRes = await this.fetchOrFail(
      `${this.adminUrl}/roles/${roleName}`,
      { headers },
    );
    if (!roleRes.ok) {
      this.logger.error(`El rol ${roleName} no existe en el realm`);
      throw new InternalServerErrorException(
        'No se pudo asignar el rol al usuario',
      );
    }
    const role = await roleRes.json();

    const mapRes = await this.fetchOrFail(
      `${this.adminUrl}/users/${userId}/role-mappings/realm`,
      {
        method: 'POST',
        headers,
        body: JSON.stringify([role]),
      },
    );
    if (!mapRes.ok) {
      this.logger.error(`Asignar rol falló (${mapRes.status})`);
      throw new InternalServerErrorException(
        'No se pudo asignar el rol al usuario',
      );
    }
  }

  /** Token del propio backend (cuenta de servicio) para usar la Admin API. */
  private async adminHeaders(): Promise<Record<string, string>> {
    const res = await this.post(
      this.tokenUrl,
      new URLSearchParams({
        grant_type: 'client_credentials',
        client_id: this.clientId,
        client_secret: this.clientSecret,
      }),
    );
    if (!res.ok) {
      this.logger.error(`No se obtuvo el token de servicio (${res.status})`);
      throw new InternalServerErrorException(
        'No se pudo conectar con el servidor de autenticación',
      );
    }
    const data = (await res.json()) as KeycloakTokenResponse;
    return {
      Authorization: `Bearer ${data.access_token}`,
      'Content-Type': 'application/json',
    };
  }

  private post(url: string, body: URLSearchParams): Promise<Response> {
    return this.fetchOrFail(url, {
      method: 'POST',
      headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
      body,
    });
  }

  /** Convierte un fallo de red (Keycloak apagado) en un error HTTP claro. */
  private async fetchOrFail(url: string, init: RequestInit): Promise<Response> {
    try {
      return await fetch(url, init);
    } catch {
      throw new ServiceUnavailableException(
        'El servidor de autenticación no está disponible',
      );
    }
  }

  /** Cambia la contraseña de un usuario (no temporal). */
  async resetPassword(userId: string, password: string): Promise<void> {
    const headers = await this.adminHeaders();
    const res = await this.fetchOrFail(
      `${this.adminUrl}/users/${userId}/reset-password`,
      {
        method: 'PUT',
        headers,
        body: JSON.stringify({
          type: 'password',
          value: password,
          temporary: false,
        }),
      },
    );
    if (res.status === 400) {
      const body = await res.json().catch(() => ({}));
      throw new BadRequestException(body.errorMessage ?? 'Contraseña inválida');
    }
    if (!res.ok) {
      throw new InternalServerErrorException(
        'No se pudo cambiar la contraseña',
      );
    }
  }

  /** Habilita o deshabilita la cuenta; un usuario deshabilitado no puede iniciar sesión. */
  async setEnabled(userId: string, enabled: boolean): Promise<void> {
    const headers = await this.adminHeaders();
    const url = `${this.adminUrl}/users/${userId}`;

    // Se lee la representación completa y se reenvía con el cambio: con el perfil
    // de usuario declarativo, un PUT parcial podría borrar otros atributos.
    const current = await this.fetchOrFail(url, { headers });
    if (!current.ok) {
      throw new InternalServerErrorException('No se pudo consultar el usuario');
    }
    const representation = await current.json();

    const res = await this.fetchOrFail(url, {
      method: 'PUT',
      headers,
      body: JSON.stringify({ ...representation, enabled }),
    });
    if (!res.ok) {
      throw new InternalServerErrorException(
        'No se pudo actualizar el estado del usuario',
      );
    }
  }
}
