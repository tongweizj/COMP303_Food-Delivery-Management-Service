// OrderCartPage.jsx
import React, { useState } from 'react';
import orderService from '../../services/orderService';

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

  if (cartItems.length === 0 && !orderSuccess) {
    return (
      <div className="container mt-4 p-4 bg-light rounded shadow-sm" style={{ maxWidth: '800px' }}>
        <h1 className="h2 border-bottom pb-2 mb-4">Your Cart</h1>
        <p className="text-center">Your cart is empty.</p>
        {orderError && <div className="alert alert-danger">{orderError}</div>}
      </div>
    );
  }

  return (
    <div className="container mt-4 p-4 bg-light rounded shadow-sm" style={{ maxWidth: '800px' }}>
      <h1 className="h2 border-bottom pb-2 mb-4">Your Cart</h1>
      {orderSuccess && <div className="alert alert-success">Your order has been placed successfully!</div>}
      {orderError && <div className="alert alert-danger">{orderError}</div>}

      <ul className="list-group mb-4">
        {cartItems.map(item => (
          <li key={item.id} className="list-group-item d-flex justify-content-between align-items-center">
            <span>{item.name} <span className="text-muted">x {item.quantity}</span></span>
            <span className="fw-bold">${(item.price * item.quantity).toFixed(2)}</span>
          </li>
        ))}
      </ul>
      <div className="text-end h4 fw-bold text-danger">Total: ${calculateTotal()}</div>

      <h2 className="h3 border-bottom pb-2 mb-4 mt-5">Checkout Details</h2>
      <form onSubmit={handleSubmit}>
        <div className="mb-3">
          <label htmlFor="shippingAddress" className="form-label">Shipping Address:</label>
          <input
            type="text"
            id="shippingAddress"
            name="shippingAddress"
            value={shippingAddress}
            onChange={handleInputChange}
            required
            className="form-control"
          />
        </div>
        <div className="mb-3">
          <label htmlFor="paymentMethod" className="form-label">Payment Method:</label>
          <input
            type="text"
            id="paymentMethod"
            name="paymentMethod"
            value={paymentMethod}
            onChange={handleInputChange}
            placeholder="e.g., Credit Card, PayPal"
            required
            className="form-control"
          />
        </div>
        <button type="submit" disabled={isSubmitting} className="btn btn-success w-100 btn-lg mt-3">
          {isSubmitting ? (
            <>
              <span className="spinner-border spinner-border-sm" role="status" aria-hidden="true"></span>
              <span> Placing Order...</span>
            </>
          ) : 'Place Order'}
        </button>
      </form>
    </div>
  );
}

export default OrderCartPage;