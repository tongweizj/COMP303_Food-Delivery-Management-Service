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
import OrderSuccessPage from "../pages/user/OrderSuccessPage.jsx";
import UserProfilePage from "../pages/user/UserProfilePage";

import AdminDashboardPage from "../pages/admin/AdminDashboardPage";
import AdminRestaurantListPage from "../pages/admin/restaurant/AdminRestaurantListPage";
import AdminRestaurantFormPage from "../pages/admin/restaurant/AdminRestaurantFormPage";
import AdminRestaurantPage from "../pages/admin/restaurant/AdminRestaurantPage";

import AdminFoodFormPage from "../pages/admin/food/AdminFoodFormPage";
import AdminMenuItemDetailsPage from "../pages/admin/food/AdminMenuItemDetailsPage.jsx";
import AdminMenuItemListPage from "../pages/admin/food/AdminMenuItemListPage.jsx";

import AdminOrderListPage from "../pages/admin/order/AdminOrderListPage";
import AdminOrderHistoryPage from "../pages/admin/order/AdminOrderHistoryPage";
import AdminOrderDetailsPage from "../pages/admin/order/AdminOrderDetailsPage.jsx";

import { MainLayout, AdminLayout } from "../components/layout/layout.jsx";
function AppRouter({ isAuthenticated, onLogout }) {
  return (
    <Routes>
      <Route
        element={
          <MainLayout isAuthenticated={isAuthenticated} onLogout={onLogout} />
        }
      >
        {/* User Routes */}
        <Route path="/" element={<HomePage />} />
        <Route path="/restaurants/:id" element={<RestaurantDetailsPage />} />
        <Route path="/cart" element={<OrderCartPage />} />
        <Route path="/order-success/:orderId" element={<OrderSuccessPage />} />
        <Route path="/profile" element={<UserProfilePage />} />
        {/* Auth Routes */}
        <Route path="/login" element={<LoginPage />} />
        <Route path="/signup" element={<SignupPage />} />
        {/* Testing Route */}
        <Route path="/blank" element={<BlankPage />} />
      </Route>

      <Route
        path="/admin"
        element={
          <AdminLayout isAuthenticated={isAuthenticated} onLogout={onLogout} />
        }
      >
        {/* Admin Routes */}
        <Route path="/admin" element={<AdminDashboardPage />} />
        <Route
          path="/admin/restaurants"
          element={<AdminRestaurantListPage />}
        />
        <Route
          path="/admin/restaurants/new"
          element={<AdminRestaurantFormPage />}
        />
        <Route
          path="/admin/restaurants/edit/:id"
          element={<AdminRestaurantFormPage />}
        />
        <Route
          path="/admin/restaurants/:id"
          element={<AdminRestaurantPage />}
        />
        <Route path="/admin/menuitems" element={<AdminMenuItemListPage />} />
        <Route path="/admin/menuitems/new" element={<AdminFoodFormPage />} />
        <Route
          path="/admin/menuitems/edit/:id"
          element={<AdminFoodFormPage />}
        />
        <Route
          path="/admin/menuitems/:id"
          element={<AdminMenuItemDetailsPage />}
        />
        <Route path="/admin/orders" element={<AdminOrderListPage />} />
        <Route path="/admin/orders/:id" element={<AdminOrderDetailsPage />} />
      </Route>
    </Routes>
  );
}

export default AppRouter;
