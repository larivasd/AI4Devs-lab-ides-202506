import React, { useState } from 'react';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import CandidateList from './components/CandidateList';
import CandidateForm from './components/CandidateForm';
import { Candidate } from './types/candidate';
import './App.css';

function App() {
  const [showForm, setShowForm] = useState(false);
  const [editingCandidate, setEditingCandidate] = useState<Candidate | null>(null);

  const handleAddCandidate = () => {
    setEditingCandidate(null);
    setShowForm(true);
  };

  const handleEditCandidate = (candidate: Candidate) => {
    setEditingCandidate(candidate);
    setShowForm(true);
  };

  const handleFormSuccess = () => {
    setShowForm(false);
    setEditingCandidate(null);
  };

  const handleFormCancel = () => {
    setShowForm(false);
    setEditingCandidate(null);
  };

  return (
    <div className="min-h-screen bg-gray-100">
      <ToastContainer
        position="top-right"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
      />
      
      <div className="container mx-auto px-4 py-8">
        {showForm ? (
          <div>
            <button
              onClick={handleFormCancel}
              className="mb-6 flex items-center text-blue-600 hover:text-blue-800"
            >
              <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
              </svg>
              Volver a la lista
            </button>
            <CandidateForm
              candidate={editingCandidate}
              onSuccess={handleFormSuccess}
              onCancel={handleFormCancel}
            />
          </div>
        ) : (
          <CandidateList
            onAddCandidate={handleAddCandidate}
            onEditCandidate={handleEditCandidate}
          />
        )}
      </div>
    </div>
  );
}

export default App;
