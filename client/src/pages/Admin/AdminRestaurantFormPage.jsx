// AdminRestaurantFormPage.jsx
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams, useNavigate } from 'react-router-dom';

function AdminRestaurantFormPage() {
  const { id } = useParams(); // Get restaurant ID from URL for edit mode
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    name: '',
    description: '',
    imageUrl: '',
    address: '', // Added address for a more complete restaurant form
  });
  const [loading, setLoading] = useState(true); // For initial fetch in edit mode
  const [submitLoading, setSubmitLoading] = useState(false); // For form submission
  const [error, setError] = useState(null);
  const [submitMessage, setSubmitMessage] = useState(null); // Success/error message after submit

  const isEditMode = Boolean(id);

  // Function to get auth token (placeholder)
  const getAuthToken = () => {
    return localStorage.getItem('authToken'); // Replace with your actual token retrieval logic
  };

  useEffect(() => {
    if (isEditMode) {
      const fetchRestaurant = async () => {
        const token = getAuthToken();
        if (!token) {
          setError('Authentication required for editing.');
          setLoading(false);
          return;
        }
        try {
          // Assume API Gateway is configured to forward /api/admin/restaurants/:id
          const response = await axios.get(`/api/admin/restaurants/${id}`, {
            headers: { Authorization: `Bearer ${token}` },
          });
          setFormData(response.data);
        } catch (err) {
          setError(err.response?.data?.message || 'Failed to fetch restaurant data for editing.');
          console.error('Error fetching restaurant for edit:', err);
        } finally {
          setLoading(false);
        }
      };
      fetchRestaurant();
    } else {
      setLoading(false); // Not edit mode, so no initial loading
    }
  }, [id, isEditMode]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({ ...prevData, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSubmitLoading(true);
    setSubmitMessage(null);
    setError(null);
    const token = getAuthToken();

    if (!token) {
      setError('Authentication required for this action.');
      setSubmitLoading(false);
      return;
    }

    try {
      if (isEditMode) {
        // PUT request for updating
        await axios.put(`/api/admin/restaurants/${id}`, formData, {
          headers: { Authorization: `Bearer ${token}` },
        });
        setSubmitMessage({ type: 'success', text: 'Restaurant updated successfully!' });
      } else {
        // POST request for creating
        await axios.post('/api/admin/restaurants', formData, {
          headers: { Authorization: `Bearer ${token}` },
        });
        setSubmitMessage({ type: 'success', text: 'Restaurant added successfully!' });
        setFormData({ name: '', description: '', imageUrl: '', address: '' }); // Clear form after add
      }
      navigate('/admin/restaurants'); // Navigate back to list after success
    } catch (err) {
      setSubmitMessage({ type: 'error', text: err.response?.data?.message || `Failed to ${isEditMode ? 'update' : 'add'} restaurant.` });
      setError(err.response?.data?.message || `Error ${isEditMode ? 'updating' : 'adding'} restaurant.`);
      console.error(`Error ${isEditMode ? 'updating' : 'adding'} restaurant:`, err);
    } finally {
      setSubmitLoading(false);
    }
  };

  const formContainerStyle = {
    padding: '20px',
    maxWidth: '600px',
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

  const formGroupStyle = {
    marginBottom: '15px',
  };

  const labelStyle = {
    display: 'block',
    marginBottom: '5px',
    fontWeight: 'bold',
    color: '#555',
  };

  const inputStyle = {
    width: '100%',
    padding: '10px',
    border: '1px solid #ddd',
    borderRadius: '4px',
    boxSizing: 'border-box',
  };

  const buttonStyle = {
    backgroundColor: '#007bff',
    color: 'white',
    padding: '12px 20px',
    border: 'none',
    borderRadius: '4px',
    cursor: 'pointer',
    fontSize: '1em',
    width: '100%',
    marginTop: '10px',
  };

  const messageStyle = {
    padding: '10px',
    borderRadius: '4px',
    marginBottom: '15px',
    textAlign: 'center',
  };

  if (loading && isEditMode) {
    return <div style={{ ...formContainerStyle, textAlign: 'center' }}>Loading restaurant data...</div>;
  }

  if (error) {
    return <div style={{ ...formContainerStyle, color: 'red', textAlign: 'center' }}>Error: {error}</div>;
  }

  return (
    <div style={formContainerStyle}>
      <h2 style={titleStyle}>{isEditMode ? 'Edit Restaurant' : 'Add New Restaurant'}</h2>

      {submitMessage && (
        <div
          style={{
            ...messageStyle,
            backgroundColor: submitMessage.type === 'success' ? '#d4edda' : '#f8d7da',
            color: submitMessage.type === 'success' ? '#155724' : '#721c24',
            border: `1px solid ${submitMessage.type === 'success' ? '#c3e6cb' : '#f5c6cb'}`,
          }}
        >
          {submitMessage.text}
        </div>
      )}

      <form onSubmit={handleSubmit}>
        <div style={formGroupStyle}>
          <label htmlFor="name" style={labelStyle}>Restaurant Name:</label>
          <input
            type="text"
            id="name"
            name="name"
            value={formData.name}
            onChange={handleInputChange}
            required
            style={inputStyle}
          />
        </div>
        <div style={formGroupStyle}>
          <label htmlFor="description" style={labelStyle}>Description:</label>
          <textarea
            id="description"
            name="description"
            value={formData.description}
            onChange={handleInputChange}
            required
            rows="4"
            style={inputStyle}
          ></textarea>
        </div>
        <div style={formGroupStyle}>
          <label htmlFor="imageUrl" style={labelStyle}>Image URL:</label>
          <input
            type="text"
            id="imageUrl"
            name="imageUrl"
            value={formData.imageUrl}
            onChange={handleInputChange}
            style={inputStyle}
          />
        </div>
        <div style={formGroupStyle}>
          <label htmlFor="address" style={labelStyle}>Address:</label>
          <input
            type="text"
            id="address"
            name="address"
            value={formData.address}
            onChange={handleInputChange}
            style={inputStyle}
          />
        </div>
        <button type="submit" disabled={submitLoading} style={buttonStyle}>
          {submitLoading ? (isEditMode ? 'Updating...' : 'Adding...') : (isEditMode ? 'Update Restaurant' : 'Add Restaurant')}
        </button>
      </form>
    </div>
  );
}

export default AdminRestaurantFormPage;