// App.jsx
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

import AppRouter from "./routes/AppRouter";
import { CartProvider } from "./context/CartContext";

function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(() => {
    const token = localStorage.getItem("authToken");
    console.log("token:", token);
    return !!token;
  });

  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem("authToken");
    setIsAuthenticated(false);
    navigate("/login");
  };
  return (
    <CartProvider>
      <AppRouter isAuthenticated={isAuthenticated} onLogout={handleLogout} />
    </CartProvider>
  );
}

export default App;
