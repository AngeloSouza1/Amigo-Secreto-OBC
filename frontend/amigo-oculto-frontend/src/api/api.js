import axios from 'axios';

const API_URL = 'http://127.0.0.1:5000/api';

export const createEvent = async (eventData) => {
  return await axios.post(`${API_URL}/event`, eventData);
};

export const registerUser = async (eventId, userData) => {
  return await axios.post(`${API_URL}/event/${eventId}/users`, userData);
};

export const runDraw = async (eventId, secret) => {
  return await axios.get(`${API_URL}/event/run/${eventId}/${secret}`);
};
