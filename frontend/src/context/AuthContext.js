// src/context/AuthContext.js
import { createContext, useContext, useState, useEffect } from 'react';

const AuthContext = createContext();

export function AuthProvider({ children }) {
  const [usuario, setUsuario] = useState(null);

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (token) {
      // Aquí podrías hacer una petición para validar el token
      setUsuario({ username: 'Usuario' }); // temporal
    }
  }, []);

  const logout = () => {
    localStorage.removeItem('token');
    setUsuario(null);
  };

  return (
    <AuthContext.Provider value={{ usuario, setUsuario, logout }}>
      {children}
    </AuthContext.Provider>
  );
}

export const useAuth = () => useContext(AuthContext);