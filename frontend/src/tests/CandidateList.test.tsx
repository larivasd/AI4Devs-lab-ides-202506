import React from 'react';
import { render, screen, waitFor, fireEvent } from '@testing-library/react';
import CandidateList from '../components/CandidateList';
import { candidateApi } from '../services/api';
import { Candidate } from '../types/candidate';

jest.mock('../services/api');

const mockOnAddCandidate = jest.fn();
const mockOnEditCandidate = jest.fn();

const mockCandidates: Candidate[] = [
  {
    id: 1,
    firstName: 'Juan',
    lastName: 'Pérez',
    email: 'juan@email.com',
    phone: '+1234567890',
    address: 'Calle Principal 123',
    education: 'Ingeniería Informática',
    experience: '5 años como desarrollador',
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  },
];

describe('CandidateList', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('muestra loading mientras carga', async () => {
    (candidateApi.getAllCandidates as jest.Mock).mockReturnValue(new Promise(() => {}));
    render(
      <CandidateList onAddCandidate={mockOnAddCandidate} onEditCandidate={mockOnEditCandidate} />
    );
    expect(screen.getByRole('status')).toBeInTheDocument();
  });

  it('muestra la lista de candidatos', async () => {
    (candidateApi.getAllCandidates as jest.Mock).mockResolvedValue(mockCandidates);
    render(
      <CandidateList onAddCandidate={mockOnAddCandidate} onEditCandidate={mockOnEditCandidate} />
    );
    expect(await screen.findByText(/Juan Pérez/i)).toBeInTheDocument();
    expect(screen.getByText(/Ingeniería Informática/i)).toBeInTheDocument();
  });

  it('muestra mensaje si no hay candidatos', async () => {
    (candidateApi.getAllCandidates as jest.Mock).mockResolvedValue([]);
    render(
      <CandidateList onAddCandidate={mockOnAddCandidate} onEditCandidate={mockOnEditCandidate} />
    );
    expect(await screen.findByText(/No hay candidatos/i)).toBeInTheDocument();
  });

  it('llama a onAddCandidate al hacer click en el botón', async () => {
    (candidateApi.getAllCandidates as jest.Mock).mockResolvedValue([]);
    render(
      <CandidateList onAddCandidate={mockOnAddCandidate} onEditCandidate={mockOnEditCandidate} />
    );
    fireEvent.click(await screen.findByText(/Añadir Candidato/i));
    expect(mockOnAddCandidate).toHaveBeenCalled();
  });

  it('llama a onEditCandidate al hacer click en editar', async () => {
    (candidateApi.getAllCandidates as jest.Mock).mockResolvedValue(mockCandidates);
    render(
      <CandidateList onAddCandidate={mockOnAddCandidate} onEditCandidate={mockOnEditCandidate} />
    );
    fireEvent.click(await screen.findByText(/Editar/i));
    expect(mockOnEditCandidate).toHaveBeenCalledWith(mockCandidates[0]);
  });
}); 