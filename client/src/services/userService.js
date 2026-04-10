// src/services/userService.js
import apiClient from './apiClient';

// Helper to get the token from localStorage
const getAuthHeaders = () => {
  const token = localStorage.getItem('authToken');
  if (!token) {
    // It's better to handle this case in the component logic (e.g., redirect to login)
    // rather than letting the API call fail without authorization.
    return {};
  }
  return { Authorization: `Bearer ${token}` };
};

const userService = {
  async getUserProfile() {
    const response = await apiClient.get('/users/profile', {
      headers: getAuthHeaders(),
    });
    return response.data;
  },

  async updateUserProfile(profileData) {
    const response = await apiClient.put('/users/profile', profileData, {
      headers: getAuthHeaders(),
    });
    return response.data;
  },
};

export default userService;
