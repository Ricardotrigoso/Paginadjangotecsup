// src/pages/RegisterPage.js
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { registrarUsuario } from "../context/api";

function RegisterPage() {
 const [form, setForm] = useState({ username: "", password: "" });
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  const handleChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    const success = await registrarUsuario(form);
    if (success) navigate("/login");
    else setError("Error al registrar. Prueba con otro correo.");
  };

  return (
    <div className="container mt-5">
      <h2 className="text-center">Registrarse</h2>
      <form onSubmit={handleSubmit} className="mx-auto col-md-6 mt-4">
        <input
          type="email"
          name="email"
          className="form-control mb-3"
          placeholder="Correo"
          onChange={handleChange}
          required
        />
        <input
          type="password"
          name="password"
          className="form-control mb-3"
          placeholder="Contraseña"
          onChange={handleChange}
          required
        />
        {error && <div className="alert alert-danger">{error}</div>}
        <button className="btn btn-success w-100">Crear cuenta</button>
      </form>
    </div>
  );
}

export default RegisterPage;