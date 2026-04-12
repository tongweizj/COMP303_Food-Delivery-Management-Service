// App.jsx
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

import MainFooter from "./components/layout/MainFooter";
import MainNavbar from "./components/layout/MainNavbar";
import AppRouter from "./routes/AppRouter";

function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(() => {
    const token = localStorage.getItem("authToken");
    return !!token;
  });

  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem("authToken");
    setIsAuthenticated(false);
    navigate("/login");
  };
  return (
    <div className="d-flex flex-column" style={{ minHeight: "100vh" }}>
      <MainNavbar isAuthenticated={isAuthenticated} onLogout={handleLogout} />

      <main className="flex-grow-1">
        <AppRouter />
      </main>

      <MainFooter />
    </div>
  );
}

export default App;
