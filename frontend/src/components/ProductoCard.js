import React from 'react';
import { useCarrito } from '../context/CarritoContext';
import { FaCartPlus } from 'react-icons/fa';

function ProductoCard({ producto }) {
  const { agregarAlCarrito } = useCarrito();

  return (
    <div className="card h-100">
      <img
        src={producto.imagen}
        alt={producto.nombre}
        className="card-img-top"
      />
      <div className="card-body d-flex flex-column">
        <h5 className="card-title">{producto.nombre}</h5>
        <p className="card-text flex-grow-1">{producto.descripcion}</p>
        <p className="card-text mb-1">
          <strong>Precio: </strong>S/ {producto.precio}
        </p>
        <p className="card-text mb-3">
          <strong>Stock: </strong>
          {producto.stock > 0 ? producto.stock : 'Agotado'}
        </p>
        <button
          className="btn btn-gradient mt-auto d-flex align-items-center justify-content-center gap-2"
          onClick={() => agregarAlCarrito(producto)}
          disabled={producto.stock === 0}
        >
          <FaCartPlus />
          Agregar al carrito
        </button>
      </div>
    </div>
  );
}

export default ProductoCard;