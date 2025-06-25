// src/pages/CarritoPage.js
import React from "react";
import { useCarrito } from "../context/CarritoContext";
import { useNavigate } from "react-router-dom";
import { FaTrashAlt, FaShoppingCart } from "react-icons/fa";

function CarritoPage() {
  const { carrito, eliminarDelCarrito, vaciarCarrito } = useCarrito();
  const navigate = useNavigate();

  const total = carrito.reduce((acc, prod) => acc + prod.precio * prod.cantidad, 0);
  const usuario = localStorage.getItem("usuario");
  const descuento = usuario ? total * 0.25 : 0;
  const totalFinal = total - descuento;

  return (
    <div className="container mt-5">
      <h2 className="text-center mb-4 text-gradient">
        <FaShoppingCart /> Carrito de Compras
      </h2>

      {carrito.length === 0 ? (
        <p className="text-center text-muted">Tu carrito está vacío.</p>
      ) : (
        <>
          <ul className="list-group mb-4">
            {carrito.map((item) => (
              <li
                key={item.id}
                className="list-group-item d-flex justify-content-between align-items-center"
              >
                <div>
                  {item.nombre} x {item.cantidad}
                  <span className="badge bg-primary ms-2">S/ {item.precio}</span>
                </div>
                <button
                  className="btn btn-sm btn-danger"
                  onClick={() => eliminarDelCarrito(item.id)}
                >
                  <FaTrashAlt />
                </button>
              </li>
            ))}
          </ul>

          <div className="text-end mb-4">
            {usuario && (
              <p className="text-success">
                Cupón aplicado: <strong>TECSUP25</strong> (-25%)
              </p>
            )}
            <h5>Subtotal: S/ {total.toFixed(2)}</h5>
            <h4>Total a pagar: <strong>S/ {totalFinal.toFixed(2)}</strong></h4>
          </div>

          <div className="d-flex justify-content-between">
            <button className="btn btn-outline-danger" onClick={vaciarCarrito}>
              Vaciar carrito
            </button>
            <button className="btn btn-gradient" onClick={() => navigate("/checkout")}>
              Continuar con el pago
            </button>
          </div>
        </>
      )}
    </div>
  );
}

export default CarritoPage;