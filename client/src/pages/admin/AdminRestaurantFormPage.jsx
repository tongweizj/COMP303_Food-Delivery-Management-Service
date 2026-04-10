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

  if (loading && isEditMode) {
    return (
      <div className="container text-center mt-5">
        <div className="spinner-border" role="status">
          <span className="visually-hidden">Loading restaurant data...</span>
        </div>
      </div>
    );
  }

  if (error && !submitMessage) { // Only show general error if there is no specific submit message
    return (
      <div className="container mt-4">
        <div className="alert alert-danger text-center">Error: {error}</div>
      </div>
    );
  }

  return (
    <div className="container mt-4 p-4 bg-light rounded shadow-sm" style={{ maxWidth: '600px' }}>
      <h2 className="text-center mb-4">{isEditMode ? 'Edit Restaurant' : 'Add New Restaurant'}</h2>

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
          <label htmlFor="name" className="form-label">Restaurant Name:</label>
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
          <label htmlFor="address" className="form-label">Address:</label>
          <input
            type="text"
            id="address"
            name="address"
            value={formData.address}
            onChange={handleInputChange}
            className="form-control"
          />
        </div>
        <button type="submit" disabled={submitLoading} className="btn btn-primary w-100 mt-3">
          {submitLoading ? (
            <>
              <span className="spinner-border spinner-border-sm" role="status" aria-hidden="true"></span>
              {isEditMode ? ' Updating...' : ' Adding...'}
            </>
          ) : (isEditMode ? 'Update Restaurant' : 'Add Restaurant')}
        </button>
      </form>
    </div>
  );
}

export default AdminRestaurantFormPage;