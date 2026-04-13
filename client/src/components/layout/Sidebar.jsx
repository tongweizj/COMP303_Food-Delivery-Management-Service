import React from "react";
import { Link, useLocation } from "react-router-dom";

const Sidebar = () => {
  const location = useLocation();

  // 简单的辅助函数，用于高亮当前路由
  const isActive = (path) =>
    location.pathname === path ? "active" : "link-light";

  return (
    <div
      className="d-flex flex-column flex-shrink-0 p-3 text-white bg-dark"
      style={{ width: "250px", minHeight: "calc(100vh - 56px)" }}
    >
      <ul className="nav nav-pills flex-column mb-auto">
        <li className="nav-item">
          <Link to="/admin" className={`nav-link ${isActive("/admin")}`}>
            <i className="bi bi-speedometer2 me-2"></i> Dashboard
          </Link>
        </li>

        <li>
          <Link
            to="/admin/restaurants"
            className={`nav-link ${isActive("/admin/restaurants")}`}
          >
            <i className="bi bi-grid me-2"></i> Restaurants
          </Link>
        </li>
        <li>
          <Link
            to="/admin/menuitems"
            className={`nav-link ${isActive("/admin/menuitems")}`}
          >
            <i className="bi bi-gear me-2"></i> MenuItem
          </Link>
        </li>
        <li>
          <Link
            to="/admin/orders"
            className={`nav-link ${isActive("/admin/orders")}`}
          >
            <i className="bi bi-gear me-2"></i> Orders
          </Link>
        </li>
      </ul>
      <hr />
      <div className="small text-uppercase text-muted fw-bold px-3">
        当前状态: 运行中
      </div>
    </div>
  );
};

export default Sidebar;
