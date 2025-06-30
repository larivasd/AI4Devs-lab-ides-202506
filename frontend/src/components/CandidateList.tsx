import React, { useState, useEffect } from 'react';
import { Candidate } from '../types/candidate';
import { candidateApi } from '../services/api';
import { toast } from 'react-toastify';

interface CandidateListProps {
  onAddCandidate: () => void;
  onEditCandidate: (candidate: Candidate) => void;
}

const CandidateList: React.FC<CandidateListProps> = ({ onAddCandidate, onEditCandidate }) => {
  const [candidates, setCandidates] = useState<Candidate[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    loadCandidates();
  }, []);

  const loadCandidates = async () => {
    try {
      setLoading(true);
      const data = await candidateApi.getAllCandidates();
      setCandidates(data);
      setError(null);
    } catch (err: any) {
      const message = err.response?.data?.message || 'Error al cargar los candidatos';
      setError(message);
      toast.error(message);
    } finally {
      setLoading(false);
    }
  };

  const handleDeleteCandidate = async (id: number) => {
    if (window.confirm('¿Está seguro de que desea eliminar este candidato?')) {
      try {
        await candidateApi.deleteCandidate(id);
        toast.success('Candidato eliminado exitosamente');
        loadCandidates();
      } catch (err: any) {
        const message = err.response?.data?.message || 'Error al eliminar el candidato';
        toast.error(message);
      }
    }
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('es-ES', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
    });
  };

  const getFileSize = (bytes?: number) => {
    if (!bytes) return '';
    const sizes = ['Bytes', 'KB', 'MB', 'GB'];
    const i = Math.floor(Math.log(bytes) / Math.log(1024));
    return Math.round(bytes / Math.pow(1024, i) * 100) / 100 + ' ' + sizes[i];
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center h-64">
        <div role="status" className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="text-center py-8">
        <p className="text-red-600 mb-4">{error}</p>
        <button
          onClick={loadCandidates}
          className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700"
        >
          Reintentar
        </button>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex justify-between items-center">
        <h1 className="text-3xl font-bold text-gray-900">Gestión de Candidatos</h1>
        <button
          onClick={onAddCandidate}
          className="px-6 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
        >
          + Añadir Candidato
        </button>
      </div>

      {/* Estadísticas */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <div className="bg-white p-4 rounded-lg shadow">
          <h3 className="text-lg font-semibold text-gray-700">Total Candidatos</h3>
          <p className="text-3xl font-bold text-blue-600">{candidates.length}</p>
        </div>
        <div className="bg-white p-4 rounded-lg shadow">
          <h3 className="text-lg font-semibold text-gray-700">Con CV</h3>
          <p className="text-3xl font-bold text-green-600">
            {candidates.filter(c => c.cvFileName).length}
          </p>
        </div>
        <div className="bg-white p-4 rounded-lg shadow">
          <h3 className="text-lg font-semibold text-gray-700">Este Mes</h3>
          <p className="text-3xl font-bold text-purple-600">
            {candidates.filter(c => {
              const candidateDate = new Date(c.createdAt);
              const now = new Date();
              return candidateDate.getMonth() === now.getMonth() && 
                     candidateDate.getFullYear() === now.getFullYear();
            }).length}
          </p>
        </div>
        <div className="bg-white p-4 rounded-lg shadow">
          <h3 className="text-lg font-semibold text-gray-700">Esta Semana</h3>
          <p className="text-3xl font-bold text-orange-600">
            {candidates.filter(c => {
              const candidateDate = new Date(c.createdAt);
              const now = new Date();
              const weekAgo = new Date(now.getTime() - 7 * 24 * 60 * 60 * 1000);
              return candidateDate >= weekAgo;
            }).length}
          </p>
        </div>
      </div>

      {/* Lista de candidatos */}
      {candidates.length === 0 ? (
        <div className="text-center py-12 bg-white rounded-lg shadow">
          <div className="text-gray-400 text-6xl mb-4">📋</div>
          <h3 className="text-xl font-semibold text-gray-700 mb-2">No hay candidatos</h3>
          <p className="text-gray-500 mb-6">Comienza añadiendo tu primer candidato al sistema</p>
          <button
            onClick={onAddCandidate}
            className="px-6 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700"
          >
            Añadir Primer Candidato
          </button>
        </div>
      ) : (
        <div className="bg-white rounded-lg shadow overflow-hidden">
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Candidato
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Contacto
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    CV
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Fecha de Registro
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Acciones
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {candidates.map((candidate) => (
                  <tr key={candidate.id} className="hover:bg-gray-50">
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div>
                        <div className="text-sm font-medium text-gray-900">
                          {candidate.firstName} {candidate.lastName}
                        </div>
                        <div className="text-sm text-gray-500">
                          {candidate.education && (
                            <div className="truncate max-w-xs" title={candidate.education}>
                              {candidate.education}
                            </div>
                          )}
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm text-gray-900">{candidate.email}</div>
                      {candidate.phone && (
                        <div className="text-sm text-gray-500">{candidate.phone}</div>
                      )}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      {candidate.cvFileName ? (
                        <div className="flex items-center">
                          <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800">
                            📄 {candidate.cvFileName}
                          </span>
                          {candidate.cvFileSize && (
                            <span className="ml-2 text-xs text-gray-500">
                              ({getFileSize(candidate.cvFileSize)})
                            </span>
                          )}
                        </div>
                      ) : (
                        <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-gray-100 text-gray-800">
                          Sin CV
                        </span>
                      )}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      {formatDate(candidate.createdAt)}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                      <div className="flex space-x-2">
                        <button
                          onClick={() => onEditCandidate(candidate)}
                          className="text-blue-600 hover:text-blue-900"
                        >
                          Editar
                        </button>
                        <button
                          onClick={() => handleDeleteCandidate(candidate.id)}
                          className="text-red-600 hover:text-red-900"
                        >
                          Eliminar
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}
    </div>
  );
};

export default CandidateList; 