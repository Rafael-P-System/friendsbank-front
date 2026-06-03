import axios from 'axios';

// Cria a instância centralizada do Axios com o caminho completo do Spring Boot
const api = axios.create({
  // Adicionamos o '/friendsbank' aqui para casar perfeitamente com o Java
  baseURL: 'http://localhost:8080/api/friendsbank', 
  headers: {
    'Content-Type': 'application/json',
  },
});

// Interceptor opcional: injeta o token de autenticação em cada requisição
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