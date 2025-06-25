import React from "react";
import { useNavigate } from "react-router-dom";
import { auth, provider } from "../firebaseConfig";
import { signInWithPopup } from "firebase/auth";
import { toast } from "react-toastify";

function LoginPage() {
  const navigate = useNavigate();

  const handleGoogleLogin = async () => {
    try {
      const result = await signInWithPopup(auth, provider);
      const user = result.user;

      // Guardamos el nombre del usuario
      localStorage.setItem("usuario", user.displayName);
      toast.success(`Bienvenido ${user.displayName}! Cupón aplicado: TECSUP25`);

      navigate("/"); // Redirige al home
    } catch (error) {
      toast.error("Error al iniciar sesión con Google");
      console.error(error);
    }
  };

  return (
    <div className="container mt-5 text-center">
      <h2>Iniciar Sesión con Google</h2>
      <button className="btn btn-danger mt-4" onClick={handleGoogleLogin}>
        <i className="bi bi-google me-2"></i> Iniciar sesión con Google
      </button>
    </div>
  );
}

export default LoginPage;