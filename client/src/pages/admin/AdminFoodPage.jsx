/* 
Author: Xuan Tri Nguyen - 301388576
Refactored by Gemini to use services and Bootstrap.
 */
import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import adminMenuItemService from '../../services/adminMenuItemService';

export default function AdminFoodPage() {
  const [menuItems, setMenuItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchMenuItems = async () => {
    setLoading(true);
    setError(null);
    try {
      const data = await adminMenuItemService.getAllMenuItems();
      setMenuItems(data);
    } catch (error) {
      console.error("Error fetching menu items", error);
      setError(error.response?.data?.message || "Failed to fetch menu items.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchMenuItems();
  }, []);

  const handleDelete = async (id) => {
    if (!window.confirm("Are you sure you want to delete this menu item?")) {
      return;
    }
    try {
      await adminMenuItemService.deleteMenuItem(id);
      // Refresh the list after deletion
      setMenuItems(prevItems => prevItems.filter(item => item.id !== id));
    } catch (error) {
      console.error("Error deleting menu item", error);
      setError(error.response?.data?.message || "Failed to delete menu item.");
    }
  };

  if (loading) {
    return (
      <div className="container text-center mt-5">
        <div className="spinner-border" role="status">
          <span className="visually-hidden">Loading menu items...</span>
        </div>
      </div>
    );
  }

  return (
    <div className="container mt-4">
      <div className="d-flex justify-content-between align-items-center mb-4">
        <h1>Admin: Manage Menu Items</h1>
        <Link to="/admin/food/new" className="btn btn-primary">Add New Item</Link>
      </div>

      {error && <div className="alert alert-danger">{error}</div>}

      <div className="table-responsive">
        <table className="table table-striped table-hover">
          <thead className="table-dark">
            <tr>
              <th>ID</th>
              <th>Name</th>
              <th>Price</th>
              <th>Restaurant ID</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {menuItems.map(item => (
              <tr key={item.id}>
                <td>{item.id}</td>
                <td>{item.name}</td>
                <td>${item.price ? item.price.toFixed(2) : 'N/A'}</td>
                <td>{item.restaurantId || 'N/A'}</td>
                <td>
                  <Link to={`/admin/food/edit/${item.id}`} className="btn btn-success btn-sm me-2">
                    Edit
                  </Link>
                  <button onClick={() => handleDelete(item.id)} className="btn btn-danger btn-sm">
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