// src/components/CuponDescuento.js
import React, { useState } from 'react';

function CuponDescuento({ aplicarDescuento }) {
  const [codigo, setCodigo] = useState('');

  const validarCupon = () => {
    if (codigo === 'TECSUP25') {
      aplicarDescuento(0.25); // 25% de descuento
    } else {
      alert('Cupón no válido');
    }
  };

  return (
    <div className="my-3">
      <input
        type="text"
        className="form-control"
        placeholder="Código de cupón"
        value={codigo}
        onChange={(e) => setCodigo(e.target.value)}
      />
      <input
  type="text"
  className="form-control"
  name="tarjeta"
  pattern="[0-9]{16}"
  placeholder="Número de tarjeta (16 dígitos)"
  required
/>

      <button className="btn btn-secondary mt-2" onClick={validarCupon}>
        Aplicar cupón
      </button>
    </div>
  );
}

export default CuponDescuento;