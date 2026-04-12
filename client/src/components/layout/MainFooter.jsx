// src/components/layout/MainFooter.jsx
import React from "react";
import { Link } from "react-router-dom";
import "./layout.css";

function MainFooter() {
  return (
    <footer className="app-footer mt-auto">
      <div className="container">
        <div className="row align-items-center gy-3">
          <div className="col-md-6 text-center text-md-start">
            <p className="app-footer-text mb-0">
              &copy; {new Date().getFullYear()} Food Delivery Service
            </p>
          </div>

          <div className="col-md-6">
            <div className="app-footer-links d-flex justify-content-center justify-content-md-end gap-3">
              <Link to="/" className="app-footer-link">
                Home
              </Link>
              <Link to="/cart" className="app-footer-link">
                Cart
              </Link>
              <Link to="/admin" className="app-footer-link">
                Admin
              </Link>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}

export default MainFooter;
