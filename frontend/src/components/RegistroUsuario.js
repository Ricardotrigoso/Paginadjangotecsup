// src/components/RegistroUsuario.js
import React, { useState } from 'react';
import API from '../context/api';

const RegistroUsuario = () => {
  const [form, setForm] = useState({ username: '', password: '' });
  const [mensaje, setMensaje] = useState('');

  const handleChange = e => setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = async e => {
    e.preventDefault();
    try {
      const res = await API.post('register/', form);
      localStorage.setItem('token', res.data.token);
      setMensaje('Registro exitoso. ¡Bienvenido!');
    } catch (error) {
      setMensaje('Error en el registro');
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <h2>Registrarse</h2>
      <input name="username" placeholder="Usuario" onChange={handleChange} required />
      <input type="password" name="password" placeholder="Contraseña" onChange={handleChange} required />
      <button type="submit">Registrarse</button>
      <p>{mensaje}</p>
    </form>
  );
};

export default RegistroUsuario;