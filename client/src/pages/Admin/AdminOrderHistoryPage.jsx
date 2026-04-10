// AdminOrderHistoryPage.jsx
import React, { useState, useEffect } from 'react';
import adminOrderService from '../../services/adminOrderService';

function AdminOrderHistoryPage() {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [updateMessage, setUpdateMessage] = useState(null); // For status update messages

  // Placeholder for possible order statuses
  const orderStatuses = ['PENDING', 'PROCESSING', 'DELIVERED', 'CANCELLED'];

  const fetchOrders = async () => {
    try {
      // The service now handles authentication checks
      const data = await adminOrderService.getAllOrders();
      setOrders(data);
    } catch (err) {
      setError(err.response?.data?.message || 'Failed to load orders. You may need to log in.');
      console.error('Error fetching admin orders:', err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    // Check for token before initial fetch
    const token = localStorage.getItem('authToken');
    if (!token) {
      setError('Authentication required. Please log in as an administrator.');
      setLoading(false);
      return;
    }
    fetchOrders();
  }, []);

  const handleStatusChange = async (orderId, newStatus) => {
    setUpdateMessage(null);

    try {
      await adminOrderService.updateOrderStatus(orderId, newStatus);
      setUpdateMessage({ type: 'success', text: `Order ${orderId} status updated to ${newStatus}!` });
      // Update local state
      setOrders(prevOrders =>
        prevOrders.map(order =>
          order.id === orderId ? { ...order, status: newStatus } : order
        )
      );
    } catch (err) {
      setUpdateMessage({ type: 'error', text: err.response?.data?.message || `Failed to update status for order ${orderId}.` });
      console.error(`Error updating order ${orderId} status:`, err);
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

  if (error) {
    return (
      <div className="container mt-4">
        <div className="alert alert-danger text-center">Error: {error}</div>
      </div>
    );
  }

  return (
    <div className="container mt-4 p-4 bg-light rounded shadow-sm">
      <h1 className="text-center mb-4">Manage Customer Orders</h1>

      {updateMessage && (
        <div
          className={`alert ${updateMessage.type === 'success' ? 'alert-success' : 'alert-danger'} text-center`}
          role="alert"
        >
          {updateMessage.text}
        </div>
      )}

      {orders.length > 0 ? (
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
                  <td>{order.customerName || 'N/A'}</td> {/* Assuming order object has customerName */}
                  <td>${order.totalAmount ? order.totalAmount.toFixed(2) : 'N/A'}</td>
                  <td>
                    <select
                      value={order.status}
                      onChange={(e) => handleStatusChange(order.id, e.target.value)}
                      className="form-select form-select-sm"
                      disabled={updateMessage && updateMessage.type === 'loading'} // Disable during update
                    >
                      {orderStatuses.map(status => (
                        <option key={status} value={status}>{status}</option>
                      ))}
                    </select>
                  </td>
                  <td>
                    {/* Additional actions like View Order Details if needed */}
                    {/* <button>View Details</button> */}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      ) : (
        <p className="text-center text-muted mt-4">No orders found.</p>
      )}
    </div>
  );
}

export default AdminOrderHistoryPage;