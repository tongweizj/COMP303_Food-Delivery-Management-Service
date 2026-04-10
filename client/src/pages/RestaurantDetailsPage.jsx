// RestaurantDetailsPage.jsx
import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import restaurantService from '../services/restaurantService';
import MenuItemCard from '../components/MenuItemCard'; // Assuming MenuItemCard is in src/components

function RestaurantDetailsPage() {
  const { id } = useParams(); // Read restaurant ID from URL params
  const [restaurant, setRestaurant] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchRestaurantDetails = async () => {
      try {
        const data = await restaurantService.getRestaurantById(id);
        setRestaurant(data);
      } catch (err) {
        setError('Failed to load restaurant details. Please try again later.');
        console.error(`Error fetching restaurant with ID ${id}:`, err);
      } finally {
        setLoading(false);
      }
    };

    fetchRestaurantDetails();
  }, [id]); // Re-fetch data when ID changes

  const containerStyle = {
    padding: '20px',
    maxWidth: '1200px',
    margin: '0 auto',
    fontFamily: 'Arial, sans-serif',
  };

  const restaurantHeaderStyle = {
    textAlign: 'center',
    marginBottom: '30px',
    borderBottom: '1px solid #eee',
    paddingBottom: '20px',
  };

  const restaurantImageStyle = {
    maxWidth: '100%',
    maxHeight: '400px',
    objectFit: 'cover',
    borderRadius: '8px',
    marginBottom: '20px',
  };

  const menuSectionStyle = {
    marginTop: '40px',
    borderTop: '1px solid #eee',
    paddingTop: '30px',
  };

  const menuGridStyle = {
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))',
    gap: '20px',
    justifyContent: 'center',
  };

  const messageStyle = {
    textAlign: 'center',
    fontSize: '1.2em',
    color: '#666',
    padding: '50px',
  };

  if (loading) {
    return <div style={messageStyle}>Loading...</div>;
  }

  if (error) {
    return <div style={{ ...messageStyle, color: 'red' }}>Error: {error}</div>;
  }

  if (!restaurant) {
    return <div style={messageStyle}>Restaurant not found.</div>;
  }

  return (
    <div style={containerStyle}>
      <div style={restaurantHeaderStyle}>
        <img src={restaurant.imageUrl || 'https://via.placeholder.com/800x400?text=Restaurant+Banner'} alt={restaurant.name} style={restaurantImageStyle} />
        <h1>{restaurant.name}</h1>
        <p style={{ color: '#555', lineHeight: '1.6' }}>{restaurant.description}</p>
      </div>

      <div style={menuSectionStyle}>
        <h2 style={{ textAlign: 'center', marginBottom: '20px', color: '#333' }}>Menu</h2>
        <div style={menuGridStyle}>
          {restaurant.menuItems && restaurant.menuItems.length > 0 ? (
            restaurant.menuItems.map(item => (
              <MenuItemCard key={item.id} menuItem={item} />
            ))
          ) : (
            <p style={{ textAlign: 'center', width: '100%', color: '#777' }}>No menu items available for this restaurant.</p>
          )}
        </div>
      </div>
    </div>
  );
}

export default RestaurantDetailsPage;