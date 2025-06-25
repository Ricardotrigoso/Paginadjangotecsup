// src/components/Header.js
import { Link } from 'react-router-dom';
import { useCarrito } from '../context/CarritoContext';

function Header({ usuario, onLogout }) {
  const { carrito } = useCarrito();

  return (
    <nav className="navbar navbar-expand-lg navbar-dark bg-primary shadow-sm">
      <div className="container-fluid">
        <Link className="navbar-brand fw-bold" to="/">👁️ Cuidado Visual</Link>
        <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#menu" aria-controls="menu" aria-expanded="false" aria-label="Toggle navigation">
          <span className="navbar-toggler-icon"></span>
        </button>

        <div className="collapse navbar-collapse" id="menu">
          <ul className="navbar-nav ms-auto mb-2 mb-lg-0">
            <li className="nav-item">
              <Link className="nav-link" to="/">Inicio</Link>
            </li>
            <li className="nav-item position-relative">
              <Link className="nav-link" to="/carrito">
                🛒 Carrito
                {carrito.length > 0 && (
                  <span className="position-absolute top-0 start-100 translate-middle badge rounded-pill bg-danger">
                    {carrito.length}
                  </span>
                )}
              </Link>
            </li>
            {usuario ? (
              <>
                <li className="nav-item">
                  <span className="nav-link">👤 {usuario.username}</span>
                </li>
                <li className="nav-item">
                  <button className="btn btn-sm btn-outline-light ms-2" onClick={onLogout}>
                    Cerrar sesión
                  </button>
                </li>
              </>
            ) : (
              <>
                <li className="nav-item">
                  <Link className="nav-link" to="/login">Login</Link>
                </li>
                <li className="nav-item">
                  <Link className="nav-link" to="/registro">Registrarse</Link>
                </li>
                <li className="nav-item">
                <Link className="nav-link" to="/info">Cuidado Ocular</Link>
                </li>
              </>
            )}
          </ul>
        </div>
      </div>
    </nav>
  );
}

export default Header;