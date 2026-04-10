// src/services/adminMenuItemService.js
import apiClient from './apiClient';

const getAuthHeaders = () => {
  const token = localStorage.getItem('authToken');
  if (!token) return {};
  return { Authorization: `Bearer ${token}` };
};

const adminMenuItemService = {
  async getMenuItemById(id) {
    const response = await apiClient.get(`/admin/menuitems/${id}`, { headers: getAuthHeaders() });
    return response.data;
  },

  async createMenuItem(menuItemData) {
    const response = await apiClient.post('/admin/menuitems', menuItemData, { headers: getAuthHeaders() });
    return response.data;
  },

  async updateMenuItem(id, menuItemData) {
    const response = await apiClient.put(`/admin/menuitems/${id}`, menuItemData, { headers: getAuthHeaders() });
    return response.data;
  },
};

export default adminMenuItemService;
