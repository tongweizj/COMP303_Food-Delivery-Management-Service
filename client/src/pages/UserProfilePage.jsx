// UserProfilePage.jsx
import React, { useState, useEffect } from 'react';
import axios from 'axios';

function UserProfilePage() {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [isEditing, setIsEditing] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    address: '',
  });
  const [submitMessage, setSubmitMessage] = useState(null); // For success/error message on update

  // Function to get auth token (placeholder)
  const getAuthToken = () => {
    return localStorage.getItem('authToken'); // Replace with your actual token retrieval logic
  };

  useEffect(() => {
    const fetchUserProfile = async () => {
      const token = getAuthToken();
      if (!token) {
        setError('You must be logged in to view your profile.');
        setLoading(false);
        return;
      }

      try {
        // Assume API Gateway is configured to forward /api/users/profile to the appropriate service
        const response = await axios.get('/api/users/profile', {
          headers: { Authorization: `Bearer ${token}` },
        });
        setUser(response.data);
        setFormData({
          name: response.data.name || '',
          email: response.data.email || '',
          address: response.data.address || '',
        });
      } catch (err) {
        setError(err.response?.data?.message || 'Failed to fetch user profile.');
        console.error('Fetch user profile error:', err);
      } finally {
        setLoading(false);
      }
    };

    fetchUserProfile();
  }, []);

  const handleEditToggle = () => {
    setIsEditing(!isEditing);
    // Reset form data if canceling edit
    if (isEditing && user) {
      setFormData({
        name: user.name || '',
        email: user.email || '',
        address: user.address || '',
      });
    }
    setSubmitMessage(null); // Clear messages on toggle
  };

  const handleFormChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({ ...prevData, [name]: value }));
  };

  const handleFormSubmit = async (e) => {
    e.preventDefault();
    setLoading(true); // Set loading for form submission
    setSubmitMessage(null);
    const token = getAuthToken();

    try {
      // Assume API Gateway is configured to forward /api/users/profile PUT to the appropriate service
      const response = await axios.put('/api/users/profile', formData, {
        headers: { Authorization: `Bearer ${token}` },
      });
      setUser(response.data); // Update local user state with new data
      setIsEditing(false); // Exit edit mode
      setSubmitMessage({ type: 'success', text: 'Profile updated successfully!' });
      console.log('Profile updated:', response.data);
    } catch (err) {
      setSubmitMessage({ type: 'error', text: err.response?.data?.message || 'Failed to update profile.' });
      console.error('Update profile error:', err);
    } finally {
      setLoading(false); // Reset loading state
    }
  };

  const pageStyle = {
    padding: '20px',
    maxWidth: '800px',
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

  const infoGroupStyle = {
    marginBottom: '15px',
    borderBottom: '1px dashed #eee',
    paddingBottom: '10px',
  };

  const labelStyle = {
    display: 'block',
    marginBottom: '5px',
    fontWeight: 'bold',
    color: '#555',
  };

  const valueStyle = {
    color: '#333',
    fontSize: '1.1em',
  };

  const buttonStyle = {
    backgroundColor: '#007bff',
    color: 'white',
    padding: '10px 15px',
    border: 'none',
    borderRadius: '4px',
    cursor: 'pointer',
    fontSize: '0.9em',
    marginRight: '10px',
  };

  const cancelButtonLightStyle = {
    backgroundColor: '#6c757d', // Grey
    color: 'white',
    padding: '10px 15px',
    border: 'none',
    borderRadius: '4px',
    cursor: 'pointer',
    fontSize: '0.9em',
  };

  const inputStyle = {
    width: '100%',
    padding: '10px',
    border: '1px solid #ddd',
    borderRadius: '4px',
    boxSizing: 'border-box',
    marginBottom: '10px',
  };

  const messageStyle = {
    padding: '10px',
    borderRadius: '4px',
    marginBottom: '15px',
    textAlign: 'center',
  };

  if (loading && !user) { // Only show full loading if initial fetch
    return <div style={{ ...pageStyle, textAlign: 'center' }}>Loading profile...</div>;
  }

  if (error) {
    return <div style={{ ...pageStyle, color: 'red', textAlign: 'center' }}>Error: {error}</div>;
  }

  if (!user && !loading) {
    return <div style={{ ...pageStyle, textAlign: 'center' }}>No user data available. Please log in.</div>;
  }

  return (
    <div style={pageStyle}>
      <h2 style={titleStyle}>User Profile</h2>

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

      {!isEditing ? (
        <div>
          <div style={infoGroupStyle}>
            <label style={labelStyle}>Name:</label>
            <p style={valueStyle}>{user.name || 'N/A'}</p>
          </div>
          <div style={infoGroupStyle}>
            <label style={labelStyle}>Email:</label>
            <p style={valueStyle}>{user.email || 'N/A'}</p>
          </div>
          <div style={infoGroupStyle}>
            <label style={labelStyle}>Address:</label>
            <p style={valueStyle}>{user.address || 'N/A'}</p>
          </div>
          <button onClick={handleEditToggle} style={buttonStyle}>
            Edit Profile
          </button>
        </div>
      ) : (
        <form onSubmit={handleFormSubmit}>
          <div style={infoGroupStyle}>
            <label htmlFor="name" style={labelStyle}>Name:</label>
            <input
              type="text"
              id="name"
              name="name"
              value={formData.name}
              onChange={handleFormChange}
              style={inputStyle}
            />
          </div>
          <div style={infoGroupStyle}>
            <label htmlFor="email" style={labelStyle}>Email:</label>
            <input
              type="email"
              id="email"
              name="email"
              value={formData.email}
              onChange={handleFormChange}
              required
              style={inputStyle}
            />
          </div>
          <div style={infoGroupStyle}>
            <label htmlFor="address" style={labelStyle}>Address:</label>
            <input
              type="text"
              id="address"
              name="address"
              value={formData.address}
              onChange={handleFormChange}
              style={inputStyle}
            />
          </div>
          <button type="submit" disabled={loading} style={buttonStyle}>
            {loading ? 'Saving...' : 'Save Changes'}
          </button>
          <button type="button" onClick={handleEditToggle} style={cancelButtonLightStyle}>
            Cancel
          </button>
        </form>
      )}
    </div>
  );
}

export default UserProfilePage;