// ✅ src/components/Navbar.js
import React from "react";
import { useNavigate } from "react-router-dom";
import { FaEye, FaSignOutAlt } from "react-icons/fa";

function Navbar() {
  const navigate = useNavigate();
  const usuario = localStorage.getItem("usuario");

  const cerrarSesion = () => {
    localStorage.removeItem("usuario");
    navigate("/login");
  };

  return (
    <nav className="navbar navbar-expand-lg navbar-dark bg-gradient shadow-sm" style={{ background: "linear-gradient(to right, #6a11cb, #2575fc)" }}>
      <div className="container">
        <span className="navbar-brand d-flex align-items-center gap-2 fw-bold">
          <FaEye /> Nova Vision
        </span>
        <div className="d-flex align-items-center gap-3">
          {usuario && (
            <>
              <span className="text-white">Hola, <strong>{usuario}</strong></span>
              <button className="btn btn-outline-light btn-sm d-flex align-items-center gap-1" onClick={cerrarSesion}>
                <FaSignOutAlt /> Salir
              </button>
            </>
          )}
        </div>
      </div>
    </nav>
  );
}
export default Navbar;