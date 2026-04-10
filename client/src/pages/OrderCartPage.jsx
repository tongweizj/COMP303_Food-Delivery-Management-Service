// OrderCartPage.jsx
import React, { useState } from 'react';
import orderService from '../services/orderService';

function OrderCartPage() {
  // Placeholder for cart items. In a real app, this would come from global state (Context, Redux, etc.)
  const [cartItems, setCartItems] = useState([
    { id: 'm1', name: 'Delicious Pizza', price: 15.99, quantity: 1 },
    { id: 'm2', name: 'Spicy Burger', price: 12.50, quantity: 2 },
    { id: 'm3', name: 'Caesar Salad', price: 8.00, quantity: 1 },
  ]);

  const [shippingAddress, setShippingAddress] = useState('');
  const [paymentMethod, setPaymentMethod] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [orderSuccess, setOrderSuccess] = useState(false);
  const [orderError, setOrderError] = useState(null);

  const calculateTotal = () => {
    return cartItems.reduce((sum, item) => sum + item.price * item.quantity, 0).toFixed(2);
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    if (name === 'shippingAddress') {
      setShippingAddress(value);
    } else if (name === 'paymentMethod') {
      setPaymentMethod(value);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    setOrderError(null);
    setOrderSuccess(false);

    try {
      // In a real application, you'd also send user ID, restaurant ID, etc.
      const orderData = {
        items: cartItems.map(item => ({
          menuItemId: item.id,
          name: item.name,
          quantity: item.quantity,
          price: item.price,
        })),
        totalAmount: parseFloat(calculateTotal()),
        shippingAddress,
        paymentMethod,
        // Add more fields like userId, restaurantId if necessary
      };
      
      const data = await orderService.createOrder(orderData);
      
      setOrderSuccess(true);
      setCartItems([]); // Clear cart after successful order
      setShippingAddress('');
      setPaymentMethod('');
      console.log('Order submitted successfully:', data);

    } catch (err) {
      setOrderError(err.response?.data?.message || 'Error submitting order. Please check your network or try again.');
      console.error('Order submission error:', err);
    } finally {
      setIsSubmitting(false);
    }
  };

  const pageStyle = {
    padding: '20px',
    maxWidth: '800px',
    margin: '20px auto',
    backgroundColor: '#f9f9f9',
    borderRadius: '8px',
    boxShadow: '0 2px 8px rgba(0,0,0,0.1)',
    fontFamily: 'Arial, sans-serif',
  };

  const sectionTitleStyle = {
    color: '#333',
    borderBottom: '1px solid #eee',
    paddingBottom: '10px',
    marginBottom: '20px',
  };

  const cartListStyle = {
    listStyle: 'none',
    padding: 0,
    marginBottom: '20px',
  };

  const cartItemStyle = {
    display: 'flex',
    justifyContent: 'space-between',
    padding: '8px 0',
    borderBottom: '1px dashed #eee',
  };

  const totalStyle = {
    fontWeight: 'bold',
    fontSize: '1.4em',
    textAlign: 'right',
    marginTop: '15px',
    color: '#e44d26',
  };

  const formGroupStyle = {
    marginBottom: '15px',
  };

  const labelStyle = {
    display: 'block',
    marginBottom: '5px',
    fontWeight: 'bold',
    color: '#555',
  };

  const inputStyle = {
    width: '100%',
    padding: '10px',
    border: '1px solid #ddd',
    borderRadius: '4px',
    boxSizing: 'border-box',
  };

  const buttonStyle = {
    backgroundColor: '#4CAF50',
    color: 'white',
    padding: '12px 20px',
    border: 'none',
    borderRadius: '4px',
    cursor: 'pointer',
    fontSize: '1em',
    width: '100%',
  };

  const successMessageStyle = {
    backgroundColor: '#d4edda',
    color: '#155724',
    border: '1px solid #c3e6cb',
    padding: '10px',
    borderRadius: '4px',
    marginBottom: '15px',
  };

  const errorMessageStyle = {
    backgroundColor: '#f8d7da',
    color: '#721c24',
    border: '1px solid #f5c6cb',
    padding: '10px',
    borderRadius: '4px',
    marginBottom: '15px',
  };

  if (cartItems.length === 0 && !orderSuccess) {
    return (
      <div style={pageStyle}>
        <h1 style={sectionTitleStyle}>Your Cart</h1>
        <p style={{ textAlign: 'center' }}>Your cart is empty.</p>
        {orderError && <div style={errorMessageStyle}>{orderError}</div>}
      </div>
    );
  }

  return (
    <div style={pageStyle}>
      <h1 style={sectionTitleStyle}>Your Cart</h1>
      {orderSuccess && <div style={successMessageStyle}>Your order has been placed successfully!</div>}
      {orderError && <div style={errorMessageStyle}>{orderError}</div>}

      <ul style={cartListStyle}>
        {cartItems.map(item => (
          <li key={item.id} style={cartItemStyle}>
            <span>{item.name} x {item.quantity}</span>
            <span>${(item.price * item.quantity).toFixed(2)}</span>
          </li>
        ))}
      </ul>
      <div style={totalStyle}>Total: ${calculateTotal()}</div>

      <h2 style={sectionTitleStyle}>Checkout Details</h2>
      <form onSubmit={handleSubmit}>
        <div style={formGroupStyle}>
          <label htmlFor="shippingAddress" style={labelStyle}>Shipping Address:</label>
          <input
            type="text"
            id="shippingAddress"
            name="shippingAddress"
            value={shippingAddress}
            onChange={handleInputChange}
            required
            style={inputStyle}
          />
        </div>
        <div style={formGroupStyle}>
          <label htmlFor="paymentMethod" style={labelStyle}>Payment Method:</label>
          <input
            type="text"
            id="paymentMethod"
            name="paymentMethod"
            value={paymentMethod}
            onChange={handleInputChange}
            placeholder="e.g., Credit Card, PayPal"
            required
            style={inputStyle}
          />
        </div>
        <button type="submit" disabled={isSubmitting} style={buttonStyle}>
          {isSubmitting ? 'Placing Order...' : 'Place Order'}
        </button>
      </form>
    </div>
  );
}

export default OrderCartPage;