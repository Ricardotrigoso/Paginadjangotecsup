import axios from 'axios';

// Cliente configurado para productos
const API = axios.create({
  baseURL: 'http://localhost:8000/api/productos/',
});

API.interceptors.request.use((config) => {
  const token = localStorage.getItem('token');
  if (token) config.headers.Authorization = `Token ${token}`;
  return config;
});

// Obtener productos (debe retornar un arreglo JSON desde Django)
export const getProductos = () => 
  API.get('').then((res) => res.data);

// Login con endpoint personalizado
export const loginUsuario = (credentials) =>
  API.post('login/', credentials).then((res) => res.data);

// Registro de usuario
export const registrarUsuario = (data) =>
  API.post('register/', data).then((res) => res.data);

// Obtener categorías
export const getCategorias = () =>
  API.get('categorias/').then((res) => res.data);

export default API;