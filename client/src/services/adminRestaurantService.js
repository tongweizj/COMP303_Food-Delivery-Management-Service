// src/services/adminRestaurantService.js
import apiClient from './apiClient';

const getAuthHeaders = () => {
  const token = localStorage.getItem('authToken');
  if (!token) return {};
  return { Authorization: `Bearer ${token}` };
};

const adminRestaurantService = {
  async getAllRestaurants() {
    const response = await apiClient.get('/admin/restaurants', { headers: getAuthHeaders() });
    return response.data;
  },

  async getRestaurantById(id) {
    const response = await apiClient.get(`/admin/restaurants/${id}`, { headers: getAuthHeaders() });
    return response.data;
  },

  async createRestaurant(restaurantData) {
    const response = await apiClient.post('/admin/restaurants', restaurantData, { headers: getAuthHeaders() });
    return response.data;
  },

  async updateRestaurant(id, restaurantData) {
    const response = await apiClient.put(`/admin/restaurants/${id}`, restaurantData, { headers: getAuthHeaders() });
    return response.data;
  },
  
  // Note: The original files did not show a delete action, but it's a common admin feature.
  // async deleteRestaurant(id) {
  //   const response = await apiClient.delete(`/admin/restaurants/${id}`, { headers: getAuthHeaders() });
  //   return response.data;
  // }
};

export default adminRestaurantService;
