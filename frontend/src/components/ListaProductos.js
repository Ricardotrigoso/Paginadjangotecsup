import React, { useEffect, useState } from "react";
import axios from "axios";

function ListaProductos() {
  const [productos, setProductos] = useState([]);
  const [categorias, setCategorias] = useState([]);
  const [categoriaSeleccionada, setCategoriaSeleccionada] = useState("");
  const [precioMin, setPrecioMin] = useState("");
  const [precioMax, setPrecioMax] = useState("");

  useEffect(() => {
  axios.get("http://localhost:8000/api/productos/categorias/")
    .then(res => setCategorias(res.data));

  axios.get("http://localhost:8000/api/productos/")
    .then(res => setProductos(res.data));
}, []);

  const filtrarProductos = () => {
    axios.get("http://localhost:8000/api/productos/").then(res => {
      let filtrados = res.data;

      if (categoriaSeleccionada) {
        filtrados = filtrados.filter(p =>
          p.categoria && p.categoria.nombre.toLowerCase() === categoriaSeleccionada.toLowerCase()
        );
      }
      if (precioMin) {
        filtrados = filtrados.filter(p => parseFloat(p.precio) >= parseFloat(precioMin));
      }
      if (precioMax) {
        filtrados = filtrados.filter(p => parseFloat(p.precio) <= parseFloat(precioMax));
      }

      setProductos(filtrados);
    });
  };

  return (
    <div className="container mt-4">
      <h2 className="mb-3">Nuestros Productos</h2>

      {/* Filtros */}
      <div className="row mb-4">
        <div className="col-md-3">
          <select className="form-select" onChange={e => setCategoriaSeleccionada(e.target.value)}>
            <option value="">Todas las categorías</option>
            {categorias.map(cat => (
              <option key={cat.id} value={cat.nombre}>{cat.nombre}</option>
            ))}
          </select>
        </div>
        <div className="col-md-3">
          <input type="number" className="form-control" placeholder="Precio mínimo" onChange={e => setPrecioMin(e.target.value)} />
        </div>
        <div className="col-md-3">
          <input type="number" className="form-control" placeholder="Precio máximo" onChange={e => setPrecioMax(e.target.value)} />
        </div>
        <div className="col-md-3">
          <button className="btn btn-primary w-100" onClick={filtrarProductos}>Filtrar</button>
        </div>
      </div>

      {/* Productos */}
      <div className="row">
        {productos.map(prod => (
          <div className="col-md-3 mb-4" key={prod.id}>
            <div className="card h-100">
              <img src={prod.imagen} className="card-img-top" alt={prod.nombre} />
              <div className="card-body">
                <h5 className="card-title">{prod.nombre}</h5>
                <p className="card-text">S/ {prod.precio}</p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default ListaProductos;