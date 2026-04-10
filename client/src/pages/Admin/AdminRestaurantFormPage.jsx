// AdminRestaurantFormPage.jsx
import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import adminRestaurantService from '../../services/adminRestaurantService';

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

  useEffect(() => {
    // Check for token before any action
    const token = localStorage.getItem('authToken');
    if (!token) {
      setError('Authentication required for this page.');
      setLoading(false);
      return;
    }

    if (isEditMode) {
      const fetchRestaurant = async () => {
        try {
          const data = await adminRestaurantService.getRestaurantById(id);
          setFormData(data);
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

    // Token check before submission
    const token = localStorage.getItem('authToken');
    if (!token) {
      setError('Authentication required for this action.');
      setSubmitLoading(false);
      return;
    }

    try {
      if (isEditMode) {
        await adminRestaurantService.updateRestaurant(id, formData);
        setSubmitMessage({ type: 'success', text: 'Restaurant updated successfully!' });
      } else {
        await adminRestaurantService.createRestaurant(formData);
        setSubmitMessage({ type: 'success', text: 'Restaurant added successfully!' });
        setFormData({ name: '', description: '', imageUrl: '', address: '' }); // Clear form after add
      }
      // Use a timeout to allow user to see the success message before navigating
      setTimeout(() => navigate('/admin/restaurants'), 1500);
    } catch (err) {
      const errorMessage = err.response?.data?.message || `Failed to ${isEditMode ? 'update' : 'add'} restaurant.`;
      setSubmitMessage({ type: 'error', text: errorMessage });
      setError(errorMessage);
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

  if (error && !submitMessage) { // Only show general error if there is no specific submit message
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