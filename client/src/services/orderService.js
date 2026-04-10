// src/services/orderService.js
import apiClient from './apiClient';

// Helper to get the token from localStorage for authenticated requests
const getAuthHeaders = () => {
  const token = localStorage.getItem('authToken');
  if (!token) return {};
  return { Authorization: `Bearer ${token}` };
};

const orderService = {
  async createOrder(orderData) {
    // In a real app, authenticated requests are standard for creating orders.
    const response = await apiClient.post('/orders', orderData, {
      headers: getAuthHeaders(),
    });
    return response.data;
  },
};

export default orderService;
