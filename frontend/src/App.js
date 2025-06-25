// src/App.js
import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import Header from "./components/Header";
import Home from "./pages/Home";
import LoginPage from "./pages/LoginPage";
import RegisterPage from "./pages/RegisterPage";
import CarritoPage from "./pages/CarritoPage";
import { CarritoProvider } from "./context/CarritoContext";
import InfoPage from "./pages/InfoPage"; // importa la página
import CheckoutPage from './pages/CheckoutPage';
import './App.css'; // ✅ esto carga los estilos que editamos

function App() {
  return (
    <CarritoProvider>
      <Router>
        <Header />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/carrito" element={<CarritoPage />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/registro" element={<RegisterPage />} />
          <Route path="/checkout" element={<CheckoutPage />} />
          <Route path="/info" element={<InfoPage />} />
        </Routes>
      </Router>
    </CarritoProvider>
  );
}

export default App;