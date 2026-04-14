// src/pages/OrderSuccessPage.jsx
import React from "react";
import { useParams, useNavigate } from "react-router-dom";

function OrderSuccessPage() {
  const { orderId } = useParams(); // Get order ID from URL
  const navigate = useNavigate();

  // Simulate estimated delivery time (current time + 30 minutes)
  const arrivalTime = new Date(Date.now() + 30 * 60000).toLocaleTimeString([], {
    hour: "2-digit",
    minute: "2-digit",
  });

  return (
    <div className="container mt-5">
      <div className="row justify-content-center">
        <div className="col-md-6 text-center">
          <div className="card shadow border-0 p-5">
            {/* Success icon */}
            <div className="mb-4">
              <div
                className="bg-success text-white rounded-circle d-inline-flex align-items-center justify-content-center"
                style={{ width: "80px", height: "80px" }}
              >
                <i className="bi bi-check-lg fs-1">✅</i>
              </div>
            </div>

            <h2 className="fw-bold mb-3">Order Placed Successfully!</h2>
            <p className="text-muted">
              Thank you for your order. We've received it and the restaurant is
              starting to prepare your food.
            </p>

            <div className="bg-light p-3 rounded mb-4 text-start">
              <div className="d-flex justify-content-between mb-2">
                <span className="text-muted">Order ID:</span>
                <span className="fw-bold">{orderId}</span>
              </div>
              <div className="d-flex justify-content-between">
                <span className="text-muted">Estimated Arrival:</span>
                <span className="fw-bold text-success">{arrivalTime}</span>
              </div>
            </div>

            <div className="d-grid gap-2">
              <button
                className="btn btn-primary btn-lg"
                onClick={() => navigate("/")}
              >
                Order More
              </button>
              {/* <button
                className="btn btn-outline-secondary"
                onClick={() => navigate("/orders")} // Assuming you will write an order history page later
              >
                View Order History
              </button> */}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default OrderSuccessPage;
