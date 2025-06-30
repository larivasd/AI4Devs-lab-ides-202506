import { PrismaClient } from '@prisma/client';
import { CreateCandidateRequest, UpdateCandidateRequest, CandidateResponse } from '../types/candidate';

const prisma = new PrismaClient();

export class CandidateService {
  async createCandidate(data: CreateCandidateRequest): Promise<CandidateResponse> {
    try {
      const candidate = await prisma.candidate.create({
        data: {
          firstName: data.firstName,
          lastName: data.lastName,
          email: data.email,
          phone: data.phone,
          address: data.address,
          education: data.education,
          experience: data.experience,
        },
      });

      return this.mapToCandidateResponse(candidate);
    } catch (error: any) {
      if (error.code === 'P2002' && error.meta?.target?.includes('email')) {
        throw new Error('Ya existe un candidato con este email');
      }
      throw error;
    }
  }

  async getAllCandidates(): Promise<CandidateResponse[]> {
    try {
      const candidates = await prisma.candidate.findMany({
        orderBy: {
          createdAt: 'desc',
        },
      });

      return candidates.map(candidate => this.mapToCandidateResponse(candidate));
    } catch (error) {
      throw new Error('Error al obtener los candidatos');
    }
  }

  async getCandidateById(id: number): Promise<CandidateResponse | null> {
    try {
      const candidate = await prisma.candidate.findUnique({
        where: { id },
      });

      return candidate ? this.mapToCandidateResponse(candidate) : null;
    } catch (error) {
      throw new Error('Error al obtener el candidato');
    }
  }

  async updateCandidate(id: number, data: Partial<CreateCandidateRequest>): Promise<CandidateResponse> {
    try {
      const candidate = await prisma.candidate.update({
        where: { id },
        data,
      });

      return this.mapToCandidateResponse(candidate);
    } catch (error: any) {
      if (error.code === 'P2025') {
        throw new Error('Candidato no encontrado');
      }
      if (error.code === 'P2002' && error.meta?.target?.includes('email')) {
        throw new Error('Ya existe un candidato con este email');
      }
      throw error;
    }
  }

  async deleteCandidate(id: number): Promise<void> {
    try {
      await prisma.candidate.delete({
        where: { id },
      });
    } catch (error: any) {
      if (error.code === 'P2025') {
        throw new Error('Candidato no encontrado');
      }
      throw error;
    }
  }

  async updateCandidateCV(id: number, cvData: {
    fileName: string;
    filePath: string;
    fileSize: number;
    mimeType: string;
  }): Promise<CandidateResponse> {
    try {
      const candidate = await prisma.candidate.update({
        where: { id },
        data: {
          cvFileName: cvData.fileName,
          cvFilePath: cvData.filePath,
          cvFileSize: cvData.fileSize,
          cvMimeType: cvData.mimeType,
        },
      });

      return this.mapToCandidateResponse(candidate);
    } catch (error: any) {
      if (error.code === 'P2025') {
        throw new Error('Candidato no encontrado');
      }
      throw error;
    }
  }

  private mapToCandidateResponse(candidate: any): CandidateResponse {
    if (!candidate) {
      throw new Error('Candidato no encontrado');
    }
    
    return {
      id: candidate.id,
      firstName: candidate.firstName,
      lastName: candidate.lastName,
      email: candidate.email,
      phone: candidate.phone || undefined,
      address: candidate.address || undefined,
      education: candidate.education || undefined,
      experience: candidate.experience || undefined,
      cvFileName: candidate.cvFileName || undefined,
      cvFilePath: candidate.cvFilePath || undefined,
      cvFileSize: candidate.cvFileSize || undefined,
      cvMimeType: candidate.cvMimeType || undefined,
      createdAt: candidate.createdAt,
      updatedAt: candidate.updatedAt,
    };
  }
} 