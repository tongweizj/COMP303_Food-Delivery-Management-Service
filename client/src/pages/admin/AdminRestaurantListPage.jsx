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

  const pageStyle = {
    padding: "20px",
    maxWidth: "1200px",
    margin: "20px auto",
    backgroundColor: "#f9f9f9",
    borderRadius: "8px",
    boxShadow: "0 2px 8px rgba(0,0,0,0.1)",
    fontFamily: "Arial, sans-serif",
  };

  const titleStyle = {
    textAlign: "center",
    color: "#333",
    marginBottom: "25px",
  };

  const tableStyle = {
    width: "100%",
    borderCollapse: "collapse",
    marginTop: "20px",
  };

  const thStyle = {
    border: "1px solid #ddd",
    padding: "12px",
    textAlign: "left",
    backgroundColor: "#007bff",
    color: "white",
  };

  const tdStyle = {
    border: "1px solid #ddd",
    padding: "12px",
    textAlign: "left",
  };

  const actionButtonStyle = {
    padding: "8px 12px",
    marginRight: "8px",
    borderRadius: "4px",
    cursor: "pointer",
    border: "none",
    fontSize: "0.9em",
  };

  const editButtonStyle = {
    ...actionButtonStyle,
    backgroundColor: "#28a745", // Green
    color: "white",
    textDecoration: "none", // For Link component
  };

  const deleteButtonStyle = {
    ...actionButtonStyle,
    backgroundColor: "#dc3545", // Red
    color: "white",
  };

  const addButtonStyle = {
    backgroundColor: "#17a2b8", // Info blue
    color: "white",
    padding: "10px 15px",
    border: "none",
    borderRadius: "4px",
    cursor: "pointer",
    fontSize: "1em",
    marginBottom: "20px",
    display: "block",
    width: "fit-content",
    textDecoration: "none",
  };

  const messageStyle = {
    padding: "10px",
    borderRadius: "4px",
    marginBottom: "15px",
    textAlign: "center",
  };

  if (loading && !deleteMessage) {
    // Show loading only for initial fetch or if delete is pending
    return (
      <div style={{ ...pageStyle, textAlign: "center" }}>
        Loading restaurants...
      </div>
    );
  }

  if (error) {
    return (
      <div style={{ ...pageStyle, color: "red", textAlign: "center" }}>
        Error: {error}
      </div>
    );
  }

  return (
    <div style={pageStyle}>
      <h1 style={titleStyle}>Manage Restaurants</h1>
      {deleteMessage && (
        <div
          style={{
            ...messageStyle,
            backgroundColor:
              deleteMessage.type === "success" ? "#d4edda" : "#f8d7da",
            color: deleteMessage.type === "success" ? "#155724" : "#721c24",
            border: `1px solid ${deleteMessage.type === "success" ? "#c3e6cb" : "#f5c6cb"}`,
          }}
        >
          {deleteMessage.text}
        </div>
      )}

      <Link to="/admin/restaurants/new" style={addButtonStyle}>
        Add New Restaurant
      </Link>

      {restaurants.length > 0 ? (
        <table style={tableStyle}>
          <thead>
            <tr>
              <th style={thStyle}>Name</th>
              <th style={thStyle}>Cuisine</th>
              <th style={thStyle}>City</th>
              <th style={thStyle}>Rating</th>
              <th style={thStyle}>Actions</th>
            </tr>
          </thead>
          <tbody>
            {restaurants.map((restaurant) => (
              <tr key={restaurant.restaurantId}>
                {" "}
                {/* Assuming restaurant objects have an 'id' field */}
                <td style={tdStyle}>{restaurant.restaurantName}</td>
                <td style={tdStyle}>{restaurant.cuisineType || "N/A"}</td>
                <td style={tdStyle}>{restaurant.city || "N/A"}</td>
                <td style={tdStyle}>
                  {restaurant.rating ? restaurant.rating.toFixed(1) : "N/A"}
                </td>
                <td style={tdStyle}>
                  <Link
                    to={`/admin/restaurants/edit/${restaurant.id}`}
                    style={editButtonStyle}
                  >
                    Edit
                  </Link>
                  <button
                    onClick={() => handleDelete(restaurant.id)}
                    style={deleteButtonStyle}
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      ) : (
        <p style={{ textAlign: "center", color: "#777" }}>
          No restaurants found. Add one!
        </p>
      )}
    </div>
  );
}

export default AdminRestaurantListPage;
