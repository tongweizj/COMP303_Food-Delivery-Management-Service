/* 
Author: Xuan Tri Nguyen - 301388576
 */
import { useState, useEffect } from 'react';
import axios from 'axios';

export default function AdminFoodPage() {
  const [foods, setFoods] = useState([]);
  const API_URL = 'http://localhost:8080/api/foods';

  useEffect(() => { fetchFoods(); }, []);

  const fetchFoods = async () => {
    try {
      const response = await axios.get(API_URL);
      setFoods(response.data);
    } catch (error) { console.error("Error fetching foods", error); }
  };

  const handleDelete = async (id) => {
    try {
      await axios.delete(`${API_URL}/${id}`);
      fetchFoods();
    } catch (error) { console.error("Error deleting", error); }
  };

  return (
    <div>
      <h2>Admin: Manage Food Items</h2>
      <button>Add New Food Item</button>
      <table border="1" style={{ width: '100%', marginTop: '10px' }}>
        <thead>
          <tr>
            <th>ID</th><th>Name</th><th>Category</th><th>Price</th><th>Available</th><th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {foods.map(item => (
            <tr key={item.foodId}>
              <td>{item.foodId}</td>
              <td>{item.foodName}</td>
              <td>{item.category}</td>
              <td>${item.price}</td>
              <td>{item.availabilityStatus ? 'Yes' : 'No'}</td>
              <td>
                <button>Edit</button>
                <button onClick={() => handleDelete(item.foodId)}>Delete</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}