import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";

import adminMenuItemService from "../../../services/adminMenuItemService";

const AdminMenuItemListPage = () => {
  const [menuItems, setMenuItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchMenuItems = async () => {
      try {
        setLoading(true);
        const data = await adminMenuItemService.getAllMenuItems();
        setMenuItems(data);
      } catch (err) {
        setError("Error loading menu data. Please try again later.");
        console.error(err);
      } finally {
        setLoading(false);
      }
    };
    fetchMenuItems();
  }, []);

  if (loading)
    return (
      <div className="text-center mt-5">
        <div className="spinner-grow text-primary"></div>
      </div>
    );
  if (error) return <div className="alert alert-danger m-4">{error}</div>;

  return (
    <div className="container-fluid py-4">
      {/* Header */}
      <div className="d-flex justify-content-between align-items-end mb-4">
        <div>
          <h1 className="h3 mb-1">Global Menu Inventory</h1>
          <p className="text-muted mb-0">
            Management of all dishes across all partnered restaurants.
          </p>
        </div>
        <Link to="/admin/food/new" className="btn btn-primary">
          <i className="bi bi-plus-lg"></i> Add New Item
        </Link>
      </div>

      {/* Main Table Card */}
      <div className="card shadow-sm border-0">
        <div className="card-body p-0">
          <div className="table-responsive">
            <table className="table table-hover align-middle mb-0">
              <thead className="bg-light">
                <tr>
                  <th className="px-4 py-3 border-0">Image</th>
                  <th className="border-0">Dish Name</th>
                  <th className="border-0">Restaurant ID</th>
                  <th className="border-0">Category</th>
                  <th className="border-0">Price</th>
                  <th className="border-0">Visibility</th>
                  <th className="text-end px-4 border-0">Operations</th>
                </tr>
              </thead>
              <tbody>
                {menuItems.map((item) => (
                  <tr key={item.menuItemId}>
                    <td className="px-4">
                      <img
                        src={item.imageUrl}
                        className="rounded shadow-sm"
                        style={{
                          width: "45px",
                          height: "45px",
                          objectFit: "cover",
                        }}
                        alt=""
                      />
                    </td>
                    <td>
                      <div className="fw-bold">{item.itemName}</div>
                      <small className="text-muted">
                        UUID: {item.menuItemId.slice(-6)}
                      </small>
                    </td>
                    <td>
                      <code className="text-muted small">
                        {item.restId || "N/A"}
                      </code>
                    </td>
                    <td>
                      <span className="badge bg-light text-dark border">
                        {item.category || "General"}
                      </span>
                    </td>
                    <td className="fw-bold text-dark">
                      ${item.price.toFixed(2)}
                    </td>
                    <td>
                      <div className={`form-check form-switch`}>
                        <input
                          className="form-check-input"
                          type="checkbox"
                          checked={item.availability}
                          readOnly
                        />
                        <label className="form-check-label small text-muted">
                          {item.availability ? "Active" : "Hidden"}
                        </label>
                      </div>
                    </td>
                    <td className="text-end px-4">
                      <div
                        className="btn-group"
                        role="group"
                        aria-label="Item Actions"
                      >
                        {/* View Button */}
                        <Link
                          to={`/admin/menuitems/${item.menuItemId}`}
                          className="btn btn-sm btn-outline-info"
                          title="View Details"
                        >
                          <i className="bi bi-eye"></i>
                        </Link>

                        {/* Edit Button */}
                        <Link
                          to={`/admin/menuitems/edit/${item.menuItemId}`}
                          className="btn btn-sm btn-outline-secondary"
                          title="Edit Item"
                        >
                          <i className="bi bi-pencil-square"></i>
                        </Link>

                        {/* Delete Button */}
                        <button
                          className="btn btn-sm btn-outline-danger"
                          title="Delete Item"
                          onClick={() => {
                            if (
                              window.confirm(
                                "Are you sure you want to delete this item?",
                              )
                            ) {
                              // Add your delete logic here
                              console.log("Deleting item:", item.menuItemId);
                            }
                          }}
                        >
                          <i className="bi bi-trash3"></i>
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminMenuItemListPage;
