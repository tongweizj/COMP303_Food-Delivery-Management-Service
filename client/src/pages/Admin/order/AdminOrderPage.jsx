/* 
Author: Xuan Tri Nguyen - 301388576
Refactored by Gemini to use services and Bootstrap.
 */
import { useState, useEffect } from 'react';
import adminOrderService from '../../../services/adminOrderService';

export default function AdminOrderPage() {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const orderStatuses = ['PENDING', 'PROCESSING', 'DELIVERED', 'CANCELLED'];

  const fetchOrders = async () => {
    setLoading(true);
    setError(null);
    try {
      const data = await adminOrderService.getAllOrders();
      setOrders(data);
    } catch (error) {
      console.error("Error fetching orders", error);
      setError(error.response?.data?.message || "Failed to fetch orders.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchOrders();
  }, []);

  const handleStatusChange = async (id, newStatus) => {
    try {
      await adminOrderService.updateOrderStatus(id, newStatus);
      // Optimistically update the UI
      setOrders(prevOrders =>
        prevOrders.map(order =>
          order.id === id ? { ...order, status: newStatus } : order
        )
      );
    } catch (error) {
      console.error("Error updating status", error);
      // Optionally show an error message to the user
    }
  };

  const handleDelete = async (id) => {
    if (!window.confirm("Are you sure you want to delete this order?")) {
      return;
    }
    try {
      await adminOrderService.deleteOrder(id);
      setOrders(prevOrders => prevOrders.filter(order => order.id !== id));
    } catch (error) {
      console.error("Error deleting order", error);
      setError(error.response?.data?.message || "Failed to delete order.");
    }
  };

  if (loading) {
    return (
      <div className="container text-center mt-5">
        <div className="spinner-border" role="status">
          <span className="visually-hidden">Loading orders...</span>
        </div>
      </div>
    );
  }

  return (
    <div className="container mt-4">
      <h1 className="mb-4">Admin: Manage Orders</h1>

      {error && <div className="alert alert-danger">{error}</div>}

      <div className="table-responsive">
        <table className="table table-striped table-hover">
          <thead className="table-dark">
            <tr>
              <th>Order ID</th>
              <th>Customer Name</th>
              <th>Total Amount</th>
              <th>Status</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {orders.map(order => (
              <tr key={order.id}>
                <td>{order.id}</td>
                <td>{order.customerName || 'N/A'}</td>
                <td>${order.totalAmount ? order.totalAmount.toFixed(2) : 'N/A'}</td>
                <td>
                  <select
                    className="form-select form-select-sm"
                    value={order.status}
                    onChange={(e) => handleStatusChange(order.id, e.target.value)}
                  >
                    {orderStatuses.map(status => (
                      <option key={status} value={status}>{status}</option>
                    ))}
                  </select>
                </td>
                <td>
                  <button onClick={() => handleDelete(order.id)} className="btn btn-danger btn-sm">
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