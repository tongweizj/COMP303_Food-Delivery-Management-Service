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

  const pageStyle = {
    padding: '20px',
    maxWidth: '1200px',
    margin: '20px auto',
    backgroundColor: '#f9f9f9',
    borderRadius: '8px',
    boxShadow: '0 2px 8px rgba(0,0,0,0.1)',
    fontFamily: 'Arial, sans-serif',
  };

  const titleStyle = {
    textAlign: 'center',
    color: '#333',
    marginBottom: '25px',
  };

  const tableStyle = {
    width: '100%',
    borderCollapse: 'collapse',
    marginTop: '20px',
  };

  const thStyle = {
    border: '1px solid #ddd',
    padding: '12px',
    textAlign: 'left',
    backgroundColor: '#007bff',
    color: 'white',
  };

  const tdStyle = {
    border: '1px solid #ddd',
    padding: '12px',
    textAlign: 'left',
  };

  const selectStyle = {
    padding: '6px',
    borderRadius: '4px',
    border: '1px solid #ccc',
    backgroundColor: 'white',
    cursor: 'pointer',
  };

  const messageStyle = {
    padding: '10px',
    borderRadius: '4px',
    marginBottom: '15px',
    textAlign: 'center',
  };

  if (loading) {
    return <div style={{ ...pageStyle, textAlign: 'center' }}>Loading orders...</div>;
  }

  if (error) {
    return <div style={{ ...pageStyle, color: 'red', textAlign: 'center' }}>Error: {error}</div>;
  }

  return (
    <div style={pageStyle}>
      <h1 style={titleStyle}>Manage Customer Orders</h1>

      {updateMessage && (
        <div
          style={{
            ...messageStyle,
            backgroundColor: updateMessage.type === 'success' ? '#d4edda' : '#f8d7da',
            color: updateMessage.type === 'success' ? '#155724' : '#721c24',
            border: `1px solid ${updateMessage.type === 'success' ? '#c3e6cb' : '#f5c6cb'}`,
          }}
        >
          {updateMessage.text}
        </div>
      )}

      {orders.length > 0 ? (
        <table style={tableStyle}>
          <thead>
            <tr>
              <th style={thStyle}>Order ID</th>
              <th style={thStyle}>Customer Name</th>
              <th style={thStyle}>Total Amount</th>
              <th style={thStyle}>Status</th>
              <th style={thStyle}>Actions</th>
            </tr>
          </thead>
          <tbody>
            {orders.map(order => (
              <tr key={order.id}>
                <td style={tdStyle}>{order.id}</td>
                <td style={tdStyle}>{order.customerName || 'N/A'}</td> {/* Assuming order object has customerName */}
                <td style={tdStyle}>${order.totalAmount ? order.totalAmount.toFixed(2) : 'N/A'}</td>
                <td style={tdStyle}>
                  <select
                    value={order.status}
                    onChange={(e) => handleStatusChange(order.id, e.target.value)}
                    style={selectStyle}
                    disabled={updateMessage && updateMessage.type === 'loading'} // Disable during update
                  >
                    {orderStatuses.map(status => (
                      <option key={status} value={status}>{status}</option>
                    ))}
                  </select>
                </td>
                <td style={tdStyle}>
                  {/* Additional actions like View Order Details if needed */}
                  {/* <button>View Details</button> */}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      ) : (
        <p style={{ textAlign: 'center', color: '#777' }}>No orders found.</p>
      )}
    </div>
  );
}

export default AdminOrderHistoryPage;