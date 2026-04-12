// HomePage.jsx
import React, { useState, useEffect } from "react";
import restaurantService from "../../services/restaurantService";
import RestaurantCard from "../../components/common/RestaurantCard"; // Assuming RestaurantCard is in src/components

function HomePage() {
  const [restaurants, setRestaurants] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchRestaurants = async () => {
      try {
        const data = await restaurantService.getAllRestaurants();
        setRestaurants(Array.isArray(data) ? data : []);
      } catch (err) {
        setError("Failed to load restaurant list. Please try again later.");
        console.error("Error fetching restaurants:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchRestaurants();
  }, []);

  if (loading) {
    return (
      <div className="container text-center mt-5">
        <div className="spinner-border" role="status">
          <span className="visually-hidden">Loading...</span>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="container mt-4">
        <div className="alert alert-danger text-center">Error: {error}</div>
      </div>
    );
  }

  return (
    <div className="container my-4">
      <h1 className="text-center my-4">Our Restaurants</h1>
      <div className="row g-4">
        {restaurants.length > 0 ? (
          restaurants.map((restaurant) => (
            <div
              className="col-xl-3 col-lg-4 col-md-6"
              key={restaurant.restaurantId}
            >
              <RestaurantCard restaurant={restaurant} />
            </div>
          ))
        ) : (
          <div className="col-12">
            <p className="text-center text-muted">
              No restaurants available at the moment.
            </p>
          </div>
        )}
      </div>
    </div>
  );
}

export default HomePage;
