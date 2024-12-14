import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import confetti from 'canvas-confetti';
import './DashboardPage.css'; // Importar o arquivo de estilos adicionais

const DashboardPage = () => {
  useEffect(() => {
    // Disparar o efeito de confete ao carregar a página
    confetti({
      particleCount: 150,
      spread: 60,
      origin: { y: 0.6 },
    });
  }, []);

  return (
    <div className="container mt-5">
      <header className="text-center mb-5">
        <h1 className="display-3 fw-bold animate__animated animate__fadeInDown">
          🎉 Bem-vindo ao <span className="text-success">Amigo Oculto</span>! 🎉
        </h1>
        <p className="lead animate__animated animate__fadeInUp">
          Torne seus sorteios mais divertidos, simples e com sugestões personalizadas de presentes! 🎁✨
        </p>
        <Link to="/create-event" className="btn btn-lg btn-primary animate__animated animate__pulse animate__infinite">
          🚀 Comece Agora
        </Link>
      </header>

      <section className="features mb-5">
        <h2 className="text-center mb-4">🌟 Por que usar o Amigo Oculto?</h2>
        <div className="row">
          <div className="col-md-4 text-center mb-4 animate__animated animate__fadeInLeft">
            <div className="feature-card p-4 rounded shadow-sm">
              <h4>📝 <strong>Crie Eventos</strong></h4>
              <p>Organize eventos incríveis para suas celebrações de amigo secreto em poucos cliques.</p>
            </div>
          </div>
          <div className="col-md-4 text-center mb-4 animate__animated animate__fadeInUp">
            <div className="feature-card p-4 rounded shadow-sm">
              <h4>👥 <strong>Gerencie Participantes</strong></h4>
              <p>Adicione, edite e remova participantes facilmente, tudo em uma interface intuitiva.</p>
            </div>
          </div>
          <div className="col-md-4 text-center mb-4 animate__animated animate__fadeInRight">
            <div className="feature-card p-4 rounded shadow-sm">
              <h4>🎁 <strong>Recomendações de Presentes</strong></h4>
              <p>Use nossa IA para receber sugestões personalizadas de presentes com links diretos! 🤖🛒</p>
            </div>
          </div>
        </div>
      </section>

      <section className="how-it-works mb-5">
        <h2 className="text-center mb-4">🚀 Como Funciona?</h2>
        <div className="timeline">
          <div className="timeline-item animate__animated animate__fadeInLeft">
            <div className="timeline-content">
              <h5><Link to="/create-event" className="fw-bold text-decoration-none">Crie um Novo Evento</Link></h5>
              <p>Forneça os detalhes do seu evento e prepare-se para a diversão! 🎉</p>
            </div>
          </div>
          <div className="timeline-item animate__animated animate__fadeInRight">
           <div className="timeline-content">
              <h5>Adicione Participantes</h5>
              <p>Informe nomes, e-mails e preferências de presentes para todos os participantes. 👥</p>
            </div>
          </div>
          <div className="timeline-item animate__animated animate__fadeInLeft">
            <div className="timeline-content">
              <h5>Realize o Sorteio</h5>
              <p>Deixe a mágica acontecer e receba recomendações incríveis de presentes! 🎁✨</p>
            </div>
          </div>
          <div className="timeline-item animate__animated animate__fadeInRight">
            <div className="timeline-content">
              <h5>Troque Presentes</h5>
              <p>Divirta-se trocando presentes e criando memórias especiais! 🥳</p>
            </div>
          </div>
        </div>
      </section>

      <section className="cta-section text-center mb-5">
        <h2 className="mb-3 animate__animated animate__fadeInUp">🎈 Pronto para Começar?</h2>
        <Link to="/create-event" className="btn btn-success btn-lg animate__animated animate__heartBeat animate__infinite">
          ✨ Criar Novo Evento
        </Link>
      </section>

      <footer className="text-center text-muted mt-5">
        <p>© 2024 Amigo Oculto. Feito com ❤️ para suas celebrações especiais!</p>
      </footer>
    </div>
  );
};

export default DashboardPage;
