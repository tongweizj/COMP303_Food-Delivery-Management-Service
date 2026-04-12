// RestaurantCard.jsx
import React from "react";
import { Link } from "react-router-dom";

function RestaurantCard({ restaurant }) {
  return (
    <div className="card shadow-sm h-100">
      <img
        src={
          restaurant.coverImageUrl ||
          "https://via.placeholder.com/300x180?text=Restaurant"
        }
        alt={restaurant.restaurantName}
        className="card-img-top"
        style={{ height: "180px", objectFit: "cover" }}
      />
      <div className="card-body">
        <h5 className="card-title">{restaurant.restaurantName}</h5>
        <p className="card-text text-muted">{restaurant.description}</p>
        <Link
          to={`/restaurants/${restaurant.restaurantId}`}
          className="btn btn-primary stretched-link"
        >
          View Menu
        </Link>
      </div>
    </div>
  );
}

export default RestaurantCard;
