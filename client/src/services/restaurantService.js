import apiClient from './apiClient';

const restaurantService = {
  async getAllRestaurants() {
    const response = await apiClient.get('/restaurants');
    return response.data;
  },

  async getRestaurantById(id) {
    const response = await apiClient.get(`/restaurants/${id}`);
    return response.data;
  },

  async createRestaurant(restaurantData) {
    const response = await apiClient.post('/restaurants', restaurantData);
    return response.data;
  },

  async deleteRestaurant(id) {
    const response = await apiClient.delete(`/restaurants/${id}`);
    return response.data;
  },
};

export default restaurantService;
