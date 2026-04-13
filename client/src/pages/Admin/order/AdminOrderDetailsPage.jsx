import React, { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import adminOrderService from "../../../services/adminOrderService";

const AdminOrderDetailsPage = () => {
  const { id } = useParams();
  const [order, setOrder] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchOrderDetails = async () => {
      try {
        setLoading(true);
        console.log("AdminOrderDetailsPage-id:", id);
        const data = await adminOrderService.getOrder(id);
        console.log("AdminOrderDetailsPage:", data);
        setOrder(data);
      } catch (err) {
        setError("Failed to load order details. Please verify the Order ID.");
        console.error(err);
      } finally {
        setLoading(false);
      }
    };
    fetchOrderDetails();
  }, [id]);

  if (loading)
    return (
      <div className="text-center mt-5">
        <div className="spinner-border text-primary"></div>
      </div>
    );
  if (error) return <div className="alert alert-danger m-4">{error}</div>;
  if (!order)
    return <div className="alert alert-warning m-4">Order not found.</div>;

  return (
    <div className="container-fluid py-4">
      {/* Navigation & Header */}
      <div className="d-flex justify-content-between align-items-center mb-4">
        <nav aria-label="breadcrumb">
          <ol className="breadcrumb mb-0">
            <li className="breadcrumb-item">
              <Link to="/admin/orders">Orders</Link>
            </li>
            <li className="breadcrumb-item active">Details</li>
          </ol>
        </nav>
      </div>

      <div className="row">
        {/* Main Order Info */}
        <div className="col-lg-8">
          <div className="card shadow-sm border-0 mb-4">
            <div className="card-header bg-white py-3 d-flex justify-content-between align-items-center">
              <h5 className="mb-0 fw-bold text-uppercase small text-muted">
                Order Items Summary
              </h5>
              <span className="badge bg-primary-subtle text-primary border border-primary">
                {order.foodItemIds.length} Items
              </span>
            </div>
            <div className="card-body">
              <ul className="list-group list-group-flush">
                {order.foodItemIds.map((foodId, index) => (
                  <li
                    key={index}
                    className="list-group-item px-0 py-3 d-flex justify-content-between align-items-center"
                  >
                    <div className="d-flex align-items-center">
                      <div className="bg-light rounded p-2 me-3">
                        <i className="bi bi-box-seam text-secondary"></i>
                      </div>
                      <div>
                        <p className="mb-0 fw-semibold">Food Item Reference</p>
                        <code className="small text-muted">{foodId}</code>
                      </div>
                    </div>
                    <Link
                      to={`/admin/menuitems/${foodId}`}
                      className="btn btn-sm btn-link text-decoration-none"
                    >
                      View Dish <i className="bi bi-arrow-right"></i>
                    </Link>
                  </li>
                ))}
              </ul>

              <div className="mt-4 p-3 bg-light rounded d-flex justify-content-between">
                <span className="h5 mb-0 fw-bold">Total Amount Due</span>
                <span className="h4 mb-0 fw-bold text-primary">
                  ${order.totalAmount.toFixed(2)}
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* Sidebar: Order Metadata */}
        <div className="col-lg-4">
          {/* Status Card */}
          <div className="card shadow-sm border-0 mb-4">
            <div className="card-body">
              <h6 className="text-muted text-uppercase small fw-bold mb-3">
                Order Status
              </h6>
              <div className="d-flex align-items-center mb-3">
                <div className="flex-grow-1">
                  <h4 className="mb-1 fw-bold">{order.orderStatus}</h4>
                  <p className="text-muted small mb-0">
                    Placed on {new Date(order.orderDate).toLocaleString()}
                  </p>
                </div>
                <i className="bi bi-info-circle text-primary fs-3"></i>
              </div>
              <hr />
              <Link
                to="/admin/orders"
                className="btn btn-outline-primary w-100 btn-sm"
              >
                Update Status in List
              </Link>
            </div>
          </div>

          {/* Customer & Restaurant References */}
          <div className="card shadow-sm border-0">
            <div className="card-body">
              <h6 className="text-muted text-uppercase small fw-bold mb-3">
                External References
              </h6>

              <div className="mb-4">
                <label className="d-block small text-muted mb-1">
                  Customer User ID
                </label>
                <div className="d-flex justify-content-between align-items-center">
                  <code className="text-dark">{order.userId}</code>
                  <button
                    className="btn btn-sm btn-light"
                    onClick={() => navigator.clipboard.writeText(order.userId)}
                  >
                    <i className="bi bi-clipboard"></i>
                  </button>
                </div>
              </div>

              <div className="mb-0">
                <label className="d-block small text-muted mb-1">
                  Restaurant ID
                </label>
                <div className="d-flex justify-content-between align-items-center">
                  <code className="text-dark">{order.restaurantId}</code>
                  <Link
                    to={`/admin/restaurants/${order.restaurantId}`}
                    className="btn btn-sm btn-light"
                  >
                    <i className="bi bi-shop"></i>
                  </Link>
                </div>
              </div>
            </div>
          </div>

          <div className="mt-4 text-center">
            <p className="text-muted small">
              Order UUID: <br /> {order.orderId}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminOrderDetailsPage;
