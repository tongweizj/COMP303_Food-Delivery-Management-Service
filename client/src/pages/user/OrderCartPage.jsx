import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useCart } from "../../context/CartContext";
import orderService from "../../services/orderService";
import userService from "../../services/userService";
import OrderSummary from "../../components/common/OrderSummary";

function CheckoutPage() {
  const { cartItems, totalAmount, clearCart } = useCart();
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchUserProfile = async () => {
      try {
        const data = await userService.getUserProfile();
        setUser(data);
      } catch (err) {
        setError(
          err.response?.data?.message ||
            "Failed to fetch user profile. You may need to log in again.",
        );
        console.error("Fetch user profile error:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchUserProfile();
  }, []);

  const handleConfirmOrder = async () => {
    if (cartItems.length === 0) return;
    setLoading(true);
    const restaurantId = cartItems[0]?.restaurantId;
    const orderPayload = {
      userId: user.id,
      items: cartItems,
      totalAmount: totalAmount,
      orderStatus: "PLACED",
      deliveryAddress: user.address, // Simulated address data
      restaurantId: restaurantId,
    };
    console.log("orderPayload:", orderPayload);
    try {
      const response = await orderService.createOrder(orderPayload);
      console.log("orderService:", response);
      if (response.orderId) {
        clearCart();
        navigate(`/order-success/${response.orderId}`);
      }
    } catch (err) {
      setError("Failed to submit order, please try again.");
    } finally {
      setLoading(false);
    }
  };

  if (cartItems.length === 0) {
    return (
      <div className="container mt-5 text-center">
        <h2>Shopping cart is empty</h2>
        <button className="btn btn-primary mt-3" onClick={() => navigate("/")}>
          Order food
        </button>
      </div>
    );
  }

  if (loading || !user) {
    return (
      <div className="container mt-5 text-center">
        <div className="spinner-border text-primary" role="status">
          <span className="visually-hidden">Loading...</span>
        </div>
        <p className="mt-2">Loading user information...</p>
      </div>
    );
  }
  return (
    <div className="container mt-4">
      {/* 1. User address at the top */}
      <div className="row mb-4">
        <div className="col-12">
          <div className="card shadow-sm border-0 bg-light">
            <div className="card-body">
              <h5 className="text-muted small text-uppercase fw-bold">
                Delivery Address
              </h5>
              <div className="d-flex align-items-center">
                <span className="fs-4 me-2">📍</span>
                <div>
                  <p className="mb-0 fw-bold">{user.address}</p>
                  <p className="mb-0 text-muted small">
                    {user.name} ({user.phoneNumber})
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="row">
        {/* Left side: List of ordered items (with images) */}
        <div className="col-lg-8">
          <h4 className="mb-3">Order Details</h4>
          {cartItems.map((item) => (
            <div key={item.foodItemId} className="card shadow-sm mb-3 border-0">
              <div className="row g-0 align-items-center">
                <div className="col-3 col-md-2">
                  {/* 2. Display menu item image */}
                  <img
                    src={
                      item.imageUrl ||
                      "https://via.placeholder.com/80?text=Food"
                    }
                    alt={item.foodName}
                    className="img-fluid rounded-start p-2"
                    style={{
                      height: "80px",
                      width: "100%",
                      objectFit: "cover",
                    }}
                  />
                </div>
                <div className="col-9 col-md-10">
                  <div className="card-body d-flex justify-content-between align-items-center py-2">
                    <div>
                      <h6 className="mb-0">{item.foodName}</h6>
                      <small className="text-muted">
                        Unit Price: ${item.unitPrice.toFixed(2)}
                      </small>
                    </div>
                    <div className="text-end">
                      <span className="badge bg-secondary me-3">
                        x {item.quantity}
                      </span>
                      <span className="fw-bold">
                        ${(item.unitPrice * item.quantity).toFixed(2)}
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Right side: Summary and Submit */}
        <div className="col-lg-4">
          <OrderSummary
            items={cartItems}
            total={totalAmount}
            onConfirm={handleConfirmOrder}
            isLoading={loading}
            error={error}
          />
        </div>
      </div>
    </div>
  );
}

export default CheckoutPage;
