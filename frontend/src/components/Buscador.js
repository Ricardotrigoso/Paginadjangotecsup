// src/components/Buscador.js
import React from 'react';

function Buscador({ setBusqueda }) {
  return (
    <div className="mb-3">
      <input
        type="text"
        className="form-control"
        placeholder="Buscar productos..."
        onChange={(e) => setBusqueda(e.target.value)}
      />
    </div>
  );
}

export default Buscador;