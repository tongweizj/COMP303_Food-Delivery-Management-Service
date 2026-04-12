// AdminRestaurantListPage.jsx
import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import adminRestaurantService from "../../../services/adminRestaurantService";

function AdminRestaurantListPage() {
  const [restaurants, setRestaurants] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [deleteMessage, setDeleteMessage] = useState(null); // For delete operation status
  const navigate = useNavigate();

  const fetchRestaurants = async () => {
    setLoading(true);
    setError(null);
    setDeleteMessage(null); // Clear previous messages on fetch

    try {
      // Use the service to fetch restaurants
      const data = await adminRestaurantService.getAllRestaurants();
      setRestaurants(data);
    } catch (err) {
      setError(err.response?.data?.message || "Failed to load restaurants. Ensure you are logged in as an admin.");
      console.error("Error fetching admin restaurants:", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchRestaurants();
  }, []);

  const handleDelete = async (restaurantId) => {
    if (
      !window.confirm(
        "Are you sure you want to delete this restaurant? This action cannot be undone.",
      )
    ) {
      return;
    }

    setDeleteMessage(null);
    setLoading(true); // Indicate loading for the delete operation

    try {
      // Use the service to delete the restaurant
      await adminRestaurantService.deleteRestaurant(restaurantId);

      setDeleteMessage({
        type: "success",
        text: "Restaurant deleted successfully!",
      });

      // Remove the deleted restaurant from local state to update UI
      setRestaurants((prevRestaurants) =>
        prevRestaurants.filter((r) => r.id !== restaurantId),
      );
    } catch (err) {
      setDeleteMessage({
        type: "error",
        text: err.response?.data?.message || "Failed to delete restaurant.",
      });
      console.error(`Error deleting restaurant ${restaurantId}:`, err);
    } finally {
      setLoading(false); // Reset loading state
    }
  };

  if (loading && !deleteMessage) {
    // Show loading only for initial fetch or if delete is pending
    return (
      <div className="container text-center mt-5">
        <div className="spinner-border" role="status">
          <span className="visually-hidden">Loading restaurants...</span>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="container mt-4">
        <div className="alert alert-danger text-center">Error: {error}</div>
      </div>
    );
  }

  return (
    <div className="container mt-4 p-4 bg-light rounded shadow-sm">
      <h1 className="text-center mb-4">Manage Restaurants</h1>
      {deleteMessage && (
        <div
          className={`alert ${
            deleteMessage.type === "success" ? "alert-success" : "alert-danger"
          } text-center`}
          role="alert"
        >
          {deleteMessage.text}
        </div>
      )}

      <Link to="/admin/restaurants/new" className="btn btn-primary mb-3">
        Add New Restaurant
      </Link>

      {restaurants.length > 0 ? (
        <div className="table-responsive">
          <table className="table table-striped table-hover">
            <thead className="table-dark">
              <tr>
                <th>Name</th>
                <th>Cuisine</th>
                <th>City</th>
                <th>Rating</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {restaurants.map((restaurant) => (
                <tr key={restaurant.restaurantId}>
                  <td>{restaurant.restaurantName || restaurant.name}</td>
                  <td>{restaurant.cuisineType || "N/A"}</td>
                  <td>{restaurant.city || "N/A"}</td>
                  <td>
                    {restaurant.rating ? restaurant.rating.toFixed(1) : "N/A"}
                  </td>
                  <td>
                    <Link
                      to={`/admin/restaurants/edit/${restaurant.restaurantId}`}
                      className="btn btn-success btn-sm me-2"
                    >
                      Edit
                    </Link>
                    <button
                      onClick={() => handleDelete(restaurant.id)}
                      className="btn btn-danger btn-sm"
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      ) : (
        <p className="text-center text-muted mt-4">
          No restaurants found. Add one!
        </p>
      )}
    </div>
  );
}

export default AdminRestaurantListPage;

