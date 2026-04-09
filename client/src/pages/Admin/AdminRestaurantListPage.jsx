// AdminRestaurantListPage.jsx
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link, useNavigate } from 'react-router-dom';

function AdminRestaurantListPage() {
  const [restaurants, setRestaurants] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [deleteMessage, setDeleteMessage] = useState(null); // For delete operation status
  const navigate = useNavigate();

  // Function to get auth token (placeholder)
  const getAuthToken = () => {
    return localStorage.getItem('authToken'); // Replace with your actual token retrieval logic
  };

  const fetchRestaurants = async () => {
    const token = getAuthToken();
    if (!token) {
      setError('Authentication required. Please log in as an administrator.');
      setLoading(false);
      return;
    }

    try {
      // Assume API Gateway is configured to forward /api/admin/restaurants to the appropriate service
      const response = await axios.get('/api/admin/restaurants', {
        headers: { Authorization: `Bearer ${token}` },
      });
      setRestaurants(response.data);
    } catch (err) {
      setError(err.response?.data?.message || 'Failed to load restaurants.');
      console.error('Error fetching admin restaurants:', err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchRestaurants();
  }, []);

  const handleDelete = async (restaurantId) => {
    if (!window.confirm('Are you sure you want to delete this restaurant? This action cannot be undone.')) {
      return;
    }
    setLoading(true);
    setDeleteMessage(null);
    const token = getAuthToken();

    try {
      await axios.delete(`/api/admin/restaurants/${restaurantId}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      setDeleteMessage({ type: 'success', text: 'Restaurant deleted successfully!' });
      // Refresh the list after deletion
      fetchRestaurants();
    } catch (err) {
      setDeleteMessage({ type: 'error', text: err.response?.data?.message || 'Failed to delete restaurant.' });
      console.error(`Error deleting restaurant ${restaurantId}:`, err);
    } finally {
      setLoading(false);
    }
  };

  const pageStyle = {
    padding: '20px',
    maxWidth: '1200px',
    margin: '20px auto',
    backgroundColor: '#f9f9f9',
    borderRadius: '8px',
    boxShadow: '0 2px 8px rgba(0,0,0,0.1)',
    fontFamily: 'Arial, sans-serif',
  };

  const titleStyle = {
    textAlign: 'center',
    color: '#333',
    marginBottom: '25px',
  };

  const tableStyle = {
    width: '100%',
    borderCollapse: 'collapse',
    marginTop: '20px',
  };

  const thStyle = {
    border: '1px solid #ddd',
    padding: '12px',
    textAlign: 'left',
    backgroundColor: '#007bff',
    color: 'white',
  };

  const tdStyle = {
    border: '1px solid #ddd',
    padding: '12px',
    textAlign: 'left',
  };

  const actionButtonStyle = {
    padding: '8px 12px',
    marginRight: '8px',
    borderRadius: '4px',
    cursor: 'pointer',
    border: 'none',
    fontSize: '0.9em',
  };

  const editButtonStyle = {
    ...actionButtonStyle,
    backgroundColor: '#28a745', // Green
    color: 'white',
  };

  const deleteButtonStyle = {
    ...actionButtonStyle,
    backgroundColor: '#dc3545', // Red
    color: 'white',
  };

  const addButtonStyle = {
    backgroundColor: '#17a2b8', // Info blue
    color: 'white',
    padding: '10px 15px',
    border: 'none',
    borderRadius: '4px',
    cursor: 'pointer',
    fontSize: '1em',
    marginBottom: '20px',
    display: 'block',
    width: 'fit-content',
    textDecoration: 'none',
  };

  const messageStyle = {
    padding: '10px',
    borderRadius: '4px',
    marginBottom: '15px',
    textAlign: 'center',
  };

  if (loading) {
    return <div style={{ ...pageStyle, textAlign: 'center' }}>Loading restaurants...</div>;
  }

  if (error) {
    return <div style={{ ...pageStyle, color: 'red', textAlign: 'center' }}>Error: {error}</div>;
  }

  return (
    <div style={pageStyle}>
      <h1 style={titleStyle}>Manage Restaurants</h1>
      {deleteMessage && (
        <div
          style={{
            ...messageStyle,
            backgroundColor: deleteMessage.type === 'success' ? '#d4edda' : '#f8d7da',
            color: deleteMessage.type === 'success' ? '#155724' : '#721c24',
            border: `1px solid ${deleteMessage.type === 'success' ? '#c3e6cb' : '#f5c6cb'}`,
          }}
        >
          {deleteMessage.text}
        </div>
      )}

      <Link to="/admin/restaurants/new" style={addButtonStyle}>Add New Restaurant</Link>

      {restaurants.length > 0 ? (
        <table style={tableStyle}>
          <thead>
            <tr>
              <th style={thStyle}>ID</th>
              <th style={thStyle}>Name</th>
              <th style={thStyle}>Description</th>
              <th style={thStyle}>Image</th>
              <th style={thStyle}>Actions</th>
            </tr>
          </thead>
          <tbody>
            {restaurants.map(restaurant => (
              <tr key={restaurant.id}>
                <td style={tdStyle}>{restaurant.id}</td>
                <td style={tdStyle}>{restaurant.name}</td>
                <td style={tdStyle}>{restaurant.description}</td>
                <td style={tdStyle}>
                  {restaurant.imageUrl && (
                    <img src={restaurant.imageUrl} alt={restaurant.name} style={{ width: '100px', height: '60px', objectFit: 'cover', borderRadius: '4px' }} />
                  )}
                </td>
                <td style={tdStyle}>
                  <Link to={`/admin/restaurants/edit/${restaurant.id}`} style={editButtonStyle}>Edit</Link>
                  <button onClick={() => handleDelete(restaurant.id)} style={deleteButtonStyle}>Delete</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      ) : (
        <p style={{ textAlign: 'center', color: '#777' }}>No restaurants found. Add one!</p>
      )}
    </div>
  );
}

export default AdminRestaurantListPage;