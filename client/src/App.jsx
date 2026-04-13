// App.jsx
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

import MainFooter from "./components/layout/MainFooter";
import MainNavbar from "./components/layout/MainNavbar";
import AppRouter from "./routes/AppRouter";

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
    <AppRouter isAuthenticated={isAuthenticated} onLogout={handleLogout} />
  );
}

export default App;
