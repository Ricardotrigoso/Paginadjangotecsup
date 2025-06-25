// src/components/Carrito.js
import React from 'react';

const Carrito = ({ carrito, quitarDelCarrito }) => (
  <div>
    <h2>Carrito</h2>
    {carrito.length === 0 ? <p>El carrito está vacío.</p> : (
      <ul>
        {carrito.map((item, i) => (
          <li key={i}>
            {item.nombre} - S/ {item.precio}
            <button onClick={() => quitarDelCarrito(i)}>Quitar</button>
          </li>
        ))}
      </ul>
    )}
  </div>
);

export default Carrito;