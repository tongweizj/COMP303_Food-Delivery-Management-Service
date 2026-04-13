// src/services/adminOrderService.js
import apiClient from "./apiClient";

const getAuthHeaders = () => {
  const token = localStorage.getItem("authToken");
  if (!token) return {};
  return { Authorization: `Bearer ${token}` };
};

const adminOrderService = {
  async getAllOrders() {
    const response = await apiClient.get("/orders", {
      headers: getAuthHeaders(),
    });
    return response.data;
  },

  async updateOrderStatus(orderId, status) {
    const response = await apiClient.put(
      `/orders/${orderId}/status`,
      { status },
      { headers: getAuthHeaders() },
    );
    return response.data;
  },

  async deleteOrder(orderId) {
    const response = await apiClient.delete(`/orders/${orderId}`, {
      headers: getAuthHeaders(),
    });
    return response.data;
  },
};

export default adminOrderService;
