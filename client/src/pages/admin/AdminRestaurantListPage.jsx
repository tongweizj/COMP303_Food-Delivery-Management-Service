// AdminRestaurantListPage.jsx
import React, { useState, useEffect } from "react";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";

function AdminRestaurantListPage() {
  const [restaurants, setRestaurants] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [deleteMessage, setDeleteMessage] = useState(null); // For delete operation status
  const navigate = useNavigate();

  // Placeholder for getting auth token (if needed for this endpoint)
  const getAuthToken = () => {
    return localStorage.getItem("authToken"); // Replace with your actual token retrieval logic
  };

  const fetchRestaurants = async () => {
    setLoading(true);
    setError(null);
    setDeleteMessage(null); // Clear previous messages on fetch

    // For this specific endpoint, the user specified http://localhost:8084/api/restaurants
    // It's unclear if this particular endpoint requires authentication.
    // Assuming it *might* not for a public listing, but typically admin operations do.
    // If it requires auth, uncomment the token check and header below.
    const token = getAuthToken();
    // if (!token) {
    //   setError('Authentication required. Please log in as an administrator.');
    //   setLoading(false);
    //   return;
    // }

    try {
      const response = await axios.get(
        "http://localhost:8084/api/restaurants",
        // , { headers: { Authorization: `Bearer ${token}` } } // Uncomment if auth is needed
      );
      setRestaurants(response.data);
    } catch (err) {
      setError(err.response?.data?.message || "Failed to load restaurants.");
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
    const token = getAuthToken();

    //  This needs to be uncommented after login functionality is implemented.
    // if (!token) {
    //   setDeleteMessage({ type: 'error', text: 'Authentication required to delete restaurant.' });
    //   setLoading(false);
    //   return;
    // }

    try {
      // User specified http://localhost:8084/api/restaurants for GET, assuming DELETE uses similar base.
      await axios.delete(
        `http://localhost:8084/api/restaurants/${restaurantId}`,
        {
          // headers: { Authorization: `Bearer ${token}` },
        },
      );
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
          className={`alert ${deleteMessage.type === "success" ? "alert-success" : "alert-danger"} text-center`}
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
                  <td>{restaurant.restaurantName}</td>
                  <td>{restaurant.cuisineType || "N/A"}</td>
                  <td>{restaurant.city || "N/A"}</td>
                  <td>
                    {restaurant.rating ? restaurant.rating.toFixed(1) : "N/A"}
                  </td>
                  <td>
                    <Link
                      to={`/admin/restaurants/edit/${restaurant.id}`}
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
