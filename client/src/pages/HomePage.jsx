// HomePage.jsx
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import RestaurantCard from '../components/RestaurantCard'; // Assuming RestaurantCard is in src/components

function HomePage() {
  const [restaurants, setRestaurants] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchRestaurants = async () => {
      try {
        // Assume API Gateway is configured to forward /api/restaurants to the food-service
        const response = await axios.get('/api/restaurants'); 
        setRestaurants(Array.isArray(response.data) ? response.data : []);
      } catch (err) {
        setError('Failed to load restaurant list. Please try again later.');
        console.error('Error fetching restaurants:', err);
      } finally {
        setLoading(false);
      }
    };

    fetchRestaurants();
  }, []);

  const containerStyle = {
    display: 'flex',
    flexWrap: 'wrap',
    justifyContent: 'center',
    padding: '20px',
    gap: '20px',
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

  return (
    <div>
      <h1 style={{ textAlign: 'center', margin: '20px 0', color: '#333' }}>Our Restaurants</h1>
      <div style={containerStyle}>
        {restaurants.length > 0 ? (
          restaurants.map(restaurant => (
            <RestaurantCard key={restaurant.id} restaurant={restaurant} />
          ))
        ) : (
          <div style={messageStyle}>No restaurants available at the moment.</div>
        )}
      </div>
    </div>
  );
}

export default HomePage;