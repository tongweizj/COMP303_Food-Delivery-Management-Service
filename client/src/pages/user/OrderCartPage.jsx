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
      deliveryAddress: user.address, // 模拟地址数据
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
      setError("提交订单失败，请重试。");
    } finally {
      setLoading(false);
    }
  };

  if (cartItems.length === 0) {
    return (
      <div className="container mt-5 text-center">
        <h2>购物车是空的</h2>
        <button className="btn btn-primary mt-3" onClick={() => navigate("/")}>
          去点餐
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
        <p className="mt-2">正在加载用户信息...</p>
      </div>
    );
  }
  return (
    <div className="container mt-4">
      {/* 1. 用户地址放在最顶端 */}
      <div className="row mb-4">
        <div className="col-12">
          <div className="card shadow-sm border-0 bg-light">
            <div className="card-body">
              <h5 className="text-muted small text-uppercase fw-bold">
                收货地址
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
        {/* 左侧：已点菜品列表（带图片） */}
        <div className="col-lg-8">
          <h4 className="mb-3">订单详情</h4>
          {cartItems.map((item) => (
            <div key={item.foodItemId} className="card shadow-sm mb-3 border-0">
              <div className="row g-0 align-items-center">
                <div className="col-3 col-md-2">
                  {/* 2. 显示菜单图片 */}
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
                        单价: ${item.unitPrice.toFixed(2)}
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

        {/* 右侧：汇总与提交 */}
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
