// RestaurantDetailsPage.jsx
import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import restaurantService from "../../services/restaurantService";
import MenuItemCard from "../../components/common/MenuItemCard"; // Assuming MenuItemCard is in src/components

function RestaurantDetailsPage() {
  const { id } = useParams(); // Read restaurant ID from URL params
  const [restaurant, setRestaurant] = useState(null);
  const [menuItems, setMenuItems] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchRestaurantDetails = async () => {
      try {
        const data = await restaurantService.getRestaurantById(id);
        console.log("getRestaurantById:", data);
        setRestaurant(data.restaurant);
        setMenuItems(data.menuItems);
      } catch (err) {
        setError("Failed to load restaurant details. Please try again later.");
        console.error(`Error fetching restaurant with ID ${id}:`, err);
      } finally {
        setLoading(false);
      }
    };

    fetchRestaurantDetails();
  }, [id]); // Re-fetch data when ID changes

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

  if (!restaurant) {
    return (
      <div className="container mt-4">
        <div className="alert alert-warning text-center">
          Restaurant not found.
        </div>
      </div>
    );
  }

  return (
    <div className="container my-4">
      <div className="text-center pb-4 mb-4 border-bottom">
        <img
          src={
            restaurant.coverImageUrl ||
            "https://via.placeholder.com/1200x400?text=Restaurant+Banner"
          }
          alt={restaurant.name}
          className="img-fluid rounded mb-3"
          style={{ maxHeight: "400px", width: "100%", objectFit: "cover" }}
        />
        <h1>{restaurant.name}</h1>
        <p className="text-muted fs-5">{restaurant.description}</p>
      </div>

      <div className="mt-5">
        <h2 className="text-center mb-4">Menu</h2>
        <div className="row g-4 justify-content-center">
          {menuItems && menuItems.length > 0 ? (
            menuItems.map((item) => (
              <div className="col-lg-4 col-md-6" key={item.menuItemId}>
                <MenuItemCard menuItem={item} />
              </div>
            ))
          ) : (
            <div className="col-12">
              <p className="text-center text-muted">
                No menu items available for this restaurant.
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default RestaurantDetailsPage;
