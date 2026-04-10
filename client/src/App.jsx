<<<<<<< HEAD
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
=======
import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from './assets/vite.svg'
import heroImg from './assets/hero.png'
import './App.css'

function App() {
  const [count, setCount] = useState(0)

  return (
    <>
      <section id="center">
        <div className="hero">
          <img src={heroImg} className="base" width="170" height="179" alt="" />
          <img src={reactLogo} className="framework" alt="React logo" />
          <img src={viteLogo} className="vite" alt="Vite logo" />
        </div>
        <div>
          <h1>Get started</h1>
          <p>
            Edit <code>src/App.jsx</code> and save to test <code>HMR</code>
          </p>
        </div>
        <button
          className="counter"
          onClick={() => setCount((count) => count + 1)}
        >
          Count is {count}
        </button>
      </section>

      <div className="ticks"></div>

      <section id="next-steps">
        <div id="docs">
          <svg className="icon" role="presentation" aria-hidden="true">
            <use href="/icons.svg#documentation-icon"></use>
          </svg>
          <h2>Documentation</h2>
          <p>Your questions, answered</p>
          <ul>
            <li>
              <a href="https://vite.dev/" target="_blank">
                <img className="logo" src={viteLogo} alt="" />
                Explore Vite
              </a>
            </li>
            <li>
              <a href="https://react.dev/" target="_blank">
                <img className="button-icon" src={reactLogo} alt="" />
                Learn more
              </a>
            </li>
          </ul>
        </div>
        <div id="social">
          <svg className="icon" role="presentation" aria-hidden="true">
            <use href="/icons.svg#social-icon"></use>
          </svg>
          <h2>Connect with us</h2>
          <p>Join the Vite community</p>
          <ul>
            <li>
              <a href="https://github.com/vitejs/vite" target="_blank">
                <svg
                  className="button-icon"
                  role="presentation"
                  aria-hidden="true"
                >
                  <use href="/icons.svg#github-icon"></use>
                </svg>
                GitHub
              </a>
            </li>
            <li>
              <a href="https://chat.vite.dev/" target="_blank">
                <svg
                  className="button-icon"
                  role="presentation"
                  aria-hidden="true"
                >
                  <use href="/icons.svg#discord-icon"></use>
                </svg>
                Discord
              </a>
            </li>
            <li>
              <a href="https://x.com/vite_js" target="_blank">
                <svg
                  className="button-icon"
                  role="presentation"
                  aria-hidden="true"
                >
                  <use href="/icons.svg#x-icon"></use>
                </svg>
                X.com
              </a>
            </li>
            <li>
              <a href="https://bsky.app/profile/vite.dev" target="_blank">
                <svg
                  className="button-icon"
                  role="presentation"
                  aria-hidden="true"
                >
                  <use href="/icons.svg#bluesky-icon"></use>
                </svg>
                Bluesky
              </a>
            </li>
          </ul>
        </div>
      </section>

      <div className="ticks"></div>
      <section id="spacer"></section>
    </>
  )
}

export default App
>>>>>>> d254c480de497cb2a8159b0e9476b7ae6c39c844
