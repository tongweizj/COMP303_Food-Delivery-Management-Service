import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import adminOrderService from "../../../services/adminOrderService";

const AdminOrderDetailPage = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [order, setOrder] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const statusOptions = [
    "Pending",
    "Preparing",
    "Shipped",
    "Delivered",
    "Cancelled",
  ];

  useEffect(() => {
    const fetchOrderDetail = async () => {
      try {
        setLoading(true);
        // 假设 adminOrderService 有 getOrderById 方法
        console.log("orderId:", id);
        const data = await adminOrderService.getOrder(id);
        setOrder(data);
      } catch (err) {
        setError("获取订单详情失败");
        console.error(err);
      } finally {
        setLoading(false);
      }
    };
    fetchOrderDetail();
  }, [id]);

  const handleStatusChange = async (newStatus) => {
    try {
      await adminOrderService.updateOrderStatus(id, newStatus);
      setOrder({ ...order, orderStatus: newStatus });
    } catch (err) {
      alert("更新状态失败");
    }
  };

  if (loading)
    return (
      <div className="text-center mt-5">
        <div className="spinner-border text-primary"></div>
      </div>
    );

  if (error || !order)
    return (
      <div className="alert alert-danger m-4">{error || "订单不存在"}</div>
    );

  return (
    <div className="container-fluid py-4">
      {/* 顶部导航 */}
      <div className="d-flex justify-content-between align-items-center mb-4">
        <div>
          <button
            className="btn btn-link text-decoration-none p-0 mb-2"
            onClick={() => navigate(-1)}
          >
            <i className="bi bi-arrow-left"></i> 返回列表
          </button>
          <h2 className="h3 mb-0">
            订单详情{" "}
            <span className="text-muted small">
              #{order.orderId.slice(-8).toUpperCase()}
            </span>
          </h2>
        </div>
        <div className="d-flex align-items-center">
          <label className="me-2 fw-bold">更改状态:</label>
          <select
            className="form-select form-select-sm border-primary"
            style={{ width: "150px" }}
            value={order.orderStatus}
            onChange={(e) => handleStatusChange(e.target.value)}
          >
            {statusOptions.map((opt) => (
              <option key={opt} value={opt}>
                {opt}
              </option>
            ))}
          </select>
        </div>
      </div>

      <div className="row">
        {/* 左侧：订单内容 */}
        <div className="col-lg-8">
          <div className="card shadow-sm border-0 mb-4">
            <div className="card-header bg-white py-3">
              <h5 className="mb-0">菜品清单</h5>
            </div>
            <div className="card-body p-0">
              <div className="table-responsive">
                <table className="table align-middle mb-0">
                  <thead className="table-light">
                    <tr>
                      <th className="ps-4">产品</th>
                      <th>单价</th>
                      <th>数量</th>
                      <th className="text-end pe-4">小计</th>
                    </tr>
                  </thead>
                  <tbody>
                    {order.items.map((item) => (
                      <tr key={item.foodItemId}>
                        <td className="ps-4">
                          <div className="d-flex align-items-center">
                            <img
                              src={
                                item.imageUrl ||
                                "https://via.placeholder.com/50?text=Food"
                              }
                              alt={item.foodName}
                              className="rounded me-3"
                              style={{
                                width: "50px",
                                height: "50px",
                                objectFit: "cover",
                              }}
                            />
                            <div>
                              <p className="mb-0 fw-bold">{item.foodName}</p>
                              <small className="text-muted">
                                ID: {item.foodItemId.slice(-6)}
                              </small>
                            </div>
                          </div>
                        </td>
                        <td>${item.unitPrice.toFixed(2)}</td>
                        <td>x {item.quantity}</td>
                        <td className="text-end pe-4 fw-bold">
                          ${(item.unitPrice * item.quantity).toFixed(2)}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
            <div className="card-footer bg-white py-3">
              <div className="row justify-content-end">
                <div className="col-md-5">
                  <div className="d-flex justify-content-between mb-2">
                    <span className="text-muted">商品总额:</span>
                    <span>${order.totalAmount.toFixed(2)}</span>
                  </div>
                  <div className="d-flex justify-content-between mb-2">
                    <span className="text-muted">配送费:</span>
                    <span>$0.00</span>
                  </div>
                  <hr />
                  <div className="d-flex justify-content-between">
                    <span className="fw-bold">最终总额:</span>
                    <span className="fw-bold text-primary fs-5">
                      ${order.totalAmount.toFixed(2)}
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* 右侧：用户信息与配送详情 */}
        <div className="col-lg-4">
          <div className="card shadow-sm border-0 mb-4">
            <div className="card-body">
              <h5 className="card-title mb-4">客户信息</h5>
              <div className="d-flex align-items-center mb-3">
                <div className="bg-light rounded-circle p-3 me-3">
                  <i className="bi bi-person text-primary fs-4"></i>
                </div>
                <div>
                  <p className="mb-0 fw-bold">
                    用户 ID: {order.userId.slice(-8)}
                  </p>
                  <p className="text-muted small mb-0">
                    餐厅 ID: {order.restaurantId.slice(-8)}
                  </p>
                </div>
              </div>
              <hr />
              <h6 className="text-muted small text-uppercase fw-bold mb-3">
                配送地址
              </h6>
              <p className="mb-1">
                <i className="bi bi-geo-alt me-2 text-danger"></i>
                {order.deliveryAddress}
              </p>
              <p className="text-muted small">
                下单日期: {new Date(order.orderDate).toLocaleString()}
              </p>
            </div>
          </div>

          <div className="card shadow-sm border-0 bg-primary text-white">
            <div className="card-body">
              <h6 className="text-uppercase small fw-bold opacity-75">
                订单备注
              </h6>
              <p className="mb-0">{order.remarks || "无特殊备注"}</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminOrderDetailPage;
