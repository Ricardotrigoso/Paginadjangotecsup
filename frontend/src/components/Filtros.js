// src/components/Filtros.js
import React, { useEffect, useState } from 'react';

function Filtros({ setCategoriaSeleccionada }) {
  const [categorias, setCategorias] = useState([]);

  useEffect(() => {
    fetch('http://localhost:8000/api/productos/') // ajusta si tu endpoint es diferente
      .then(res => res.json())
      .then(setCategorias);
  }, []);

  return (
    <div className="mb-3">
      <select
        className="form-select"
        onChange={(e) => setCategoriaSeleccionada(e.target.value)}
      >
        <option value="">Todas las categorías</option>
        {categorias.map((cat) => (
          <option key={cat.id} value={cat.nombre}>
            {cat.nombre}
          </option>
        ))}
      </select>
    </div>
  );
}

export default Filtros;