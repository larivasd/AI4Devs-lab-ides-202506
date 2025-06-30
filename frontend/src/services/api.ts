import axios from 'axios';
import { Candidate, CreateCandidateData, UpdateCandidateData, CandidatesResponse, CandidateResponse } from '../types/candidate';

const API_BASE_URL = process.env.REACT_APP_API_URL || 'http://localhost:3010/api';

const api = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Interceptor para manejar errores
api.interceptors.response.use(
  (response) => response,
  (error) => {
    console.error('API Error:', error);
    return Promise.reject(error);
  }
);

export const candidateApi = {
  // Obtener todos los candidatos
  getAllCandidates: async (): Promise<Candidate[]> => {
    const response = await api.get<CandidatesResponse>('/candidates');
    return response.data.data || [];
  },

  // Obtener candidato por ID
  getCandidateById: async (id: number): Promise<Candidate | null> => {
    const response = await api.get<CandidateResponse>(`/candidates/${id}`);
    return response.data.data || null;
  },

  // Crear nuevo candidato
  createCandidate: async (data: CreateCandidateData): Promise<Candidate> => {
    const response = await api.post<CandidateResponse>('/candidates', data);
    return response.data.data!;
  },

  // Actualizar candidato
  updateCandidate: async (id: number, data: Partial<CreateCandidateData>): Promise<Candidate> => {
    const response = await api.put<CandidateResponse>(`/candidates/${id}`, data);
    return response.data.data!;
  },

  // Eliminar candidato
  deleteCandidate: async (id: number): Promise<void> => {
    await api.delete(`/candidates/${id}`);
  },

  // Subir CV
  uploadCV: async (id: number, file: File): Promise<Candidate> => {
    const formData = new FormData();
    formData.append('cv', file);

    const response = await api.post<CandidateResponse>(`/candidates/${id}/cv`, formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    });
    return response.data.data!;
  },
};

export default api; 