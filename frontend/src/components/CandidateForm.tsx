import React, { useState, useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { candidateSchema } from '../utils/validation';
import { candidateApi } from '../services/api';
import { toast } from 'react-toastify';
import { Candidate } from '../types/candidate';

interface CandidateFormProps {
  candidate?: Candidate | null;
  onSuccess?: () => void;
  onCancel?: () => void;
}

const CandidateForm: React.FC<CandidateFormProps> = ({ candidate, onSuccess, onCancel }) => {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const isEditing = !!candidate;

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
    setValue,
  } = useForm({
    resolver: yupResolver(candidateSchema),
  });

  // Prellenar campos cuando se recibe un candidato para editar
  useEffect(() => {
    if (candidate) {
      setValue('firstName', candidate.firstName);
      setValue('lastName', candidate.lastName);
      setValue('email', candidate.email);
      setValue('phone', candidate.phone || '');
      setValue('address', candidate.address || '');
      setValue('education', candidate.education || '');
      setValue('experience', candidate.experience || '');
    }
  }, [candidate, setValue]);

  const onSubmit = async (data: any) => {
    setIsSubmitting(true);
    try {
      if (isEditing && candidate) {
        // Actualizar candidato existente
        await candidateApi.updateCandidate(candidate.id, data);
        
        // Si hay archivo seleccionado, subirlo
        if (selectedFile) {
          await candidateApi.uploadCV(candidate.id, selectedFile);
        }

        toast.success('Candidato actualizado exitosamente');
      } else {
        // Crear nuevo candidato
        const newCandidate = await candidateApi.createCandidate(data);
        
        // Si hay archivo seleccionado, subirlo
        if (selectedFile) {
          await candidateApi.uploadCV(newCandidate.id, selectedFile);
        }

        toast.success('Candidato añadido exitosamente');
      }

      reset();
      setSelectedFile(null);
      onSuccess?.();
    } catch (error: any) {
      const message = error.response?.data?.message || 
        (isEditing ? 'Error al actualizar el candidato' : 'Error al crear el candidato');
      toast.error(message);
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      const allowedTypes = ['application/pdf', 'application/vnd.openxmlformats-officedocument.wordprocessingml.document'];
      if (!allowedTypes.includes(file.type)) {
        toast.error('Solo se permiten archivos PDF y DOCX');
        return;
      }
      if (file.size > 5 * 1024 * 1024) {
        toast.error('El archivo no puede exceder 5MB');
        return;
      }
      setSelectedFile(file);
    }
  };

  const getFileSize = (bytes?: number) => {
    if (!bytes) return '';
    const sizes = ['Bytes', 'KB', 'MB', 'GB'];
    const i = Math.floor(Math.log(bytes) / Math.log(1024));
    return Math.round(bytes / Math.pow(1024, i) * 100) / 100 + ' ' + sizes[i];
  };

  return (
    <div className="max-w-2xl mx-auto p-6 bg-white rounded-lg shadow-lg">
      <h2 className="text-2xl font-bold mb-6 text-gray-800">
        {isEditing ? 'Editar Candidato' : 'Añadir Nuevo Candidato'}
      </h2>
      
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
        {/* Información Personal */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2" htmlFor="firstName">
              Nombre *
            </label>
            <input
              id="firstName"
              type="text"
              {...register('firstName')}
              className={`w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 ${
                errors.firstName ? 'border-red-500 focus:ring-red-500' : 'border-gray-300 focus:ring-blue-500'
              }`}
              placeholder="Ingrese el nombre"
            />
            {errors.firstName && (
              <p className="mt-1 text-sm text-red-600">{errors.firstName.message}</p>
            )}
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2" htmlFor="lastName">
              Apellido *
            </label>
            <input
              id="lastName"
              type="text"
              {...register('lastName')}
              className={`w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 ${
                errors.lastName ? 'border-red-500 focus:ring-red-500' : 'border-gray-300 focus:ring-blue-500'
              }`}
              placeholder="Ingrese el apellido"
            />
            {errors.lastName && (
              <p className="mt-1 text-sm text-red-600">{errors.lastName.message}</p>
            )}
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2" htmlFor="email">
              Email *
            </label>
            <input
              id="email"
              type="email"
              {...register('email')}
              className={`w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 ${
                errors.email ? 'border-red-500 focus:ring-red-500' : 'border-gray-300 focus:ring-blue-500'
              }`}
              placeholder="ejemplo@email.com"
            />
            {errors.email && (
              <p className="mt-1 text-sm text-red-600">{errors.email.message}</p>
            )}
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2" htmlFor="phone">
              Teléfono
            </label>
            <input
              id="phone"
              type="tel"
              {...register('phone')}
              className={`w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 ${
                errors.phone ? 'border-red-500 focus:ring-red-500' : 'border-gray-300 focus:ring-blue-500'
              }`}
              placeholder="+1234567890"
            />
            {errors.phone && (
              <p className="mt-1 text-sm text-red-600">{errors.phone.message}</p>
            )}
          </div>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2" htmlFor="address">
            Dirección
          </label>
          <textarea
            id="address"
            {...register('address')}
            rows={3}
            className={`w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 ${
              errors.address ? 'border-red-500 focus:ring-red-500' : 'border-gray-300 focus:ring-blue-500'
            }`}
            placeholder="Ingrese la dirección completa"
          />
          {errors.address && (
            <p className="mt-1 text-sm text-red-600">{errors.address.message}</p>
          )}
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2" htmlFor="education">
            Educación
          </label>
          <textarea
            id="education"
            {...register('education')}
            rows={4}
            className={`w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 ${
              errors.education ? 'border-red-500 focus:ring-red-500' : 'border-gray-300 focus:ring-blue-500'
            }`}
            placeholder="Describa la formación académica del candidato"
          />
          {errors.education && (
            <p className="mt-1 text-sm text-red-600">{errors.education.message}</p>
          )}
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2" htmlFor="experience">
            Experiencia Laboral
          </label>
          <textarea
            id="experience"
            {...register('experience')}
            rows={4}
            className={`w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 ${
              errors.experience ? 'border-red-500 focus:ring-red-500' : 'border-gray-300 focus:ring-blue-500'
            }`}
            placeholder="Describa la experiencia laboral del candidato"
          />
          {errors.experience && (
            <p className="mt-1 text-sm text-red-600">{errors.experience.message}</p>
          )}
        </div>

        {/* Carga de CV */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2" htmlFor="cv">
            CV (PDF o DOCX)
          </label>
          
          {/* Mostrar CV existente si estamos editando */}
          {isEditing && candidate?.cvFileName && (
            <div className="mb-3 p-3 bg-gray-50 rounded-md">
              <p className="text-sm text-gray-700 mb-1">
                <strong>CV actual:</strong> {candidate.cvFileName}
              </p>
              {candidate.cvFileSize && (
                <p className="text-xs text-gray-500">
                  Tamaño: {getFileSize(candidate.cvFileSize)}
                </p>
              )}
              <p className="text-xs text-gray-500 mt-1">
                Selecciona un nuevo archivo para reemplazar el CV actual
              </p>
            </div>
          )}
          
          <input
            id="cv"
            type="file"
            accept=".pdf,.docx"
            onChange={handleFileChange}
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          {selectedFile && (
            <p className="mt-2 text-sm text-green-600">
              Archivo seleccionado: {selectedFile.name}
            </p>
          )}
          <p className="mt-1 text-xs text-gray-500">
            Máximo 5MB. Formatos permitidos: PDF, DOCX
          </p>
        </div>

        {/* Botones */}
        <div className="flex justify-end space-x-4 pt-4">
          <button
            type="button"
            onClick={onCancel}
            className="px-6 py-2 border border-gray-300 rounded-md text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-gray-500"
            disabled={isSubmitting}
          >
            Cancelar
          </button>
          <button
            type="submit"
            disabled={isSubmitting}
            className="px-6 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {isSubmitting ? 'Guardando...' : (isEditing ? 'Actualizar Candidato' : 'Guardar Candidato')}
          </button>
        </div>
      </form>
    </div>
  );
};

export default CandidateForm; 