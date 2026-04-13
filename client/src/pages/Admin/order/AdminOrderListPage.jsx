import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import adminOrderService from "../../../services/adminOrderService";

const AdminOrderListPage = () => {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Status options for the dropdown
  const statusOptions = [
    "Pending",
    "Preparing",
    "Shipped",
    "Delivered",
    "Cancelled",
  ];

  useEffect(() => {
    fetchOrders();
  }, []);

  const fetchOrders = async () => {
    try {
      setLoading(true);
      const data = await adminOrderService.getAllOrders();
      console.log("data:", data);
      setOrders(data);
    } catch (err) {
      setError("Failed to fetch orders.");
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const handleStatusChange = async (orderId, newStatus) => {
    try {
      await adminOrderService.updateOrderStatus(orderId, newStatus);
      // Refresh local state to reflect change
      setOrders(
        orders.map((order) =>
          order.orderId === orderId
            ? { ...order, orderStatus: newStatus }
            : order,
        ),
      );
    } catch (err) {
      alert("Failed to update status.");
    }
  };

  const handleDelete = async (orderId) => {
    if (window.confirm("Are you sure you want to delete this order?")) {
      try {
        await adminOrderService.deleteOrder(orderId);
        setOrders(orders.filter((order) => order.orderId !== orderId));
      } catch (err) {
        alert("Failed to delete order.");
      }
    }
  };

  // Helper to color badges based on status
  const getStatusBadgeClass = (status) => {
    switch (status) {
      case "Delivered":
        return "bg-success-subtle text-success border-success";
      case "Preparing":
        return "bg-primary-subtle text-primary border-primary";
      case "Pending":
        return "bg-warning-subtle text-warning border-warning";
      case "Cancelled":
        return "bg-danger-subtle text-danger border-danger";
      default:
        return "bg-secondary-subtle text-secondary border-secondary";
    }
  };

  if (loading)
    return (
      <div className="text-center mt-5">
        <div className="spinner-border text-primary"></div>
      </div>
    );
  if (error) return <div className="alert alert-danger m-4">{error}</div>;

  return (
    <div className="container-fluid py-4">
      <div className="d-flex justify-content-between align-items-center mb-4">
        <h2 className="h3 mb-0">Order Management</h2>
        <button
          className="btn btn-outline-primary btn-sm"
          onClick={fetchOrders}
        >
          <i className="bi bi-arrow-clockwise me-1"></i> Refresh
        </button>
      </div>

      <div className="card shadow-sm border-0">
        <div className="card-body p-0">
          <div className="table-responsive">
            <table className="table table-hover align-middle mb-0">
              <thead className="table-light">
                <tr>
                  <th className="ps-4">Order ID</th>
                  <th>Date</th>
                  <th>Customer ID</th>
                  <th>Amount</th>
                  <th>Status</th>
                  <th className="text-end pe-4">Actions</th>
                </tr>
              </thead>
              <tbody>
                {orders.map((order) => (
                  <tr key={order.orderId}>
                    <td className="ps-4">
                      <span className="fw-bold text-dark">
                        {order.orderId.slice(-8).toUpperCase()}
                      </span>
                      <br />
                      <small
                        className="text-muted"
                        style={{ fontSize: "10px" }}
                      >
                        {order.orderId}
                      </small>
                    </td>
                    <td>{new Date(order.orderDate).toLocaleDateString()}</td>
                    <td>
                      <code className="small">{order.userId.slice(-6)}</code>
                    </td>
                    <td className="fw-bold text-primary">
                      ${order.totalAmount.toFixed(2)}
                    </td>
                    <td>
                      <select
                        className={`form-select form-select-sm border ${getStatusBadgeClass(order.orderStatus)}`}
                        value={order.orderStatus}
                        onChange={(e) =>
                          handleStatusChange(order.orderId, e.target.value)
                        }
                        style={{ width: "130px" }}
                      >
                        {statusOptions.map((opt) => (
                          <option key={opt} value={opt}>
                            {opt}
                          </option>
                        ))}
                      </select>
                    </td>
                    <td className="text-end pe-4">
                      <div className="btn-group">
                        <Link
                          to={`/admin/orders/${order.orderId}`}
                          className="btn btn-sm btn-outline-secondary"
                          title="View Details"
                        >
                          <i className="bi bi-eye"></i>
                        </Link>
                        <button
                          className="btn btn-sm btn-outline-danger"
                          onClick={() => handleDelete(order.orderId)}
                          title="Delete Order"
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

export default AdminOrderListPage;
