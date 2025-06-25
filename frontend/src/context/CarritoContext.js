import React, { createContext, useState, useContext } from 'react';

const CarritoContext = createContext();

export function useCarrito() {
  return useContext(CarritoContext);
}

export function CarritoProvider({ children }) {
  const [carrito, setCarrito] = useState([]);

  const agregarAlCarrito = (producto) => {
    setCarrito(prev => {
      const existente = prev.find(p => p.id === producto.id);
      if (existente) {
        if (existente.cantidad < producto.stock) {
          return prev.map(p =>
            p.id === producto.id ? { ...p, cantidad: p.cantidad + 1 } : p
          );
        }
        return prev; // No agregar si excede stock
      }
      return [...prev, { ...producto, cantidad: 1 }];
    });
  };

  const eliminarDelCarrito = (id) => {
    setCarrito(prev => prev.filter(p => p.id !== id));
  };

  const vaciarCarrito = () => setCarrito([]);

  const total = carrito.reduce((acc, item) => acc + item.precio * item.cantidad, 0);

  return (
    <CarritoContext.Provider value={{ carrito, agregarAlCarrito, eliminarDelCarrito, vaciarCarrito, total }}>
      {children}
    </CarritoContext.Provider>
  );
}