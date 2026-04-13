// AdminDashboardPage.jsx
import React from "react";
import { Link } from "react-router-dom";
import { useAdmin } from "../../hooks/useAdmin";
function AdminDashboardPage() {
  const { loading, user } = useAdmin();

  // 如果还在验证身份，显示加载中
  if (loading) {
    return (
      <div className="d-flex justify-content-center my-5">
        <div className="spinner-border" role="status"></div>
      </div>
    );
  }
  const adminLinks = [
    {
      to: "/admin/restaurants",
      title: "Manage Restaurants",
      description: "View, edit, and delete restaurant information.",
    },
    {
      to: "/admin/food/new",
      title: "Add New Menu Item",
      description: "Add a new food or drink item to a restaurant's menu.",
    },
    {
      to: "/admin/orders",
      title: "View All Orders",
      description: "Track and manage all customer orders.",
    },
  ];

  return (
    <div className="container my-4">
      <div className="text-center mb-5">
        <h1 className="display-4">Admin Dashboard</h1>
        <p className="lead text-muted">
          Welcome to the administration panel. Please select an action:
        </p>
      </div>

      <div className="row g-4">
        {adminLinks.map((link, index) => (
          <div className="col-md-6 col-lg-4" key={index}>
            <div className="card h-100 shadow-sm">
              <div className="card-body d-flex flex-column">
                <h5 className="card-title">{link.title}</h5>
                <p className="card-text text-muted flex-grow-1">
                  {link.description}
                </p>
                <Link to={link.to} className="btn btn-primary mt-auto">
                  Go &rarr;
                </Link>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default AdminDashboardPage;
