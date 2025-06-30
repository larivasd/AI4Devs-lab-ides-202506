import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import CandidateForm from '../components/CandidateForm';
import { candidateApi } from '../services/api';

jest.mock('../services/api');

const mockOnSuccess = jest.fn();
const mockOnCancel = jest.fn();

describe('CandidateForm', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('renderiza todos los campos del formulario', () => {
    render(<CandidateForm onSuccess={mockOnSuccess} onCancel={mockOnCancel} />);
    expect(screen.getByLabelText(/Nombre/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/Apellido/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/Email/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/Teléfono/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/Dirección/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/Educación/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/Experiencia Laboral/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/CV/i)).toBeInTheDocument();
  });

  it('muestra errores de validación si los campos obligatorios están vacíos', async () => {
    render(<CandidateForm onSuccess={mockOnSuccess} onCancel={mockOnCancel} />);
    fireEvent.click(screen.getByText(/Guardar Candidato/i));
    expect(await screen.findAllByText(/obligatorio/i)).toHaveLength(3); // nombre, apellido, email
  });

  it('envía el formulario correctamente', async () => {
    (candidateApi.createCandidate as jest.Mock).mockResolvedValue({ id: 1 });
    (candidateApi.uploadCV as jest.Mock).mockResolvedValue({});

    render(<CandidateForm onSuccess={mockOnSuccess} onCancel={mockOnCancel} />);

    fireEvent.change(screen.getByLabelText(/Nombre/i), { target: { value: 'Juan' } });
    fireEvent.change(screen.getByLabelText(/Apellido/i), { target: { value: 'Pérez' } });
    fireEvent.change(screen.getByLabelText(/Email/i), { target: { value: 'juan@email.com' } });

    fireEvent.click(screen.getByText(/Guardar Candidato/i));

    await waitFor(() => {
      expect(candidateApi.createCandidate).toHaveBeenCalledWith({
        firstName: 'Juan',
        lastName: 'Pérez',
        email: 'juan@email.com',
        phone: undefined,
        address: undefined,
        education: undefined,
        experience: undefined,
      });
      expect(mockOnSuccess).toHaveBeenCalled();
    });
  });

  it('llama a onCancel cuando se presiona el botón cancelar', () => {
    render(<CandidateForm onSuccess={mockOnSuccess} onCancel={mockOnCancel} />);
    fireEvent.click(screen.getByText(/Cancelar/i));
    expect(mockOnCancel).toHaveBeenCalled();
  });
}); 