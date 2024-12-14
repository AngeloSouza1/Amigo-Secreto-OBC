import React, { useState, useEffect } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import logo from '../assets/logo.png';

const Navbar = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const [isDarkMode, setIsDarkMode] = useState(() => {
    return localStorage.getItem('theme') === 'dark';
  });

  // Função para alternar o tema Dark/Light
  const toggleTheme = () => {
    setIsDarkMode((prevMode) => {
      const newMode = !prevMode;
      localStorage.setItem('theme', newMode ? 'dark' : 'light');
      document.body.className = newMode ? 'dark-theme' : 'light-theme';
      return newMode;
    });
  };

  // Ocultar Navbar na página de login
  const isLoginPage = location.pathname === '/';
  if (isLoginPage) {
    return null;
  }

  return (
    <nav className={`navbar navbar-expand-lg ${isDarkMode ? 'navbar-dark bg-dark' : 'navbar-light bg-light'}`}>
      <div className="container d-flex align-items-center">
        <Link className="navbar-brand d-flex align-items-center" to="/dashboard">
          <img
            src={logo}
            alt="Logo"
            className="me-2"
            style={{ height: '45px' }}
          />
          <span className="fs-4 fw-bold">Amigo Oculto</span> {/* Nome ao lado do logo */}
        </Link>

        <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarNav"
          aria-controls="navbarNav"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </button>

        <div className="collapse navbar-collapse" id="navbarNav">
          <ul className="navbar-nav ms-auto">
            <li className="nav-item">
              <Link className="nav-link" to="/create-event">Criar Evento</Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link" to="/events">Ver Eventos</Link>
            </li>
                      <li className="nav-item">
              <button className="btn btn-outline-secondary ms-2" onClick={toggleTheme}>
                {isDarkMode ? '🌞 Light Mode' : '🌙 Dark Mode'}
              </button>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
