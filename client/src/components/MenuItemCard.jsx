// MenuItemCard.jsx
import React from 'react';

function MenuItemCard({ menuItem }) {
  const cardStyle = {
    border: '1px solid #eee',
    borderRadius: '6px',
    padding: '12px',
    margin: '8px',
    width: '280px',
    boxShadow: '0 1px 2px rgba(0,0,0,0.05)',
    display: 'flex',
    alignItems: 'center',
    gap: '12px',
    backgroundColor: '#f9f9f9',
  };

  const imageStyle = {
    width: '80px',
    height: '80px',
    objectFit: 'cover',
    borderRadius: '4px',
  };

  const textContentStyle = {
    flexGrow: 1,
    textAlign: 'left',
  };

  const priceStyle = {
    fontWeight: 'bold',
    color: '#e44d26',
    fontSize: '1.1em',
  };

  return (
    <div style={cardStyle}>
      <img src={menuItem.imageUrl || 'https://via.placeholder.com/80x80?text=Food'} alt={menuItem.name} style={imageStyle} />
      <div style={textContentStyle}>
        <h3>{menuItem.name}</h3>
        <p style={{ fontSize: '0.9em', color: '#555' }}>{menuItem.description}</p>
        <span style={priceStyle}>${menuItem.price ? menuItem.price.toFixed(2) : 'N/A'}</span>
      </div>
    </div>
  );
}

export default MenuItemCard;