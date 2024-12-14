import React, { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { registerUser } from '../api/api';

const RegisterParticipantPage = () => {
  const { eventId } = useParams();
  const navigate = useNavigate();
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [preferences, setPreferences] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    try {
      await registerUser(eventId, { name, email, preferences });
      alert('Participante registrado com sucesso!');
      navigate(`/event/${eventId}`); // Redirecionar para a página de detalhes do evento
    } catch (error) {
      setError('Erro ao registrar participante. Tente novamente.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="container mt-5">
      <h2 className="mb-4">Registrar Participante</h2>

      {error && <div className="alert alert-danger">{error}</div>}

      <form onSubmit={handleSubmit}>
        <div className="mb-3">
          <label className="form-label">Nome</label>
          <input
            type="text"
            className="form-control"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
          />
        </div>
        <div className="mb-3">
          <label className="form-label">Email</label>
          <input
            type="email"
            className="form-control"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </div>
        <div className="mb-3">
          <label className="form-label">Presentes/Gostos</label>
          <input
            type="text"
            className="form-control"
            value={preferences}
            onChange={(e) => setPreferences(e.target.value)}
            required
          />
        </div>
        <button type="submit" className="btn btn-primary" disabled={loading}>
          {loading ? 'Registrando...' : 'Registrar'}
        </button>
      </form>

      <div className="text-center mt-3">
        <button className="btn btn-secondary" onClick={() => navigate(`/event/${eventId}`)}>
          Voltar para Detalhes do Evento
        </button>
      </div>
    </div>
  );
};

export default RegisterParticipantPage;
