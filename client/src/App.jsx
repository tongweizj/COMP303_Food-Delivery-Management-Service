// App.jsx
import React, { useState } from "react";
import { Routes, Route, Link, useNavigate } from "react-router-dom";

// Import the basic blank page component for testing routes
import BlankPage from "./pages/BlankPage"; // Assuming BlankPage is in src/pages/BlankPage.jsx

// Placeholder page components - adjust paths as per your project structure
import HomePage from "./pages/HomePage";
import RestaurantDetailsPage from "./pages/RestaurantDetailsPage";
import OrderCartPage from "./pages/OrderCartPage";
import LoginPage from "./pages/LoginPage";
import SignupPage from "./pages/SignupPage";
import UserProfilePage from "./pages/UserProfilePage";
import AdminDashboardPage from "./pages/Admin/AdminDashboardPage";
import AdminRestaurantListPage from "./pages/Admin/AdminRestaurantListPage"; // Add this import
import AdminRestaurantFormPage from "./pages/Admin/AdminRestaurantFormPage";
import AdminFoodFormPage from "./pages/Admin/AdminFoodFormPage";
import AdminOrderHistoryPage from "./pages/Admin/AdminOrderHistoryPage";
// import NotFoundPage from './pages/NotFoundPage'; // Optional: 404 Not Found Page

function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(() => {
    const token = localStorage.getItem("authToken");
    return !!token;
  });
  const navigate = useNavigate();

  // The useEffect for checking the token on mount is no longer needed
  // as useState is now initialized with the value from localStorage.

  const handleLogout = () => {
    localStorage.removeItem("authToken");
    setIsAuthenticated(false);
    navigate("/login");
    // window.location.reload(); // Force reload to ensure all states are reset
  };

  return (
    <div className="d-flex flex-column" style={{ minHeight: "100vh" }}>
      <header>
        <nav className="navbar navbar-expand-lg navbar-dark bg-dark shadow-sm">
          <div className="container">
            <Link className="navbar-brand" to="/">
              Food Delivery
            </Link>
            <button
              className="navbar-toggler"
              type="button"
              data-bs-toggle="collapse"
              data-bs-target="#navbarNav"
              aria-controls="navbarNav"
              aria-expanded="false"
              aria-label="Toggle navigation"
            >
              <span className="navbar-toggler-icon"></span>
            </button>
            <div className="collapse navbar-collapse" id="navbarNav">
              <ul className="navbar-nav me-auto mb-2 mb-lg-0">
                <li className="nav-item">
                  <Link className="nav-link" to="/">
                    Home
                  </Link>
                </li>
                <li className="nav-item">
                  <Link className="nav-link" to="/cart">
                    Cart
                  </Link>
                </li>
                <li className="nav-item">
                  <Link className="nav-link" to="/admin">
                    Admin
                  </Link>
                </li>
              </ul>
              <ul className="navbar-nav">
                {isAuthenticated ? (
                  <li className="nav-item dropdown">
                    <a
                      className="nav-link dropdown-toggle"
                      href="#"
                      id="navbarDropdown"
                      role="button"
                      data-bs-toggle="dropdown"
                      aria-expanded="false"
                    >
                      Profile
                    </a>
                    <ul
                      className="dropdown-menu dropdown-menu-end"
                      aria-labelledby="navbarDropdown"
                    >
                      <li>
                        <Link className="dropdown-item" to="/profile">
                          My Profile
                        </Link>
                      </li>
                      <li>
                        <hr className="dropdown-divider" />
                      </li>
                      <li>
                        <button
                          className="dropdown-item"
                          onClick={handleLogout}
                        >
                          Logout
                        </button>
                      </li>
                    </ul>
                  </li>
                ) : (
                  <li className="nav-item">
                    <Link className="nav-link" to="/login">
                      Login
                    </Link>
                  </li>
                )}
              </ul>
            </div>
          </div>
        </nav>
      </header>

      {/* 將多餘的 <Routes> 區塊移除，只保留包在 <main> 裡面的部分 */}
      <main className="flex-grow-1">
        <Routes>
          {/* 前台路由 */}
          <Route path="/" element={<HomePage />} />
          <Route path="/restaurants/:id" element={<RestaurantDetailsPage />} />
          <Route path="/cart" element={<OrderCartPage />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/signup" element={<SignupPage />} />
          <Route path="/profile" element={<UserProfilePage />} />

          {/* 後台 (Admin) 路由 */}
          <Route path="/admin" element={<AdminDashboardPage />} />
          <Route
            path="/admin/restaurants"
            element={<AdminRestaurantListPage />}
          />
          <Route
            path="/admin/restaurants/new"
            element={<AdminRestaurantFormPage />}
          />
          <Route
            path="/admin/restaurants/edit/:id"
            element={<AdminRestaurantFormPage />}
          />
          <Route path="/admin/food/new" element={<AdminFoodFormPage />} />
          <Route path="/admin/food/edit/:id" element={<AdminFoodFormPage />} />
          <Route path="/admin/orders" element={<AdminOrderHistoryPage />} />

          {/* 測試用路由 */}
          <Route path="/blank" element={<BlankPage />} />

          {/* <Route path="*" element={<NotFoundPage />} /> */}
        </Routes>
      </main>

      <footer className="bg-dark text-white text-center p-3 mt-auto">
        <div className="container">
          &copy; {new Date().getFullYear()} Food Delivery Service. All Rights
          Reserved.
        </div>
      </footer>
    </div>
  );
}

export default App;
