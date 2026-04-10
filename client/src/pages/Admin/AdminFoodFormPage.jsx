// AdminFoodFormPage.jsx
import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import adminRestaurantService from '../../services/adminRestaurantService';
import adminMenuItemService from '../../services/adminMenuItemService';

function AdminFoodFormPage() {
  const { id } = useParams(); // Get menu item ID from URL for edit mode
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    name: '',
    description: '',
    price: '',
    imageUrl: '',
    restaurantId: '', // To associate with a restaurant
  });
  const [restaurants, setRestaurants] = useState([]); // To populate restaurant dropdown
  const [loading, setLoading] = useState(true); // For initial fetches
  const [submitLoading, setSubmitLoading] = useState(false); // For form submission
  const [error, setError] = useState(null);
  const [submitMessage, setSubmitMessage] = useState(null); // Success/error message after submit

  const isEditMode = Boolean(id);

  useEffect(() => {
    const fetchInitialData = async () => {
      // Token check before any action
      const token = localStorage.getItem('authToken');
      if (!token) {
        setError('Authentication required. Please log in as an administrator.');
        setLoading(false);
        return;
      }

      try {
        // Fetch list of restaurants for the dropdown
        const restaurantsData = await adminRestaurantService.getAllRestaurants();
        setRestaurants(restaurantsData);

        // If in edit mode, fetch existing menu item data
        if (isEditMode) {
          const menuItemData = await adminMenuItemService.getMenuItemById(id);
          setFormData({
            name: menuItemData.name || '',
            description: menuItemData.description || '',
            price: menuItemData.price || '',
            imageUrl: menuItemData.imageUrl || '',
            restaurantId: menuItemData.restaurantId || '',
          });
        }
      } catch (err) {
        setError(err.response?.data?.message || 'Failed to fetch initial data.');
        console.error('Error fetching initial data for food form:', err);
      } finally {
        setLoading(false);
      }
    };
    fetchInitialData();
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
    
    const token = localStorage.getItem('authToken');
    if (!token) {
      setError('Authentication required for this action.');
      setSubmitLoading(false);
      return;
    }

    try {
      const dataPayload = { ...formData, price: parseFloat(formData.price) };

      if (isEditMode) {
        await adminMenuItemService.updateMenuItem(id, dataPayload);
        setSubmitMessage({ type: 'success', text: 'Menu item updated successfully!' });
      } else {
        await adminMenuItemService.createMenuItem(dataPayload);
        setSubmitMessage({ type: 'success', text: 'Menu item added successfully!' });
        setFormData({ name: '', description: '', price: '', imageUrl: '', restaurantId: '' }); // Clear form
      }
      setTimeout(() => navigate('/admin/restaurants'), 1500); // Navigate after a delay
    } catch (err) {
      const errorMessage = err.response?.data?.message || `Failed to ${isEditMode ? 'update' : 'add'} menu item.`;
      setSubmitMessage({ type: 'error', text: errorMessage });
      setError(errorMessage);
      console.error(`Error ${isEditMode ? 'updating' : 'adding'} menu item:`, err);
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

  const selectStyle = {
    ...inputStyle,
    appearance: 'none', // Remove default arrow
    backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 20 20'%3E%3Cpath fill='%23666' d='M10 12l-6-6h12z'/%3E%3C/svg%3E")`,
    backgroundRepeat: 'no-repeat',
    backgroundPosition: 'right 10px center',
    backgroundSize: '12px',
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

  if (loading) {
    return <div style={{ ...formContainerStyle, textAlign: 'center' }}>Loading data...</div>;
  }

  if (error && !submitMessage) {
    return <div style={{ ...formContainerStyle, color: 'red', textAlign: 'center' }}>Error: {error}</div>;
  }

  return (
    <div style={formContainerStyle}>
      <h2 style={titleStyle}>{isEditMode ? 'Edit Menu Item' : 'Add New Menu Item'}</h2>

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
          <label htmlFor="name" style={labelStyle}>Menu Item Name:</label>
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
          <label htmlFor="price" style={labelStyle}>Price:</label>
          <input
            type="number"
            id="price"
            name="price"
            value={formData.price}
            onChange={handleInputChange}
            required
            step="0.01"
            style={inputStyle}
          />
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
          <label htmlFor="restaurantId" style={labelStyle}>Restaurant:</label>
          <select
            id="restaurantId"
            name="restaurantId"
            value={formData.restaurantId}
            onChange={handleInputChange}
            required
            style={selectStyle}
          >
            <option value="">-- Select a Restaurant --</option>
            {restaurants.map(restaurant => (
              <option key={restaurant.id} value={restaurant.id}>{restaurant.name}</option>
            ))}
          </select>
        </div>
        <button type="submit" disabled={submitLoading} style={buttonStyle}>
          {submitLoading ? (isEditMode ? 'Updating...' : 'Adding...') : (isEditMode ? 'Update Menu Item' : 'Add Menu Item')}
        </button>
      </form>
    </div>
  );
}

export default AdminFoodFormPage;