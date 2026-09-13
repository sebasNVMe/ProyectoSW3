export class LoginResponseDto {
  constructor(
    public token: string,
    public role: string,
    public codUser: number,
    public cedUser: number,
    public nameUser: string,
  ) {}
}
