/* 
Author: Xuan Tri Nguyen - 301388576
 */
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import AdminRestaurantPage from './pages/admin/AdminRestaurantPage';
import AdminFoodPage from './pages/admin/AdminFoodPage';
import AdminOrderPage from './pages/admin/AdminOrderPage';
import './App.css';

function App() {
  return (
    <Router>
      <div className="app-container">
        {/* Navigation Bar */}
        <nav style={{ padding: '10px', backgroundColor: '#333', color: 'white', display: 'flex', gap: '20px', alignItems: 'center' }}>
          <h2 style={{ margin: 0 }}>Admin Dashboard</h2>
          <Link to="/admin/restaurants" style={{ color: 'white', textDecoration: 'none' }}>Restaurants</Link>
          <Link to="/admin/foods" style={{ color: 'white', textDecoration: 'none' }}>Food Menu</Link>
          <Link to="/admin/orders" style={{ color: 'white', textDecoration: 'none' }}>Orders</Link>
        </nav>

        {/* Main Content Area */}
        <main style={{ padding: '20px' }}>
          <Routes>
            {/* Default Homepage */}
            <Route path="/" element={<h3>Welcome to the Admin Portal. Please select a management option above.</h3>} />
            
            {/* Admin Routes */}
            <Route path="/admin/restaurants" element={<AdminRestaurantPage />} />
            <Route path="/admin/foods" element={<AdminFoodPage />} />
            <Route path="/admin/orders" element={<AdminOrderPage />} />
          </Routes>
        </main>
      </div>
    </Router>
  );
}

export default App;