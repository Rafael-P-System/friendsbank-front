import axios from 'axios';

// Cria a instância centralizada do Axios
const api = axios.create({
  // Mude para a porta real do seu back-end (ex: 8080 para Spring Boot, 3000 para Node)
  baseURL: 'http://localhost:8080/api', 
  headers: {
    'Content-Type': 'application/json',
  },
});

// Interceptor opcional: injeta o token de autenticação em cada requisição se o usuário estiver logado
api.interceptors.request.use((config) => {
  const token = localStorage.getItem('token');
  if (token && config.headers) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
}, (error) => {
  return Promise.reject(error);
});

export default api;