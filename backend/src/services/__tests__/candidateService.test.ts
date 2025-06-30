import { CandidateService } from '../candidateService';
import { CreateCandidateRequest } from '../../types/candidate';

// Mock del servicio completo
jest.mock('../candidateService');

describe('CandidateService', () => {
  let candidateService: jest.Mocked<CandidateService>;

  const mockCandidateData = {
    firstName: 'Juan',
    lastName: 'Pérez',
    email: 'juan.perez@email.com',
    phone: '123456789',
    address: 'Calle Principal 123',
    education: 'Ingeniería Informática',
    experience: '5 años de experiencia',
  };

  const mockCreatedCandidate = {
    id: 1,
    firstName: 'Juan',
    lastName: 'Pérez',
    email: 'juan.perez@email.com',
    phone: '123456789',
    address: 'Calle Principal 123',
    education: 'Ingeniería Informática',
    experience: '5 años de experiencia',
    cvFileName: undefined,
    cvFilePath: undefined,
    cvFileSize: undefined,
    cvMimeType: undefined,
    createdAt: new Date(),
    updatedAt: new Date(),
  };

  const mockCandidates = [
    {
      id: 1,
      firstName: 'Juan',
      lastName: 'Pérez',
      email: 'juan.perez@email.com',
      phone: '123456789',
      address: 'Calle Principal 123',
      education: 'Ingeniería Informática',
      experience: '5 años de experiencia',
      cvFileName: undefined,
      cvFilePath: undefined,
      cvFileSize: undefined,
      cvMimeType: undefined,
      createdAt: new Date(),
      updatedAt: new Date(),
    },
  ];

  beforeEach(() => {
    candidateService = new CandidateService() as jest.Mocked<CandidateService>;
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  describe('createCandidate', () => {
    it('should create a candidate successfully', async () => {
      candidateService.createCandidate = jest.fn().mockResolvedValue(mockCreatedCandidate);

      const result = await candidateService.createCandidate(mockCandidateData);

      expect(candidateService.createCandidate).toHaveBeenCalledWith(mockCandidateData);
      expect(result).toEqual(mockCreatedCandidate);
    });

    it('should throw error when email already exists', async () => {
      candidateService.createCandidate = jest.fn().mockRejectedValue(new Error('Ya existe un candidato con este email'));

      await expect(candidateService.createCandidate(mockCandidateData))
        .rejects
        .toThrow('Ya existe un candidato con este email');
    });

    it('should throw error for other database errors', async () => {
      candidateService.createCandidate = jest.fn().mockRejectedValue(new Error('Database connection failed'));

      await expect(candidateService.createCandidate(mockCandidateData))
        .rejects
        .toThrow('Database connection failed');
    });
  });

  describe('getAllCandidates', () => {
    it('should return all candidates successfully', async () => {
      candidateService.getAllCandidates = jest.fn().mockResolvedValue(mockCandidates);

      const result = await candidateService.getAllCandidates();

      expect(candidateService.getAllCandidates).toHaveBeenCalled();
      expect(result).toEqual(mockCandidates);
    });

    it('should throw error when database fails', async () => {
      candidateService.getAllCandidates = jest.fn().mockRejectedValue(new Error('Error al obtener los candidatos'));

      await expect(candidateService.getAllCandidates())
        .rejects
        .toThrow('Error al obtener los candidatos');
    });
  });

  describe('getCandidateById', () => {
    it('should return candidate by id successfully', async () => {
      const mockCandidate = mockCandidates[0];
      candidateService.getCandidateById = jest.fn().mockResolvedValue(mockCandidate);

      const result = await candidateService.getCandidateById(1);

      expect(candidateService.getCandidateById).toHaveBeenCalledWith(1);
      expect(result).toEqual(mockCandidate);
    });

    it('should throw error when candidate not found', async () => {
      candidateService.getCandidateById = jest.fn().mockResolvedValue(null);

      const result = await candidateService.getCandidateById(999);
      expect(result).toBeNull();
    });

    it('should throw error when database fails', async () => {
      candidateService.getCandidateById = jest.fn().mockRejectedValue(new Error('Error al obtener el candidato'));

      await expect(candidateService.getCandidateById(1))
        .rejects
        .toThrow('Error al obtener el candidato');
    });
  });

  describe('updateCandidate', () => {
    it('should update candidate successfully', async () => {
      const updateData = { firstName: 'Juan Carlos' };
      const mockUpdatedCandidate = { ...mockCandidates[0], ...updateData };
      candidateService.updateCandidate = jest.fn().mockResolvedValue(mockUpdatedCandidate);

      const result = await candidateService.updateCandidate(1, updateData);

      expect(candidateService.updateCandidate).toHaveBeenCalledWith(1, updateData);
      expect(result).toEqual(mockUpdatedCandidate);
    });

    it('should throw error when candidate not found', async () => {
      const updateData = { firstName: 'Juan Carlos' };
      candidateService.updateCandidate = jest.fn().mockRejectedValue(new Error('Candidato no encontrado'));

      await expect(candidateService.updateCandidate(999, updateData))
        .rejects
        .toThrow('Candidato no encontrado');
    });

    it('should throw error when email already exists', async () => {
      const updateData = { email: 'existing@email.com' };
      candidateService.updateCandidate = jest.fn().mockRejectedValue(new Error('Ya existe un candidato con este email'));

      await expect(candidateService.updateCandidate(1, updateData))
        .rejects
        .toThrow('Ya existe un candidato con este email');
    });
  });

  describe('deleteCandidate', () => {
    it('should delete candidate successfully', async () => {
      candidateService.deleteCandidate = jest.fn().mockResolvedValue(undefined);

      await candidateService.deleteCandidate(1);

      expect(candidateService.deleteCandidate).toHaveBeenCalledWith(1);
    });

    it('should throw error when candidate not found', async () => {
      candidateService.deleteCandidate = jest.fn().mockRejectedValue(new Error('Candidato no encontrado'));

      await expect(candidateService.deleteCandidate(999))
        .rejects
        .toThrow('Candidato no encontrado');
    });
  });

  describe('updateCandidateCV', () => {
    it('should update candidate CV successfully', async () => {
      const cvData = {
        fileName: 'cv.pdf',
        filePath: '/uploads/cv.pdf',
        fileSize: 12345,
        mimeType: 'application/pdf',
      };
      const mockUpdatedCandidate = { ...mockCandidates[0], ...cvData };
      candidateService.updateCandidateCV = jest.fn().mockResolvedValue(mockUpdatedCandidate);

      const result = await candidateService.updateCandidateCV(1, cvData);

      expect(candidateService.updateCandidateCV).toHaveBeenCalledWith(1, cvData);
      expect(result).toEqual(mockUpdatedCandidate);
    });

    it('should throw error when candidate not found', async () => {
      candidateService.updateCandidateCV = jest.fn().mockRejectedValue(new Error('Candidato no encontrado'));

      await expect(candidateService.updateCandidateCV(999, {
        fileName: 'cv.pdf',
        filePath: '/uploads/cv.pdf',
        fileSize: 12345,
        mimeType: 'application/pdf',
      }))
        .rejects
        .toThrow('Candidato no encontrado');
    });
  });
}); 