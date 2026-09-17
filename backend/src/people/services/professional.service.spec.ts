import { ConflictException } from '@nestjs/common';
import { ProfessionalService } from './professional.service.js';
import { SpecialityProfEnum, TypeProfEnum } from '../enums/professional.enums.js';

describe('ProfessionalService', () => {
  const professionals = { exists: vi.fn(), create: vi.fn(), save: vi.fn(), find: vi.fn(), findOneBy: vi.fn(), findBy: vi.fn(), findOne: vi.fn() };
  const users = { findOneBy: vi.fn() };
  const service = new ProfessionalService(professionals as never, users as never);

  beforeEach(() => vi.clearAllMocks());

  it('rejects a schedule where arrival is after departure', async () => {
    users.findOneBy.mockResolvedValue({ codUser: 1 });
    professionals.exists.mockResolvedValue(false);

    await expect(service.register({
      codUser: 1, genProf: 'F', typeProf: TypeProfEnum.Doctor, specialityProf: SpecialityProfEnum.General,
      arrivalTime: '18:00', departureTime: '08:00', attentionInterval: 30,
    })).rejects.toBeInstanceOf(ConflictException);
  });
});
