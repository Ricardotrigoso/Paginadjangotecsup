// src/firebaseConfig.js

import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider } from "firebase/auth";

// ✅ Tu configuración de Firebase
const firebaseConfig = {
  apiKey: "AIzaSyDquvJ0TMqQH_y3PyFEKGXt2vQ_ChxzFv0",
  authDomain: "mitiendaweb-6c1a3.firebaseapp.com",
  projectId: "mitiendaweb-6c1a3",
  storageBucket: "mitiendaweb-6c1a3.appspot.com", // corregido
  messagingSenderId: "518928594522",
  appId: "1:518928594522:web:94e373bfc7e971d6290a63",
  measurementId: "G-67VMSJ0HVT"
};

// ✅ Inicializa Firebase
const app = initializeApp(firebaseConfig);

// ✅ Configura Auth y Google Provider
const auth = getAuth(app);
const provider = new GoogleAuthProvider();

export { auth, provider };