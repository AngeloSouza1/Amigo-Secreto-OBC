import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';

const EditParticipantPage = () => {
  const { eventId, userId } = useParams();
  const navigate = useNavigate();
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [preferences, setPreferences] = useState('');
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchParticipant = async () => {
      try {
        const response = await axios.get(`http://127.0.0.1:5000/api/event/${eventId}/users/${userId}`);
        const participant = response.data;
        setName(participant.name);
        setEmail(participant.email);
        setPreferences(participant.preferences);
      } catch (err) {
        setError('Erro ao carregar os dados do participante.');
      } finally {
        setLoading(false);
      }
    };

    fetchParticipant();
  }, [eventId, userId]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');

    try {
      await axios.put(`http://127.0.0.1:5000/api/event/${eventId}/users/${userId}`, {
        name,
        email,
        preferences,
      });
      alert('Participante atualizado com sucesso!');
      navigate(`/event/${eventId}`);
    } catch (err) {
      setError('Erro ao atualizar o participante. Tente novamente.');
    }
  };

  if (loading) {
    return <p className="text-center mt-5">Carregando...</p>;
  }

  return (
    <div className="container mt-5">
      <h2 className="text-center mb-4">Editar Participante</h2>

      {error && <div className="alert alert-danger">{error}</div>}

      <form onSubmit={handleSubmit} className="w-50 mx-auto">
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
        <button type="submit" className="btn btn-primary w-100">Atualizar</button>
      </form>

      <div className="text-center mt-3">
        <button className="btn btn-secondary" onClick={() => navigate(`/event/${eventId}`)}>
          Voltar para Detalhes do Evento
        </button>
      </div>
    </div>
  );
};

export default EditParticipantPage;
