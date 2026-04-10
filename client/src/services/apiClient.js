import axios from 'axios';

const apiClient = axios.create({
  baseURL: 'http://localhost:8084/api',
});

export default apiClient;
