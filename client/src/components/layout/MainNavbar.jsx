import React from "react";
import { Link, NavLink } from "react-router-dom";
import { useCart } from "../../context/CartContext";
import "./layout.css";

function MainNavbar({ isAuthenticated, onLogout }) {
  // 2. 解构出 clearCart 方法
  const { clearCart, totalQuantity } = useCart();
  const logoutAndClear = () => {
    clearCart(); // 清空内存中的购物车
    onLogout(); // 执行 App.jsx 传下来的注销逻辑
  };
  return (
    <header>
      <nav className="navbar navbar-expand-lg app-navbar">
        <div className="container">
          <Link className="navbar-brand app-brand" to="/">
            Food Delivery
          </Link>

          <button
            className="navbar-toggler border-0 shadow-none"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#mainNavbar"
            aria-controls="mainNavbar"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span className="navbar-toggler-icon"></span>
          </button>

          <div className="collapse navbar-collapse" id="mainNavbar">
            {/* Center nav */}
            <ul className="navbar-nav mx-lg-auto mb-2 mb-lg-0">
              <li className="nav-item">
                <NavLink className="nav-link app-nav-link" to="/">
                  Home
                </NavLink>
              </li>
            </ul>

            {/* Right actions */}
            <div className="d-flex align-items-center gap-2 ms-lg-auto">
              <Link
                to="/cart"
                className="btn btn-outline-primary position-relative"
              >
                <i className="bi bi-cart"></i> Cart
                {totalQuantity > 0 && (
                  <span className="position-absolute top-0 start-100 translate-middle badge rounded-pill bg-danger">
                    {totalQuantity}
                  </span>
                )}
              </Link>

              {isAuthenticated ? (
                <div className="dropdown">
                  <a
                    className="nav-link dropdown-toggle app-nav-link"
                    href="#"
                    id="navbarDropdown"
                    role="button"
                    data-bs-toggle="dropdown"
                    aria-expanded="false"
                    onClick={(e) => e.preventDefault()}
                  >
                    Profile
                  </a>

                  <ul
                    className="dropdown-menu dropdown-menu-end app-dropdown-menu"
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
                        onClick={logoutAndClear}
                      >
                        Logout
                      </button>
                    </li>
                  </ul>
                </div>
              ) : (
                <>
                  <NavLink className="btn app-login-btn" to="/login">
                    Log in
                  </NavLink>

                  <NavLink className="btn app-signup-btn" to="/signup">
                    Sign up
                  </NavLink>
                </>
              )}
            </div>
          </div>
        </div>
      </nav>
    </header>
  );
}

export default MainNavbar;
