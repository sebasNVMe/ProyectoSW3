import { describe, expect, it, vi } from 'vitest';
import { NotFoundException } from '@nestjs/common';
import { AppointmentController } from './src/appointment/controllers/appointment.controller.js';
import { PatientController } from './src/people/controllers/patient.controller.js';
import { ProfessionalController } from './src/people/controllers/professional.controller.js';
import { UserController } from './src/auth/controllers/user.controller.js';
import { StatusAppointment } from './src/appointment/enums/statusAppointment.enum.js';
import { SpecialityProfEnum } from './src/people/enums/professional.enums.js';
import { RoleUserEnum } from './src/auth/enums/roleUser.enum.js';

const responseMock = () => ({ status: vi.fn(), location: vi.fn() });

// CONTROLLER DE APPOINTMENT
describe('AppointmentController', () => {
  const service = {
    findAll: vi.fn(), generateAvailableSlots: vi.fn(),
    findFirstAvailableBySpeciality: vi.fn(), findByCodProf: vi.fn(),
    findByCodPatient: vi.fn(), findByStatus: vi.fn(),
    findByCodProfAndDate: vi.fn(), findByDateApp: vi.fn(), findById: vi.fn(),
    create: vi.fn(), update: vi.fn(), cancel: vi.fn(),
  };
  const controller = new AppointmentController(service as never);

  it('delega findAll al servicio', () => {
    service.findAll.mockReturnValue('all');
    expect(controller.findAll()).toBe('all');
    expect(service.findAll).toHaveBeenCalledOnce();
  });
  it('obtiene citas generadas con el identificador de profesional', () => {
    controller.getGeneratedAppointments('27', '2026-10-02', SpecialityProfEnum.General);
    expect(service.generateAvailableSlots).toHaveBeenCalledWith(27, '2026-10-02', SpecialityProfEnum.General);
  });
  it('obtiene citas generadas sin filtros opcionales', () => {
    controller.getGeneratedAppointments();
    expect(service.generateAvailableSlots).toHaveBeenCalledWith(undefined, undefined, undefined);
  });
  it('genera citas por especialidad', () => {
    controller.generateBySpeciality(SpecialityProfEnum.Physiotherapy);
    expect(service.generateAvailableSlots).toHaveBeenCalledWith(undefined, undefined, SpecialityProfEnum.Physiotherapy);
  });
  it('encuentra la primera cita disponible por especialidad', () => {
    controller.findFirstAvailable(SpecialityProfEnum.General);
    expect(service.findFirstAvailableBySpeciality).toHaveBeenCalledWith(SpecialityProfEnum.General);
  });
  it('encuentra citas por profesional', () => {
    controller.findByCodProf(12);
    expect(service.findByCodProf).toHaveBeenCalledWith(12);
  });
  it('encuentra citas por paciente', () => {
    controller.findByCodPatient(13);
    expect(service.findByCodPatient).toHaveBeenCalledWith(13);
  });
  it('encuentra citas por estado', () => {
    controller.findByStatus(StatusAppointment.SCHEDULED);
    expect(service.findByStatus).toHaveBeenCalledWith(StatusAppointment.SCHEDULED);
  });
  it('encuentra citas para un profesional en una fecha', () => {
    controller.findByCodProfAndDate(12, '2026-10-02');
    expect(service.findByCodProfAndDate).toHaveBeenCalledWith(12, '2026-10-02');
  });
  it('encuentra citas por fecha', () => {
    controller.findByDate('2026-10-02');
    expect(service.findByDateApp).toHaveBeenCalledWith('2026-10-02');
  });
  it('encuentra una cita por id', () => {
    controller.findById(9);
    expect(service.findById).toHaveBeenCalledWith(9);
  });
  it('crea una cita', () => {
    const dto = { codPatient: 13 };
    controller.create(dto as never);
    expect(service.create).toHaveBeenCalledWith(dto);
  });
  it('actualiza una cita', () => {
    const dto = { reason: 'control' };
    controller.update(9, dto as never);
    expect(service.update).toHaveBeenCalledWith(9, dto);
  });
  it('actualiza el estado de una cita', () => {
    controller.updateStatus(9, StatusAppointment.COMPLETED);
    expect(service.update).toHaveBeenCalledWith(9, { statusApp: StatusAppointment.COMPLETED });
  });
  it('cancela una cita', () => {
    controller.cancel(9);
    expect(service.cancel).toHaveBeenCalledWith(9);
  });
});

// CONTROLLER DEL PATIENT
describe('PatientController', () => {
  const service = {
    findAll: vi.fn(), findByIdPatient: vi.fn(), register: vi.fn(),
    update: vi.fn(), deactivate: vi.fn(), findByCodPatient: vi.fn(),
  };
  const controller = new PatientController(service as never);

  it('devuelve pacientes cuando el servicio tiene registros', async () => {
    const patients = [{ codPatient: 1 }];
    const response = responseMock();
    service.findAll.mockResolvedValue(patients);
    await expect(controller.findAll(response as never)).resolves.toBe(patients);
    expect(response.status).not.toHaveBeenCalled();
  });
  it('devuelve una lista vacía y establece 204 cuando no hay pacientes', async () => {
    const response = responseMock();
    service.findAll.mockResolvedValue([]);
    await expect(controller.findAll(response as never)).resolves.toEqual([]);
    expect(response.status).toHaveBeenCalledWith(204);
  });
  it('encuentra un paciente por id', async () => {
    const patient = { codPatient: 1 };
    service.findByIdPatient.mockResolvedValue(patient);
    await expect(controller.findById(1)).resolves.toBe(patient);
    expect(service.findByIdPatient).toHaveBeenCalledWith(1);
  });
  it('lanza NotFoundException cuando no existe el id del paciente', async () => {
    service.findByIdPatient.mockResolvedValue(undefined);
    await expect(controller.findById(404)).rejects.toBeInstanceOf(NotFoundException);
  });
  it('registra un paciente y establece la cabecera de ubicación', async () => {
    const dto = { firstName: 'Ana' };
    const patient = { codPatient: 23 };
    const response = responseMock();
    service.register.mockResolvedValue(patient);
    await expect(controller.register(dto as never, response as never)).resolves.toBe(patient);
    expect(service.register).toHaveBeenCalledWith(dto);
    expect(response.location).toHaveBeenCalledWith('/patients/23');
  });
  it('actualiza un paciente', async () => {
    const dto = { phone: '123' };
    const patient = { codPatient: 1 };
    service.update.mockResolvedValue(patient);
    await expect(controller.update(1, dto as never)).resolves.toBe(patient);
    expect(service.update).toHaveBeenCalledWith(1, dto);
  });
  it('desactiva un paciente', async () => {
    service.deactivate.mockResolvedValue(undefined);
    await expect(controller.delete(1)).resolves.toBeUndefined();
    expect(service.deactivate).toHaveBeenCalledWith(1);
  });
  it('encuentra un paciente por código', async () => {
    const patient = { codPatient: 1 };
    service.findByCodPatient.mockResolvedValue(patient);
    await expect(controller.findByCod(1)).resolves.toBe(patient);
    expect(service.findByCodPatient).toHaveBeenCalledWith(1);
  });
  it('lanza NotFoundException cuando no existe el código del paciente', async () => {
    service.findByCodPatient.mockResolvedValue(null);
    await expect(controller.findByCod(404)).rejects.toBeInstanceOf(NotFoundException);
  });
});

//CONTROLLER DE PROFESSIONAL
describe('ProfessionalController', () => {
  const service = {
    findAll: vi.fn(), findByCedUser: vi.fn(), findBySpeciality: vi.fn(),
    register: vi.fn(), update: vi.fn(), deactivate: vi.fn(), findByCodProf: vi.fn(),
  };
  const controller = new ProfessionalController(service as never);

  it('devuelve profesionales cuando el servicio tiene registros', async () => {
    const professionals = [{ codProf: 1 }];
    const response = responseMock();
    service.findAll.mockResolvedValue(professionals);
    await expect(controller.findAll(response as never)).resolves.toBe(professionals);
    expect(response.status).not.toHaveBeenCalled();
  });
  it('devuelve una lista vacía y establece 204 cuando no hay profesionales', async () => {
    const response = responseMock();
    service.findAll.mockResolvedValue([]);
    await expect(controller.findAll(response as never)).resolves.toEqual([]);
    expect(response.status).toHaveBeenCalledWith(204);
  });
  it('encuentra un profesional por código de usuario', async () => {
    const professional = { codProf: 3 };
    service.findByCedUser.mockResolvedValue(professional);
    await expect(controller.findByCodUser(8)).resolves.toBe(professional);
    expect(service.findByCedUser).toHaveBeenCalledWith(8);
  });
  it('lanza NotFoundException cuando el usuario no tiene perfil profesional', async () => {
    service.findByCedUser.mockResolvedValue(undefined);
    await expect(controller.findByCodUser(404)).rejects.toBeInstanceOf(NotFoundException);
  });
  it('encuentra profesionales por especialidad', async () => {
    const professionals = [{ codProf: 3 }];
    const response = responseMock();
    service.findBySpeciality.mockResolvedValue(professionals);
    await expect(controller.findBySpeciality(SpecialityProfEnum.General, response as never)).resolves.toBe(professionals);
    expect(service.findBySpeciality).toHaveBeenCalledWith(SpecialityProfEnum.General);
    expect(response.status).not.toHaveBeenCalled();
  });
  it('establece 204 cuando no hay profesionales en la especialidad', async () => {
    const response = responseMock();
    service.findBySpeciality.mockResolvedValue([]);
    await expect(controller.findBySpeciality(SpecialityProfEnum.General, response as never)).resolves.toEqual([]);
    expect(response.status).toHaveBeenCalledWith(204);
  });
  it('registra un profesional y establece la cabecera de ubicación', async () => {
    const dto = { firstName: 'Luis' };
    const professional = { codProf: 5 };
    const response = responseMock();
    service.register.mockResolvedValue(professional);
    await expect(controller.register(dto as never, response as never)).resolves.toBe(professional);
    expect(service.register).toHaveBeenCalledWith(dto);
    expect(response.location).toHaveBeenCalledWith('/professionals/5');
  });
  it('actualiza un profesional', async () => {
    const dto = { phone: '123' };
    const professional = { codProf: 5 };
    service.update.mockResolvedValue(professional);
    await expect(controller.update(5, dto as never)).resolves.toBe(professional);
    expect(service.update).toHaveBeenCalledWith(5, dto);
  });
  it('desactiva un profesional', async () => {
    service.deactivate.mockResolvedValue(undefined);
    await expect(controller.deactivate(5)).resolves.toBeUndefined();
    expect(service.deactivate).toHaveBeenCalledWith(5);
  });
  it('encuentra un profesional por código', async () => {
    const professional = { codProf: 5 };
    service.findByCodProf.mockResolvedValue(professional);
    await expect(controller.findByCodigo(5)).resolves.toBe(professional);
    expect(service.findByCodProf).toHaveBeenCalledWith(5);
  });
  it('lanza NotFoundException cuando no existe el código del profesional', async () => {
    service.findByCodProf.mockResolvedValue(null);
    await expect(controller.findByCodigo(404)).rejects.toBeInstanceOf(NotFoundException);
  });
});

// CONTROLLER DE AUTH
describe('UserController (auth)', () => {
  const service = {
    login: vi.fn(), register: vi.fn(), findByRole: vi.fn(), findByCedula: vi.fn(),
    findByCodigoUser: vi.fn(), update: vi.fn(), deactivate: vi.fn(),
  };
  const controller = new UserController(service as never);

  it('inicio de sesión', () => {
    const dto = { username: 'ana' };
    controller.login(dto as never);
    expect(service.login).toHaveBeenCalledWith(dto);
  });
  it('registro de un usuario', () => {
    const dto = { username: 'ana' };
    controller.register(dto as never);
    expect(service.register).toHaveBeenCalledWith(dto);
  });
  it('Encuentra usuarios por rol', () => {
    controller.findByRole(RoleUserEnum.PATIENT);
    expect(service.findByRole).toHaveBeenCalledWith(RoleUserEnum.PATIENT);
  });
  it('Encuentra usuarios por Id', () => {
    controller.findByCedula(101);
    expect(service.findByCedula).toHaveBeenCalledWith(101);
  });
  it('Encuentra usuarios por código', () => {
    controller.findByCodigo(21);
    expect(service.findByCodigoUser).toHaveBeenCalledWith(21);
  });
  it('Actualiza un usuario', () => {
    const dto = { phone: '123' };
    controller.update(21, dto as never);
    expect(service.update).toHaveBeenCalledWith(21, dto);
  });
  it('Desactiva un usuario', () => {
    controller.deactivate(21);
    expect(service.deactivate).toHaveBeenCalledWith(21);
  });
});
