// src/routes/AppRouter.jsx
import React from "react";
import { Routes, Route } from "react-router-dom";

// Import page components
import BlankPage from "../pages/BlankPage";

import LoginPage from "../pages/auth/LoginPage";
import SignupPage from "../pages/auth/SignupPage";

import HomePage from "../pages/user/HomePage";
import RestaurantDetailsPage from "../pages/user/RestaurantDetailsPage";
import OrderCartPage from "../pages/user/OrderCartPage";
import UserProfilePage from "../pages/user/UserProfilePage";

import AdminDashboardPage from "../pages/Admin/AdminDashboardPage";
import AdminRestaurantListPage from "../pages/Admin/restaurant/AdminRestaurantListPage";
import AdminRestaurantFormPage from "../pages/Admin/restaurant/AdminRestaurantFormPage";
import AdminFoodFormPage from "../pages/Admin/food/AdminFoodFormPage";
import AdminOrderHistoryPage from "../pages/Admin/order/AdminOrderHistoryPage";

function AppRouter() {
  return (
    <Routes>
      {/* User Routes */}
      <Route path="/" element={<HomePage />} />
      <Route path="/restaurants/:id" element={<RestaurantDetailsPage />} />
      <Route path="/cart" element={<OrderCartPage />} />
      <Route path="/profile" element={<UserProfilePage />} />

      {/* Auth Routes */}
      <Route path="/login" element={<LoginPage />} />
      <Route path="/signup" element={<SignupPage />} />

      {/* Admin Routes */}
      <Route path="/admin" element={<AdminDashboardPage />} />
      <Route path="/admin/restaurants" element={<AdminRestaurantListPage />} />
      <Route
        path="/admin/restaurants/new"
        element={<AdminRestaurantFormPage />}
      />
      <Route
        path="/admin/restaurants/edit/:id"
        element={<AdminRestaurantFormPage />}
      />
      <Route path="/admin/food/new" element={<AdminFoodFormPage />} />
      <Route path="/admin/food/edit/:id" element={<AdminFoodFormPage />} />
      <Route path="/admin/orders" element={<AdminOrderHistoryPage />} />

      {/* Testing Route */}
      <Route path="/blank" element={<BlankPage />} />
    </Routes>
  );
}

export default AppRouter;
