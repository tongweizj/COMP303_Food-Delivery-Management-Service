// src/services/adminRestaurantService.js
import apiClient from "./apiClient";

const getAuthHeaders = () => {
  const token = localStorage.getItem("authToken");
  console.log("token:", token);
  if (!token) return {};
  return { Authorization: `Bearer ${token}` };
};

const adminRestaurantService = {
  async getAllRestaurants() {
    console.log("AdminRestaurantService getAllRestaurants called");
    try {
      const response = await apiClient.get("/restaurants", {
        headers: getAuthHeaders(),
      });
      console.log("Fetched restaurants:", response.data);
      return response.data;
    } catch (error) {
      console.error("Error fetching restaurants:", error);
      throw error;
    }
  },

  async getRestaurantById(id) {
    const response = await apiClient.get(`/restaurants/${id}`, {
      headers: getAuthHeaders(),
    });
    return response.data;
  },

  async createRestaurant(restaurantData) {
    console.log(
      "AdminRestaurantService createRestaurant called with data:",
      restaurantData,
    );

    try {
      const response = await apiClient.post("/restaurants", restaurantData, {
        headers: getAuthHeaders(),
      });
      console.log("Create restaurant response:", response);
      return response.data;
    } catch (error) {
      console.error("Error in createRestaurant:", error);
      throw error;
    }
  },

  async updateRestaurant(id, restaurantData) {
    const response = await apiClient.put(`/restaurants/${id}`, restaurantData, {
      headers: getAuthHeaders(),
    });
    return response.data;
  },

  // Note: The original files did not show a delete action, but it's a common admin feature.
  async deleteRestaurant(id) {
    const response = await apiClient.delete(`/admin/restaurants/${id}`, {
      headers: getAuthHeaders(),
    });
    return response.data;
  },
};

export default adminRestaurantService;
