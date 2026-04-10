// src/services/authService.js
import apiClient from './apiClient';

const authService = {
  async login(credentials) {
    // credentials should be an object like { usernameOrEmail, password }
    const response = await apiClient.post('/auth/login', credentials);
    return response.data;
  },

  async signup(userInfo) {
    // userInfo should be an object like { username, email, password }
    const response = await apiClient.post('/auth/signup', userInfo);
    return response.data;
  },
};

export default authService;
