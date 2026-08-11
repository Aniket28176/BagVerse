import axios from 'axios';

const rawBaseURL = import.meta.env.VITE_API_BASE_URL ?? (import.meta.env.MODE === 'development' ? 'http://localhost:5000' : '');
const API_BASE_URL = rawBaseURL.replace(/\/+$|\/$/, '');

const normalizeApiUrl = (url) => {
  if (typeof url !== 'string') return url;
  if (API_BASE_URL.endsWith('/api') && url.startsWith('/api/')) {
    return url.slice(4);
  }
  return url;
};

const api = axios.create({
  baseURL: API_BASE_URL,
  withCredentials: true,
});

api.interceptors.request.use((config) => {
  if (config.url) {
    config.url = normalizeApiUrl(config.url);
  }
  return config;
});

export default api;
