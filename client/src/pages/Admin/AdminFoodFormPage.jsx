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

  if (loading) {
    return (
      <div className="container text-center mt-5">
        <div className="spinner-border" role="status">
          <span className="visually-hidden">Loading data...</span>
        </div>
      </div>
    );
  }

  if (error && !submitMessage) {
    return (
      <div className="container mt-4">
        <div className="alert alert-danger text-center">Error: {error}</div>
      </div>
    );
  }

  return (
    <div className="container mt-4 p-4 bg-light rounded shadow-sm" style={{ maxWidth: '600px' }}>
      <h2 className="text-center mb-4">{isEditMode ? 'Edit Menu Item' : 'Add New Menu Item'}</h2>

      {submitMessage && (
        <div
          className={`alert ${submitMessage.type === 'success' ? 'alert-success' : 'alert-danger'} text-center`}
          role="alert"
        >
          {submitMessage.text}
        </div>
      )}

      <form onSubmit={handleSubmit}>
        <div className="mb-3">
          <label htmlFor="name" className="form-label">Menu Item Name:</label>
          <input
            type="text"
            id="name"
            name="name"
            value={formData.name}
            onChange={handleInputChange}
            required
            className="form-control"
          />
        </div>
        <div className="mb-3">
          <label htmlFor="description" className="form-label">Description:</label>
          <textarea
            id="description"
            name="description"
            value={formData.description}
            onChange={handleInputChange}
            required
            rows="4"
            className="form-control"
          ></textarea>
        </div>
        <div className="mb-3">
          <label htmlFor="price" className="form-label">Price:</label>
          <input
            type="number"
            id="price"
            name="price"
            value={formData.price}
            onChange={handleInputChange}
            required
            step="0.01"
            className="form-control"
          />
        </div>
        <div className="mb-3">
          <label htmlFor="imageUrl" className="form-label">Image URL:</label>
          <input
            type="text"
            id="imageUrl"
            name="imageUrl"
            value={formData.imageUrl}
            onChange={handleInputChange}
            className="form-control"
          />
        </div>
        <div className="mb-3">
          <label htmlFor="restaurantId" className="form-label">Restaurant:</label>
          <select
            id="restaurantId"
            name="restaurantId"
            value={formData.restaurantId}
            onChange={handleInputChange}
            required
            className="form-select"
          >
            <option value="">-- Select a Restaurant --</option>
            {restaurants.map(restaurant => (
              <option key={restaurant.id} value={restaurant.id}>{restaurant.name}</option>
            ))}
          </select>
        </div>
        <button type="submit" disabled={submitLoading} className="btn btn-primary w-100 mt-3">
          {submitLoading ? (
            <>
              <span className="spinner-border spinner-border-sm" role="status" aria-hidden="true"></span>
              {isEditMode ? ' Updating...' : ' Adding...'}
            </>
          ) : (isEditMode ? 'Update Menu Item' : 'Add Menu Item')}
        </button>
      </form>
    </div>
  );
}

export default AdminFoodFormPage;