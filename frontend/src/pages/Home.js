// ✅ src/pages/Home.js
import React, { useEffect, useState } from "react";
import Buscador from "../components/Buscador";
import Filtros from "../components/Filtros";
import ProductoCard from "../components/ProductoCard";
import Navbar from "../components/Navbar";
import { getProductos } from "../context/api";

function Home() {
  const [productos, setProductos] = useState([]);
  const [busqueda, setBusqueda] = useState("");
  const [categoriaSeleccionada, setCategoriaSeleccionada] = useState("");
  const [error, setError] = useState(null);

  useEffect(() => {
    getProductos()
      .then((data) => {
        if (Array.isArray(data)) {
          setProductos(data);
          setError(null);
        } else {
          setError("Datos recibidos no son un arreglo");
          setProductos([]);
        }
      })
      .catch((err) => {
        setError("Error al cargar productos: " + err.message);
        setProductos([]);
      });
  }, []);

  const productosFiltrados = Array.isArray(productos)
    ? productos.filter((p) => {
        const coincideBusqueda = p.nombre.toLowerCase().includes(busqueda.toLowerCase());
        const coincideCategoria =
          !categoriaSeleccionada || p.categoria.nombre === categoriaSeleccionada;
        return coincideBusqueda && coincideCategoria;
      })
    : [];

  return (
    <>
      <Navbar />
      <div className="container my-5">
        <div className="text-center mb-5">
          <h1 className="fw-bold display-4 text-gradient">Cuidado del Ojo</h1>
          <p className="text-muted fs-5">
            Previene el síndrome del ojo seco con nuestros productos tecnológicos innovadores.
          </p>
        </div>

        <div className="mb-5 d-flex flex-column gap-3">
          <Buscador setBusqueda={setBusqueda} />
          <Filtros setCategoriaSeleccionada={setCategoriaSeleccionada} />
        </div>

        {error && (
          <div className="alert alert-danger" role="alert">
            {error}
          </div>
        )}

        <div className="row row-cols-1 row-cols-md-3 g-4">
          {productosFiltrados.length === 0 && !error && (
            <p className="text-center">No hay productos para mostrar.</p>
          )}

          {productosFiltrados.map((producto) => (
            <div className="col" key={producto.id}>
              <ProductoCard producto={producto} />
            </div>
          ))}
        </div>
      </div>
    </>
  );
}

export default Home;