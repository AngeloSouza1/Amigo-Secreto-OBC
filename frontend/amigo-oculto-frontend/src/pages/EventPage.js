import React, { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { runDraw } from '../api/api';
import axios from 'axios';
import 'animate.css'; 
import './EventPage.css'; 

const EventPage = () => {
  const { eventId } = useParams();
  const [participants, setParticipants] = useState([]);
  const [secret, setSecret] = useState('');
  const [loading, setLoading] = useState(true);
  const [drawLoading, setDrawLoading] = useState(false);
  const [error, setError] = useState('');
  const [drawError, setDrawError] = useState('');

  useEffect(() => {
    const fetchParticipants = async () => {
      try {
        setLoading(true);
        const response = await axios.get(`http://127.0.0.1:5000/api/event/${eventId}/users`);
        setParticipants(response.data && Array.isArray(response.data) ? response.data : []);
      } catch (error) {
        setError('Erro ao buscar participantes. Tente novamente mais tarde.');
        setParticipants([]);
      } finally {
        setLoading(false);
      }
    };

    fetchParticipants();
  }, [eventId]);

  const handleDraw = async () => {
    setDrawError('');
    setDrawLoading(true);
    try {
      if (!secret) {
        setDrawError('Por favor, insira a senha secreta.');
        return;
      }

      await runDraw(eventId, secret);
      alert('Sorteio realizado com sucesso! E-mails enviados.');
      setSecret('');
    } catch (error) {
      setDrawError('Erro ao realizar o sorteio. Verifique a senha e tente novamente.');
    } finally {
      setDrawLoading(false);
    }
  };

  const handleDeleteParticipant = async (participantId) => {
    if (!window.confirm('Tem certeza que deseja excluir este participante?')) return;

    try {
      await axios.delete(`http://127.0.0.1:5000/api/event/${eventId}/users/${participantId}`);
      setParticipants(participants.filter((p) => p.id !== participantId));
      alert('Participante excluído com sucesso!');
    } catch (error) {
      alert('Erro ao excluir participante.');
    }
  };

  return (
    <div className="container mt-5 animate__animated animate__fadeIn">
      <h2 className="text-center mb-4">📅 Detalhes do Evento 📅</h2>

      {loading ? (
        <p className="text-center">Carregando participantes...</p>
      ) : error ? (
        <div className="alert alert-danger text-center animate__animated animate__shakeX">{error}</div>
      ) : (
        <>
          <h4 className="mb-4 text-center">👥 Participantes:</h4>
          {participants.length === 0 ? (
            <div className="text-center mb-4">
              <p className="text-danger mb-3">Nenhum participante encontrado. Adicione participantes!</p>
              <Link to={`/event/${eventId}/register`} className="btn btn-primary">
                ➕ Cadastrar Participante
              </Link>
            </div>
          ) : (
            <>
              <ul className="list-group mb-4">
                {participants.map((p) => (
                  <li
                    key={p.id}
                    className="list-group-item d-flex justify-content-between align-items-center participant-item"
                  >
                    <span>{p.name} - {p.email}</span>
                    <div className="btn-group">
                      <Link to={`/event/${eventId}/users/${p.id}`} className="btn btn-info btn-sm">
                        Detalhes
                      </Link>
                      <Link to={`/event/${eventId}/users/${p.id}/edit`} className="btn btn-warning btn-sm">
                        Alterar
                      </Link>
                      <button className="btn btn-danger btn-sm" onClick={() => handleDeleteParticipant(p.id)}>
                        Excluir
                      </button>
                    </div>
                  </li>
                ))}
              </ul>
              <div className="text-center mb-4">
                <Link to={`/event/${eventId}/register`} className="btn btn-success">
                  ➕ Adicionar Novo Participante
                </Link>
              </div>
            </>
          )}

          <div className="mb-3 text-center">
            <label className="form-label fw-bold">🔒 Senha Secreta para Sorteio</label>
            <input
              type="password"
              className="form-control w-50 mx-auto"
              placeholder="Digite a senha secreta"
              value={secret}
              onChange={(e) => setSecret(e.target.value)}
            />
          </div>

          {drawError && <div className="alert alert-danger text-center">{drawError}</div>}

          <div className="text-center">
            <button
              onClick={handleDraw}
              className="btn btn-success btn-lg m-2 animate__animated animate__pulse animate__infinite"
              disabled={participants.length < 2 || drawLoading}
            >
              {drawLoading ? (
                <>
                  <span className="spinner-border spinner-border-sm me-2" role="status" aria-hidden="true"></span>
                  Realizando Sorteio...
                </>
              ) : (
                '🎲 Realizar Sorteio'
              )}
            </button>
            <Link to="/events" className="btn btn-secondary btn-lg m-2">
              🔙 Voltar para Eventos
            </Link>
          </div>
        </>
      )}
    </div>
  );
};

export default EventPage;
