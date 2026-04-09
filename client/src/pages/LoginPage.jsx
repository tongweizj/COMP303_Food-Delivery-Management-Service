// LoginPage.jsx
import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

function LoginPage() {
  const [usernameOrEmail, setUsernameOrEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    try {
      // Assume API Gateway is configured to forward /api/auth/login to the appropriate service
      const response = await axios.post('/api/auth/login', {
        usernameOrEmail,
        password,
      });

      // Placeholder for handling successful login
      // In a real app, you would store the received token (e.g., JWT) in localStorage
      const token = response.data.token; 
      if (token) {
        localStorage.setItem('authToken', token);
        // Redirect to a protected page or home
        navigate('/profile'); // Redirect to user profile or home
        console.log('Login successful:', response.data);
      } else {
        setError('Login successful, but no token received.');
      }
    } catch (err) {
      setError(err.response?.data?.message || 'Login failed. Please check your credentials.');
      console.error('Login error:', err);
    } finally {
      setLoading(false);
    }
  };

  const formContainerStyle = {
    padding: '20px',
    maxWidth: '400px',
    margin: '50px auto',
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

  const errorStyle = {
    color: 'red',
    textAlign: 'center',
    marginBottom: '15px',
  };

  return (
    <div style={formContainerStyle}>
      <h2 style={titleStyle}>Login</h2>
      <form onSubmit={handleSubmit}>
        <div style={formGroupStyle}>
          <label htmlFor="usernameOrEmail" style={labelStyle}>Username or Email:</label>
          <input
            type="text"
            id="usernameOrEmail"
            name="usernameOrEmail"
            value={usernameOrEmail}
            onChange={(e) => setUsernameOrEmail(e.target.value)}
            required
            style={inputStyle}
          />
        </div>
        <div style={formGroupStyle}>
          <label htmlFor="password" style={labelStyle}>Password:</label>
          <input
            type="password"
            id="password"
            name="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
            style={inputStyle}
          />
        </div>
        {error && <p style={errorStyle}>{error}</p>}
        <button type="submit" disabled={loading} style={buttonStyle}>
          {loading ? 'Logging In...' : 'Login'}
        </button>
      </form>
    </div>
  );
}

export default LoginPage;