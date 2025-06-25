// src/pages/LoginPage.js
import React from "react";
import { useNavigate } from "react-router-dom";
import { auth, provider } from "../firebaseConfig";
import { signInWithPopup } from "firebase/auth";
import { toast } from "react-toastify";
import { FaGoogle } from "react-icons/fa";

function LoginPage() {
  const navigate = useNavigate();

  const handleGoogleLogin = async () => {
    try {
      const result = await signInWithPopup(auth, provider);
      const user = result.user;

      localStorage.setItem("usuario", user.displayName);
      toast.success(`Bienvenido ${user.displayName}! Cupón aplicado: TECSUP25`);
      navigate("/");
    } catch (error) {
      console.error("Error al iniciar sesión:", error);
      toast.error("Error al iniciar sesión con Google");
    }
  };

  return (
    <div className="container text-center mt-5">
      <h2 className="mb-4 text-gradient">Iniciar Sesión</h2>
      <p className="text-muted">Accede con tu cuenta de Google</p>
      <button
        className="btn btn-gradient d-flex align-items-center justify-content-center gap-2 mx-auto"
        onClick={handleGoogleLogin}
        style={{ width: "220px" }}
      >
        <FaGoogle /> Iniciar con Google
      </button>
    </div>
  );
}

export default LoginPage;