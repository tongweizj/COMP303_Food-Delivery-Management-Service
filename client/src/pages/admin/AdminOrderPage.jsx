/* 
Author: Xuan Tri Nguyen - 301388576
 */
import { useState, useEffect } from 'react';
import axios from 'axios';

export default function AdminOrderPage() {
  const [orders, setOrders] = useState([]);
  const API_URL = 'http://localhost:8080/api/orders';

  useEffect(() => { fetchOrders(); }, []);

  const fetchOrders = async () => {
    try {
      const response = await axios.get(API_URL);
      setOrders(response.data);
    } catch (error) { console.error("Error fetching orders", error); }
  };

  const handleStatusChange = async (id, newStatus) => {
    try {
      await axios.put(`${API_URL}/${id}/status`, null, { params: { status: newStatus } });
      fetchOrders();
    } catch (error) { console.error("Error updating status", error); }
  };

  const handleDelete = async (id) => {
    try {
      await axios.delete(`${API_URL}/${id}`);
      fetchOrders();
    } catch (error) { console.error("Error deleting", error); }
  };

  return (
    <div>
      <h2>Admin: Manage Orders</h2>
      <table border="1" style={{ width: '100%', marginTop: '10px' }}>
        <thead>
          <tr>
            <th>Order ID</th><th>User ID</th><th>Amount</th><th>Status</th><th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {orders.map(order => (
            <tr key={order.orderId}>
              <td>{order.orderId}</td>
              <td>{order.userId}</td>
              <td>${order.totalAmount}</td>
              <td>
                <select 
                  value={order.orderStatus} 
                  onChange={(e) => handleStatusChange(order.orderId, e.target.value)}
                >
                  <option value="Placed">Placed</option>
                  <option value="Preparing">Preparing</option>
                  <option value="Delivered">Delivered</option>
                  <option value="Cancelled">Cancelled</option>
                </select>
              </td>
              <td>
                <button onClick={() => handleDelete(order.orderId)}>Delete</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}