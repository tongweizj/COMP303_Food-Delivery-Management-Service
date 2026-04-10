/* 
Author: Xuan Tri Nguyen - 301388576
 */
import { useState, useEffect } from 'react';
import axios from 'axios';

export default function AdminRestaurantPage() {
  const [restaurants, setRestaurants] = useState([]);
  const API_URL = 'http://localhost:8080/api/restaurants';

  useEffect(() => { fetchRestaurants(); }, []);

  const fetchRestaurants = async () => {
    try {
      const response = await axios.get(API_URL);
      setRestaurants(response.data);
    } catch (error) { console.error("Error fetching restaurants", error); }
  };

  const handleDelete = async (id) => {
    try {
      await axios.delete(`${API_URL}/${id}`);
      fetchRestaurants(); // Refresh list
    } catch (error) { console.error("Error deleting", error); }
  };

  return (
    <div>
      <h2>Admin: Manage Restaurants</h2>
      <button>Add New Restaurant</button>
      <table border="1" style={{ width: '100%', marginTop: '10px' }}>
        <thead>
          <tr>
            <th>ID</th><th>Name</th><th>City</th><th>Cuisine</th><th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {restaurants.map(rest => (
            <tr key={rest.restaurantId}>
              <td>{rest.restaurantId}</td>
              <td>{rest.restaurantName}</td>
              <td>{rest.city}</td>
              <td>{rest.cuisineType}</td>
              <td>
                <button>Edit</button>
                <button onClick={() => handleDelete(rest.restaurantId)}>Delete</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}