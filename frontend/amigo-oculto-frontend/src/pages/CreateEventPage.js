import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { createEvent } from '../api/api';
import 'animate.css';
import './CreateEventPage.css'; 
import eventImage from '../assets/event1.avif'; 

const CreateEventPage = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [secret, setSecret] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await createEvent({ name, email, secret });
      alert(`Evento criado com sucesso! ID: ${response.data.event_id}`);
      navigate('/events');
    } catch (error) {
      setError(error.response?.data?.error || 'Erro ao criar evento.');
    }
  };

  return (
    <div className="container mt-5 animate__animated animate__fadeIn">
      <div className="row align-items-center">
        {/* Coluna da imagem */}
        <div className="col-md-6 mb-4 mb-md-0 text-center">
          <img
            src={eventImage}
            alt="Ilustração de evento"
            className="img-fluid rounded shadow animate__animated animate__zoomIn"
            style={{ maxHeight: '400px' }}
          />
        </div>

        {/* Coluna do formulário */}
        <div className="col-md-6">
          <h2 className="text-center mb-4 animate__animated animate__fadeInDown">🗓️✨ Criar Novo Evento 🥳🎈</h2>

          {error && <div className="alert alert-danger animate__animated animate__shakeX">{error}</div>}

          <form onSubmit={handleSubmit} className="p-4 rounded shadow-sm">
            <div className="mb-4">
              <label className="form-label fw-bold">Nome do Evento</label>
              <input
                type="text"
                className="form-control"
                placeholder="Digite o nome do evento"
                value={name}
                onChange={(e) => setName(e.target.value)}
                required
              />
            </div>
            <div className="mb-4">
              <label className="form-label fw-bold">Email do Organizador</label>
              <input
                type="email"
                className="form-control"
                placeholder="Digite o email do organizador"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </div>
            <div className="mb-4">
              <label className="form-label fw-bold">Senha Secreta</label>
              <input
                type="password"
                className="form-control"
                placeholder="Digite uma senha secreta"
                value={secret}
                onChange={(e) => setSecret(e.target.value)}
                required
              />
            </div>
            <div className="text-center">
              <button type="submit" className="btn btn-success btn-lg w-100 animate__animated animate__pulse animate__infinite">
                🚀 Criar Evento
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default CreateEventPage;
