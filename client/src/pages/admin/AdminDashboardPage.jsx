// AdminDashboardPage.jsx
import React from 'react';
import { Link } from 'react-router-dom';

function AdminDashboardPage() {
  const pageStyle = {
    padding: '20px',
    maxWidth: '800px',
    margin: '20px auto',
    backgroundColor: '#f9f9f9',
    borderRadius: '8px',
    boxShadow: '0 2px 8px rgba(0,0,0,0.1)',
    fontFamily: 'Arial, sans-serif',
    textAlign: 'center',
  };

  const titleStyle = {
    color: '#333',
    marginBottom: '30px',
  };

  const navListStyle = {
    listStyle: 'none',
    padding: 0,
    display: 'flex',
    flexDirection: 'column',
    gap: '15px',
  };

  const navItemStyle = {
    backgroundColor: '#007bff',
    padding: '15px',
    borderRadius: '5px',
    boxShadow: '0 1px 3px rgba(0,0,0,0.1)',
  };

  const linkStyle = {
    textDecoration: 'none',
    color: 'white',
    fontSize: '1.2em',
    fontWeight: 'bold',
    display: 'block',
  };

  return (
    <div style={pageStyle}>
      <h1 style={titleStyle}>Admin Dashboard</h1>
      <p>Welcome to the administration panel. Please select an action:</p>
      <ul style={navListStyle}>
        <li style={navItemStyle}>
          <Link to="/admin/restaurants" style={linkStyle}>Manage Restaurants</Link>
        </li>
        <li style={navItemStyle}>
          <Link to="/admin/food/new" style={linkStyle}>Add New Menu Item</Link>
        </li>
        <li style={navItemStyle}>
          <Link to="/admin/orders" style={linkStyle}>View All Orders</Link>
        </li>
        {/* Add more admin navigation links as needed */}
      </ul>
    </div>
  );
}

export default AdminDashboardPage;