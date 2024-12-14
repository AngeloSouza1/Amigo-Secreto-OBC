import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';

const EditEventPage = () => {
  const { eventId } = useParams();
  const navigate = useNavigate();
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [secret, setSecret] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(true);

  // Função para buscar os detalhes do evento
  useEffect(() => {
    const fetchEvent = async () => {
      try {
        setLoading(true);
        const response = await axios.get(`http://127.0.0.1:5000/api/event/${eventId}`);

        if (response.status === 200 && response.data) {
          setName(response.data.name);
          setEmail(response.data.email);
          setSecret(response.data.secret);
        } else {
          setError('Evento não encontrado.');
        }
      } catch (error) {
        setError('Erro ao carregar o evento.');
      } finally {
        setLoading(false);
      }
    };

    fetchEvent();
  }, [eventId]);

  // Função para atualizar o evento
  const handleUpdate = async (e) => {
    e.preventDefault();
    setError(''); // Resetar o estado de erro antes de tentar atualizar

    try {
      const response = await axios.put(`http://127.0.0.1:5000/api/event/${eventId}`, {
        name,
        email,
        secret,
      });

      if (response.status === 200) {
        alert('Evento atualizado com sucesso!');
        navigate('/events');
      } else {
        setError('Erro ao atualizar o evento.');
      }
    } catch (error) {
      setError('Erro ao atualizar o evento.');
    }
  };

  // Mostrar mensagem de carregamento
  if (loading) {
    return <p className="text-center mt-5">Carregando...</p>;
  }

  // Mostrar o formulário de edição
  return (
    <div className="container mt-5">
      <h2 className="text-center mb-4">Editar Evento</h2>

      {error && <div className="alert alert-danger">{error}</div>}

      <form onSubmit={handleUpdate} className="w-50 mx-auto">
        <div className="mb-3">
          <label className="form-label">Nome do Evento</label>
          <input
            type="text"
            className="form-control"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
          />
        </div>
        <div className="mb-3">
          <label className="form-label">E-mail do Organizador</label>
          <input
            type="email"
            className="form-control"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </div>
        <div className="mb-3">
          <label className="form-label">Senha Secreta</label>
          <input
            type="password"
            className="form-control"
            value={secret}
            onChange={(e) => setSecret(e.target.value)}
            required
          />
        </div>
        <button type="submit" className="btn btn-success w-100">Atualizar Evento</button>
      </form>
    </div>
  );
};

export default EditEventPage;
