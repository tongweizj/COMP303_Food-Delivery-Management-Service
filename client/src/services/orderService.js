// src/services/orderService.js
import apiClient from "./apiClient";

// Helper to get the token from localStorage for authenticated requests
const getAuthHeaders = () => {
  const token = localStorage.getItem("authToken");
  if (!token) return {};
  return { Authorization: `Bearer ${token}` };
};

const orderService = {
  // async createOrder(orderData) {
  //   return new Promise((resolve, reject) => {
  //     setTimeout(() => {
  //       console.log("发送给 Spring Boot 的 DTO:", orderData);
  //       // 模拟成功响应
  //       resolve({ success: true, orderId: "ORD-" + Date.now() });
  //     }, 2000);
  //   });
  // },
  async createOrder(orderData) {
    // In a real app, authenticated requests are standard for creating orders.
    const response = await apiClient.post("/orders", orderData, {
      headers: getAuthHeaders(),
    });
    return response.data;
  },
};

export default orderService;
