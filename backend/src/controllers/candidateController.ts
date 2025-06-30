import { Request, Response } from 'express';
import { CandidateService } from '../services/candidateService';
import { CreateCandidateRequest } from '../types/candidate';

const candidateService = new CandidateService();

export class CandidateController {
  async createCandidate(req: Request, res: Response): Promise<void> {
    try {
      const candidateData: CreateCandidateRequest = req.body;
      const candidate = await candidateService.createCandidate(candidateData);

      res.status(201).json({
        success: true,
        message: 'Candidato creado exitosamente',
        data: candidate,
      });
    } catch (error) {
      if (error instanceof Error) {
        res.status(400).json({
          success: false,
          message: error.message,
        });
      } else {
        res.status(500).json({
          success: false,
          message: 'Error interno del servidor',
        });
      }
    }
  }

  async getAllCandidates(req: Request, res: Response): Promise<void> {
    try {
      const candidates = await candidateService.getAllCandidates();

      res.status(200).json({
        success: true,
        data: candidates,
      });
    } catch (error) {
      res.status(500).json({
        success: false,
        message: 'Error al obtener los candidatos',
      });
    }
  }

  async getCandidateById(req: Request, res: Response): Promise<void> {
    try {
      const id = parseInt(req.params.id);
      
      if (isNaN(id)) {
        res.status(400).json({
          success: false,
          message: 'ID de candidato inválido',
        });
        return;
      }

      const candidate = await candidateService.getCandidateById(id);

      if (!candidate) {
        res.status(404).json({
          success: false,
          message: 'Candidato no encontrado',
        });
        return;
      }

      res.status(200).json({
        success: true,
        data: candidate,
      });
    } catch (error) {
      res.status(500).json({
        success: false,
        message: 'Error al obtener el candidato',
      });
    }
  }

  async updateCandidate(req: Request, res: Response): Promise<void> {
    try {
      const id = parseInt(req.params.id);
      
      if (isNaN(id)) {
        res.status(400).json({
          success: false,
          message: 'ID de candidato inválido',
        });
        return;
      }

      const updateData = req.body;
      const candidate = await candidateService.updateCandidate(id, updateData);

      res.status(200).json({
        success: true,
        message: 'Candidato actualizado exitosamente',
        data: candidate,
      });
    } catch (error) {
      if (error instanceof Error) {
        res.status(400).json({
          success: false,
          message: error.message,
        });
      } else {
        res.status(500).json({
          success: false,
          message: 'Error interno del servidor',
        });
      }
    }
  }

  async deleteCandidate(req: Request, res: Response): Promise<void> {
    try {
      const id = parseInt(req.params.id);
      
      if (isNaN(id)) {
        res.status(400).json({
          success: false,
          message: 'ID de candidato inválido',
        });
        return;
      }

      await candidateService.deleteCandidate(id);

      res.status(200).json({
        success: true,
        message: 'Candidato eliminado exitosamente',
      });
    } catch (error) {
      if (error instanceof Error) {
        res.status(400).json({
          success: false,
          message: error.message,
        });
      } else {
        res.status(500).json({
          success: false,
          message: 'Error interno del servidor',
        });
      }
    }
  }

  async uploadCV(req: Request, res: Response): Promise<void> {
    try {
      const id = parseInt(req.params.id);
      
      if (isNaN(id)) {
        res.status(400).json({
          success: false,
          message: 'ID de candidato inválido',
        });
        return;
      }

      if (!req.file) {
        res.status(400).json({
          success: false,
          message: 'No se ha proporcionado ningún archivo',
        });
        return;
      }

      const cvData = {
        fileName: req.file.originalname,
        filePath: req.file.path,
        fileSize: req.file.size,
        mimeType: req.file.mimetype,
      };

      const candidate = await candidateService.updateCandidateCV(id, cvData);

      res.status(200).json({
        success: true,
        message: 'CV subido exitosamente',
        data: candidate,
      });
    } catch (error) {
      if (error instanceof Error) {
        res.status(400).json({
          success: false,
          message: error.message,
        });
      } else {
        res.status(500).json({
          success: false,
          message: 'Error interno del servidor',
        });
      }
    }
  }
} 