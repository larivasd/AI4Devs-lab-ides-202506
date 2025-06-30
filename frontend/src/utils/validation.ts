import * as yup from 'yup';

export const candidateSchema = yup.object({
  firstName: yup
    .string()
    .required('El nombre es obligatorio')
    .min(1, 'El nombre debe tener al menos 1 carácter')
    .max(100, 'El nombre no puede exceder 100 caracteres'),
  
  lastName: yup
    .string()
    .required('El apellido es obligatorio')
    .min(1, 'El apellido debe tener al menos 1 carácter')
    .max(100, 'El apellido no puede exceder 100 caracteres'),
  
  email: yup
    .string()
    .required('El email es obligatorio')
    .email('El email debe tener un formato válido'),
  
  phone: yup
    .string()
    .optional()
    .min(10, 'El teléfono debe tener al menos 10 caracteres')
    .max(20, 'El teléfono no puede exceder 20 caracteres'),
  
  address: yup
    .string()
    .optional()
    .max(500, 'La dirección no puede exceder 500 caracteres'),
  
  education: yup
    .string()
    .optional()
    .max(1000, 'La educación no puede exceder 1000 caracteres'),
  
  experience: yup
    .string()
    .optional()
    .max(2000, 'La experiencia no puede exceder 2000 caracteres'),
});

export interface CandidateFormData {
  firstName: string;
  lastName: string;
  email: string;
  phone?: string;
  address?: string;
  education?: string;
  experience?: string;
} 