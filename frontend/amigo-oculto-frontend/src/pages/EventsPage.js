import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import 'animate.css';
import './EventsPage.css';

const EventsPage = () => {
  const [events, setEvents] = useState([]);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(true);
  const [unlockedEvents, setUnlockedEvents] = useState({});
  const [enteredSecrets, setEnteredSecrets] = useState({});

  useEffect(() => {
    const fetchEvents = async () => {
      try {
        setLoading(true);
        const response = await axios.get('http://127.0.0.1:5000/api/events');
        if (response.data && Array.isArray(response.data)) {
          setEvents(response.data);
        } else {
          setEvents([]);
        }
      } catch (error) {
        setError('Erro ao buscar eventos. Tente novamente mais tarde.');
      } finally {
        setLoading(false);
      }
    };

    fetchEvents();
  }, []);

  const handleDelete = async (eventId) => {
    if (window.confirm('Tem certeza que deseja excluir este evento?')) {
      try {
        await axios.delete(`http://127.0.0.1:5000/api/event/${eventId}`);
        setEvents(events.filter((event) => event.id !== eventId));
        alert('Evento excluído com sucesso.');
      } catch (error) {
        alert('Erro ao excluir o evento.');
      }
    }
  };

  const handleUnlock = async (eventId) => {
    try {
      const secret = enteredSecrets[eventId];
      const response = await axios.post(`http://127.0.0.1:5000/api/event/${eventId}/verify-secret`, {
        secret,
      });

      if (response.data.success) {
        setUnlockedEvents((prev) => ({ ...prev, [eventId]: true }));
      } else {
        alert('Senha incorreta.');
      }
    } catch (error) {
      alert('Erro ao verificar a senha.');
    }
  };

  return (
    <div className="container mt-5 animate__animated animate__fadeIn">
      <h2 className="text-center mb-4">📅 Seus Eventos</h2>

      {loading ? (
        <p className="text-center animate__animated animate__flash">Carregando eventos...</p>
      ) : error ? (
        <div className="alert alert-danger text-center animate__animated animate__shakeX">{error}</div>
      ) : events.length === 0 ? (
        <p className="text-center animate__animated animate__fadeIn">Nenhum evento encontrado.</p>
      ) : (
        <>
          <div className="d-flex justify-content-center mb-4">
            <Link to="/create-event" className="btn btn-success btn-lg animate__animated animate__pulse">
              ✨ Criar Novo Evento
            </Link>
          </div>

          <div className="row">
            {events.map((event) => (
              <div key={event.id} className="col-md-6 mb-4">
                <div className="card event-card h-100 shadow-sm animate__animated animate__zoomIn">
                  <div className="card-body d-flex flex-column">
                    <h5 className="card-title mb-3">🎉 {event.name}</h5>
                    <p className="card-text flex-grow-1">📧 {event.email}</p>

                    {!unlockedEvents[event.id] ? (
                      <>
                        <input
                          type="password"
                          className="form-control mb-2"
                          placeholder="Digite a senha secreta"
                          value={enteredSecrets[event.id] || ''}
                          onChange={(e) =>
                            setEnteredSecrets((prev) => ({ ...prev, [event.id]: e.target.value }))
                          }
                        />
                        <button
                          className="btn btn-outline-success btn-sm mb-2"
                          onClick={() => handleUnlock(event.id)}
                        >
                          🔓 Desbloquear
                        </button>
                      </>
                    ) : (
                      <div className="justify-content-between">
                        <Link to={`/event/${event.id}`} className="btn btn-info btn-sm me-2">
                          🔍 Acesso
                        </Link>
                        <Link to={`/event/${event.id}/edit`} className="btn btn-warning btn-sm me-2">
                          ✏️ Alterar
                        </Link>
                        <button onClick={() => handleDelete(event.id)} className="btn btn-danger btn-sm">
                          🗑️ Excluir
                        </button>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </>
      )}
    </div>
  );
};

export default EventsPage;
