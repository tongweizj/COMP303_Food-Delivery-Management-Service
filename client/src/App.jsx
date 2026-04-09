// App.jsx
import React from 'react';
import { Routes, Route } from 'react-router-dom';

// Import the basic blank page component for testing routes
import BlankPage from './pages/BlankPage'; // Assuming BlankPage is in src/pages/BlankPage.jsx

// Placeholder page components - adjust paths as per your project structure
import HomePage from './pages/HomePage';
import RestaurantDetailsPage from './pages/RestaurantDetailsPage';
import OrderCartPage from './pages/OrderCartPage';
import LoginPage from './pages/LoginPage';
import SignupPage from './pages/SignupPage';
import UserProfilePage from './pages/UserProfilePage';
import AdminDashboardPage from './pages/Admin/AdminDashboardPage';
import AdminRestaurantFormPage from './pages/Admin/AdminRestaurantFormPage';
import AdminFoodFormPage from './pages/Admin/AdminFoodFormPage';
import AdminOrderHistoryPage from './pages/Admin/AdminOrderHistoryPage';
// import NotFoundPage from './pages/NotFoundPage'; // Optional: 404 Not Found Page

function App() {
  return (
    <Routes>
      <Route path="/" element={<HomePage />} />
      <Route path="/restaurants/:id" element={<RestaurantDetailsPage />} />
      <Route path="/cart" element={<OrderCartPage />} />
      <Route path="/login" element={<LoginPage />} />
      <Route path="/signup" element={<SignupPage />} />
      <Route path="/profile" element={<UserProfilePage />} />
      
      {/* Admin Routes */}
      <Route path="/admin" element={<AdminDashboardPage />} />
      <Route path="/admin/restaurants/new" element={<AdminRestaurantFormPage />} />
      <Route path="/admin/restaurants/edit/:id" element={<AdminRestaurantFormPage />} />
      <Route path="/admin/food/new" element={<AdminFoodFormPage />} />
      <Route path="/admin/food/edit/:id" element={<AdminFoodFormPage />} />
      <Route path="/admin/orders" element={<AdminOrderHistoryPage />} />

      {/* Blank page for testing routing */}
      <Route path="/blank" element={<BlankPage />} />

      {/* Handle all unmatched routes (optional 404 page) */}
      {/* <Route path="*" element={<NotFoundPage />} /> */}
    </Routes>
  );
}

export default App;