// RestaurantCard.jsx
import React from 'react';
import { Link } from 'react-router-dom';

function RestaurantCard({ restaurant }) {
  const cardStyle = {
    border: '1px solid #ccc',
    borderRadius: '8px',
    padding: '16px',
    margin: '16px',
    width: '300px',
    boxShadow: '0 2px 4px rgba(0,0,0,0.1)',
    textAlign: 'center',
    backgroundColor: '#fff',
  };

  const imageStyle = {
    maxWidth: '100%',
    height: '180px',
    objectFit: 'cover',
    borderRadius: '4px',
    marginBottom: '12px',
  };

  const linkStyle = {
    textDecoration: 'none',
    color: 'inherit',
  };

  const nameStyle = {
    fontSize: '1.5em',
    color: '#333',
    marginBottom: '8px',
  };

  const descriptionStyle = {
    fontSize: '0.9em',
    color: '#666',
    lineHeight: '1.4',
  };

  return (
    <div style={cardStyle}>
      <Link to={`/restaurants/${restaurant.id}`} style={linkStyle}>
        <img src={restaurant.imageUrl || 'https://via.placeholder.com/300x180?text=Restaurant+Image'} alt={restaurant.name} style={imageStyle} />
        <h2 style={nameStyle}>{restaurant.name}</h2>
        <p style={descriptionStyle}>{restaurant.description}</p>
      </Link>
    </div>
  );
}

export default RestaurantCard;