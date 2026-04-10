/* 
Author: Xuan Tri Nguyen - 301388576
Refactored by Gemini to use services and Bootstrap.
 */
import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import adminRestaurantService from '../../services/adminRestaurantService';

export default function AdminRestaurantPage() {
  const [restaurants, setRestaurants] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchRestaurants = async () => {
    setLoading(true);
    setError(null);
    try {
      const data = await adminRestaurantService.getAllRestaurants();
      setRestaurants(data);
    } catch (error) {
      console.error("Error fetching restaurants", error);
      setError(error.response?.data?.message || "Failed to fetch restaurants.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchRestaurants();
  }, []);

  const handleDelete = async (id) => {
    if (!window.confirm("Are you sure you want to delete this restaurant?")) {
      return;
    }
    try {
      await adminRestaurantService.deleteRestaurant(id);
      setRestaurants(prev => prev.filter(r => r.id !== id));
    } catch (error) {
      console.error("Error deleting restaurant", error);
      setError(error.response?.data?.message || "Failed to delete restaurant.");
    }
  };

  if (loading) {
    return (
      <div className="container text-center mt-5">
        <div className="spinner-border" role="status">
          <span className="visually-hidden">Loading restaurants...</span>
        </div>
      </div>
    );
  }

  return (
    <div className="container mt-4">
      <div className="d-flex justify-content-between align-items-center mb-4">
        <h1>Admin: Manage Restaurants</h1>
        <Link to="/admin/restaurants/new" className="btn btn-primary">Add New Restaurant</Link>
      </div>

      {error && <div className="alert alert-danger">{error}</div>}

      <div className="table-responsive">
        <table className="table table-striped table-hover">
          <thead className="table-dark">
            <tr>
              <th>ID</th>
              <th>Name</th>
              <th>City</th>
              <th>Cuisine</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {restaurants.map(rest => (
              <tr key={rest.id}>
                <td>{rest.id}</td>
                <td>{rest.name}</td>
                <td>{rest.city}</td>
                <td>{rest.cuisineType}</td>
                <td>
                  <Link to={`/admin/restaurants/edit/${rest.id}`} className="btn btn-success btn-sm me-2">
                    Edit
                  </Link>
                  <button onClick={() => handleDelete(rest.id)} className="btn btn-danger btn-sm">
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}