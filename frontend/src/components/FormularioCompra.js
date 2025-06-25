import React, { useState } from 'react';
import './FormularioCompra.css';

export default function FormularioCompra({ carrito, onCompraFinalizada }) {
  const [form, setForm] = useState({
    nombre: '',
    email: '',
    direccion: '',
    tarjeta: ''
  });

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!form.nombre || !form.email || !form.direccion || !form.tarjeta) {
      alert("Completa todos los campos");
      return;
    }

    // Simulación de pago
    alert("Compra realizada con éxito");
    onCompraFinalizada();  // Vacía el carrito
  };

  <input
  type="text"
  className="form-control"
  name="tarjeta"
  pattern="[0-9]{16}"
  placeholder="Número de tarjeta (16 dígitos)"
  required
/>

  return (
    <form className="formulario-compra" onSubmit={handleSubmit}>
      <h3>Finalizar compra</h3>
      <input type="text" name="nombre" placeholder="Nombre completo" onChange={handleChange} />
      <input type="email" name="email" placeholder="Correo electrónico" onChange={handleChange} />
      <input type="text" name="direccion" placeholder="Dirección" onChange={handleChange} />
      <input type="text" name="tarjeta" placeholder="Número de tarjeta (simulado)" onChange={handleChange} />
      <button type="submit">Pagar</button>
    </form>
  );
}