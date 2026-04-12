import apiClient from "./apiClient";

const restaurantService = {
  async getAllRestaurants() {
    console.log(`[API] GET, Target: /restaurants`);
    try {
      const response = await apiClient.get("/restaurants");
      console.log(
        `[API] GET Get all restaurants, Status Code: ${response.status}`,
      );
      return response.data;
    } catch (error) {
      console.error(
        `[API] GET request failed, Error Message: ${error.message}`,
      );
      throw error;
    }
  },

  async getRestaurantById(id) {
    console.log(`[API] GET, Target: /restaurant/${id}`);
    try {
      const response = await apiClient.get(`/restaurant/${id}`);
      console.log(`[API] GET Get restaurant by ID, data: ${response.data}`);
      console.log(
        `[API] GET Get restaurant by ID, Status Code: ${response.status}`,
      );
      return response.data;
    } catch (error) {
      console.error(
        `[API] GET request failed, Error Message: ${error.message}`,
      );
      throw error;
    }
  },

  async createRestaurant(restaurantData) {
    console.log(`[API] POST, Target: /restaurants`);
    try {
      const response = await apiClient.post("/restaurants", restaurantData);
      console.log(
        `[API] POST Create restaurant, Status Code: ${response.status}`,
      );
      return response.data;
    } catch (error) {
      console.error(
        `[API] POST request failed, Error Message: ${error.message}`,
      );
      throw error;
    }
  },

  async deleteRestaurant(id) {
    console.log(`[API] DELETE, Target: /restaurants/${id}`);
    try {
      const response = await apiClient.delete(`/restaurants/${id}`);
      console.log(
        `[API] DELETE Delete restaurant, Status Code: ${response.status}`,
      );
      return response.data;
    } catch (error) {
      console.error(
        `[API] DELETE request failed, Error Message: ${error.message}`,
      );
      throw error;
    }
  },
};

export default restaurantService;
