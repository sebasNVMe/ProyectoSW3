import { ConflictException, NotFoundException } from '@nestjs/common';
import { PatientService } from './patient.service.js';

describe('PatientService', () => {
  const repository = {
    existsBy: vi.fn(), create: vi.fn(), save: vi.fn(), findOneBy: vi.fn(), delete: vi.fn(), find: vi.fn(),
  };
  const service = new PatientService(repository as never);

  beforeEach(() => vi.clearAllMocks());

  it('rejects a duplicated identification', async () => {
    repository.existsBy.mockResolvedValue(true);

    await expect(service.register({ idPatient: 1, namePatient: 'Ana', lastNamePatient: 'Díaz', genderPatient: 'F' }))
      .rejects.toBeInstanceOf(ConflictException);
    expect(repository.save).not.toHaveBeenCalled();
  });

  it('updates only fields with a value', async () => {
    const patient = { codPatient: 1, namePatient: 'Ana', phonePatient: '3000000000' };
    repository.findOneBy.mockResolvedValue(patient);
    repository.save.mockImplementation(async (entity) => entity);

    const result = await service.update(1, { namePatient: 'Ana María', phonePatient: 3100000000 });

    expect(result).toMatchObject({ namePatient: 'Ana María', phonePatient: '3100000000' });
  });

  it('reports a missing patient when deleting', async () => {
    repository.delete.mockResolvedValue({ affected: 0 });
    await expect(service.delete(99)).rejects.toBeInstanceOf(NotFoundException);
  });
});
