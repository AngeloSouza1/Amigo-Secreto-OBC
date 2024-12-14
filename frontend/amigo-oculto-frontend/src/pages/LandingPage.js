mport React from 'react';
import { Link } from 'react-router-dom';

const LandingPage = () => {
  return (
    <div className="container text-center mt-5">
      <h1>Bem-vindo ao Sistema de Amigo Oculto!</h1>
      <p>Facilite a organização do seu amigo oculto com nossa plataforma.</p>
      <div className="mt-4">
        <Link to="/create-event" className="btn btn-primary m-2">Criar Evento</Link>
        <Link to="/event/1/register" className="btn btn-success m-2">Registrar Participante</Link>
        <Link to="/event/1" className="btn btn-info m-2">Visualizar Evento</Link>
      </div>
    </div>
  );
};

export default LandingPage;
