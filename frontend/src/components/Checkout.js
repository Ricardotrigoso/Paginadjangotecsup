import React, { useState } from "react";
import { useCarrito } from "../context/CarritoContext";
import { toast } from "react-toastify";

function Checkout({ onSubmit }) {
  const { carrito, vaciarCarrito } = useCarrito();

  const [form, setForm] = useState({
    nombre: "",
    direccion: "",
    tarjeta: "",
  });

  const total = carrito.reduce(
    (acc, producto) => acc + producto.precio * producto.cantidad,
    0
  );

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Validar tarjeta
    const tarjetaValida = /^[0-9]{16}$/.test(form.tarjeta);
    if (!tarjetaValida) {
      toast.error("Número de tarjeta inválido. Deben ser 16 dígitos.");
      return;
    }

    // Mostrar toast de éxito
    toast.success(`Gracias por tu compra, ${form.nombre}! 🎉`);
    toast.info("Enviando correo de confirmación...");

    setTimeout(() => {
      toast.success("Correo enviado con éxito 📩");
    }, 2500);

    // Enviar al backend
    try {
      const response = await fetch("http://localhost:8000/api/registrar-compra/", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          ...form,
          productos: carrito.map((item) => ({
            id: item.id,
            nombre: item.nombre,
            cantidad: item.cantidad,
            precio: item.precio,
          })),
          total,
        }),
      });

      const data = await response.json();
      console.log("Compra registrada en backend:", data);
    } catch (error) {
      toast.error("Error al registrar la compra en el backend");
      console.error("Error backend:", error);
    }

    vaciarCarrito(); // Limpiar carrito
    onSubmit(form);  // Evento opcional
  };

  return (
    <div className="container mt-4">
      <h2 className="mb-4">Finalizar Compra</h2>
      <form onSubmit={handleSubmit} className="row">
        <div className="col-md-6">
          <div className="mb-3">
            <label>Nombre completo</label>
            <input
              type="text"
              className="form-control"
              name="nombre"
              value={form.nombre}
              onChange={handleChange}
              required
            />
          </div>
          <div className="mb-3">
            <label>Dirección de envío</label>
            <input
              type="text"
              className="form-control"
              name="direccion"
              value={form.direccion}
              onChange={handleChange}
              required
            />
          </div>
          <div className="mb-3">
            <label>Número de tarjeta</label>
            <div className="input-group">
              <span className="input-group-text">
                <i className="bi bi-credit-card-2-front"></i>
              </span>
              <input
                type="text"
                className="form-control"
                name="tarjeta"
                placeholder="1234567812345678"
                value={form.tarjeta}
                onChange={handleChange}
                maxLength="16"
                required
              />
            </div>
            <small className="text-muted">Solo tarjetas de 16 dígitos (simulado)</small>
          </div>
          <button type="submit" className="btn btn-success mt-3">
            Confirmar Compra
          </button>
        </div>

        <div className="col-md-6">
          <h4 className="text-muted">Resumen</h4>
          <ul className="list-group mb-3">
            {carrito.map((item) => (
              <li key={item.id} className="list-group-item d-flex justify-content-between">
                {item.nombre} x {item.cantidad}
                <span>S/ {(item.precio * item.cantidad).toFixed(2)}</span>
              </li>
            ))}
          </ul>
          <h5>
            Total a pagar: <strong>S/ {total.toFixed(2)}</strong>
          </h5>
        </div>
      </form>
    </div>
  );
}

export default Checkout;