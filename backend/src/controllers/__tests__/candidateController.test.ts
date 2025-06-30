import { Request, Response } from 'express';
import { CandidateController } from '../candidateController';
import { CandidateService } from '../../services/candidateService';

// Mock del servicio
jest.mock('../../services/candidateService');

const mockCandidateService = CandidateService as jest.MockedClass<typeof CandidateService>;

describe('CandidateController', () => {
  let candidateController: CandidateController;
  let mockRequest: Partial<Request>;
  let mockResponse: Partial<Response>;
  let mockJson: jest.Mock;
  let mockStatus: jest.Mock;

  beforeEach(() => {
    jest.clearAllMocks();
    candidateController = new CandidateController();
    
    mockJson = jest.fn();
    mockStatus = jest.fn().mockReturnValue({ json: mockJson });
    
    mockResponse = {
      status: mockStatus,
      json: mockJson,
    };
  });

  describe('createCandidate', () => {
    it('should create candidate successfully', async () => {
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

      mockRequest = { body: mockCandidateData };
      jest.spyOn(mockCandidateService.prototype, 'createCandidate').mockResolvedValue(mockCreatedCandidate);

      await candidateController.createCandidate(
        mockRequest as Request,
        mockResponse as Response
      );

      expect(mockCandidateService.prototype.createCandidate).toHaveBeenCalledWith(mockCandidateData);
      expect(mockStatus).toHaveBeenCalledWith(201);
      expect(mockJson).toHaveBeenCalledWith({
        success: true,
        message: 'Candidato creado exitosamente',
        data: mockCreatedCandidate,
      });
    });

    it('should handle validation error', async () => {
      const mockCandidateData = {
        firstName: 'Juan',
        lastName: 'Pérez',
        email: 'existing@email.com',
      };

      mockRequest = { body: mockCandidateData };
      jest.spyOn(mockCandidateService.prototype, 'createCandidate').mockRejectedValue(new Error('Ya existe un candidato con este email'));

      await candidateController.createCandidate(
        mockRequest as Request,
        mockResponse as Response
      );

      expect(mockStatus).toHaveBeenCalledWith(400);
      expect(mockJson).toHaveBeenCalledWith({
        success: false,
        message: 'Ya existe un candidato con este email',
      });
    });
  });

  describe('getAllCandidates', () => {
    it('should return all candidates successfully', async () => {
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

      mockRequest = {};
      jest.spyOn(mockCandidateService.prototype, 'getAllCandidates').mockResolvedValue(mockCandidates);

      await candidateController.getAllCandidates(
        mockRequest as Request,
        mockResponse as Response
      );

      expect(mockCandidateService.prototype.getAllCandidates).toHaveBeenCalled();
      expect(mockStatus).toHaveBeenCalledWith(200);
      expect(mockJson).toHaveBeenCalledWith({
        success: true,
        data: mockCandidates,
      });
    });
  });

  describe('getCandidateById', () => {
    it('should return candidate by id successfully', async () => {
      const mockCandidate = {
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

      mockRequest = { params: { id: '1' } };
      jest.spyOn(mockCandidateService.prototype, 'getCandidateById').mockResolvedValue(mockCandidate);

      await candidateController.getCandidateById(
        mockRequest as Request,
        mockResponse as Response
      );

      expect(mockCandidateService.prototype.getCandidateById).toHaveBeenCalledWith(1);
      expect(mockStatus).toHaveBeenCalledWith(200);
      expect(mockJson).toHaveBeenCalledWith({
        success: true,
        data: mockCandidate,
      });
    });

    it('should handle candidate not found', async () => {
      mockRequest = { params: { id: '999' } };
      jest.spyOn(mockCandidateService.prototype, 'getCandidateById').mockResolvedValue(null);

      await candidateController.getCandidateById(
        mockRequest as Request,
        mockResponse as Response
      );

      expect(mockStatus).toHaveBeenCalledWith(404);
      expect(mockJson).toHaveBeenCalledWith({
        success: false,
        message: 'Candidato no encontrado',
      });
    });
  });

  describe('updateCandidate', () => {
    it('should update candidate successfully', async () => {
      const updateData = {
        firstName: 'Juan Carlos',
        phone: '987654321',
      };

      const mockUpdatedCandidate = {
        id: 1,
        firstName: 'Juan Carlos',
        lastName: 'Pérez',
        email: 'juan.perez@email.com',
        phone: '987654321',
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

      mockRequest = { params: { id: '1' }, body: updateData };
      jest.spyOn(mockCandidateService.prototype, 'updateCandidate').mockResolvedValue(mockUpdatedCandidate);

      await candidateController.updateCandidate(
        mockRequest as Request,
        mockResponse as Response
      );

      expect(mockCandidateService.prototype.updateCandidate).toHaveBeenCalledWith(1, updateData);
      expect(mockStatus).toHaveBeenCalledWith(200);
      expect(mockJson).toHaveBeenCalledWith({
        success: true,
        message: 'Candidato actualizado exitosamente',
        data: mockUpdatedCandidate,
      });
    });
  });

  describe('deleteCandidate', () => {
    it('should delete candidate successfully', async () => {
      mockRequest = { params: { id: '1' } };
      jest.spyOn(mockCandidateService.prototype, 'deleteCandidate').mockResolvedValue(undefined);

      await candidateController.deleteCandidate(
        mockRequest as Request,
        mockResponse as Response
      );

      expect(mockCandidateService.prototype.deleteCandidate).toHaveBeenCalledWith(1);
      expect(mockStatus).toHaveBeenCalledWith(200);
      expect(mockJson).toHaveBeenCalledWith({
        success: true,
        message: 'Candidato eliminado exitosamente',
      });
    });
  });
}); 