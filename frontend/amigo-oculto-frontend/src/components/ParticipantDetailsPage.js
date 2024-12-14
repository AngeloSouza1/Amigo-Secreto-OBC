import React, { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import axios from 'axios';
import 'animate.css'; // Importa animações
import './ParticipantDetailsPage.css'; // Importa o CSS para estilização adicional

const ParticipantDetailsPage = () => {
  const { eventId, userId } = useParams();
  const [participant, setParticipant] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchParticipantDetails = async () => {
      try {
        setLoading(true);
        const response = await axios.get(`http://127.0.0.1:5000/api/event/${eventId}/users/${userId}`);
        setParticipant(response.data);
      } catch (err) {
        setError('Erro ao buscar detalhes do participante.');
      } finally {
        setLoading(false);
      }
    };

    fetchParticipantDetails();
  }, [eventId, userId]);

  if (loading) {
    return <p className="text-center mt-5 animate__animated animate__fadeIn">Carregando...</p>;
  }

  if (error) {
    return <div className="alert alert-danger text-center mt-5 animate__animated animate__shakeX">{error}</div>;
  }

  return (
    <div className="container mt-5 animate__animated animate__fadeIn">
      <h2 className="text-center mb-4">📝 Detalhes do Participante 🧑‍🤝‍🧑</h2>
      {participant && (
        <div className="card participant-card p-4 shadow-lg">
          <h4 className="mb-3">Nome: <span className="fw-bold">{participant.name}</span></h4>
          <p><strong>Email:</strong> {participant.email}</p>
          <p><strong>Presentes/Gostos:</strong> {participant.preferences}</p>
        </div>
      )}
      <div className="text-center mt-4">
        <Link to={`/event/${eventId}`} className="btn btn-secondary btn-lg">
          ↩️ Voltar para Detalhes do Evento
        </Link>
      </div>
    </div>
  );
};

export default ParticipantDetailsPage;
