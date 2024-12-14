import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import DashboardPage from './pages/DashboardPage';
import EventsPage from './pages/EventsPage';
import CreateEventPage from './pages/CreateEventPage';
import EditEventPage from './pages/EditEventPage';
import EventPage from './pages/EventPage';
import RegisterParticipantPage from './pages/RegisterParticipantPage';
import ParticipantDetailsPage from './components/ParticipantDetailsPage'; 
import EditParticipantPage from './components/EditParticipantPage'; 
import Navbar from './components/Navbar';

function App() {
  return (
    <Router>
      <Navbar />
      <Routes>
        <Route path="/" element={<DashboardPage />} />
        <Route path="/dashboard" element={<DashboardPage />} />
        <Route path="/events" element={<EventsPage />} />
        <Route path="/create-event" element={<CreateEventPage />} />
        <Route path="/event/:eventId" element={<EventPage />} />
        <Route path="/event/:eventId/register" element={<RegisterParticipantPage />} />
        <Route path="/event/:eventId/edit" element={<EditEventPage />} />
        <Route path="/event/:eventId/users/:userId" element={<ParticipantDetailsPage />} /> 
        <Route path="/event/:eventId/users/:userId/edit" element={<EditParticipantPage />} /> 
      </Routes>
    </Router>
  );
}

export default App;
