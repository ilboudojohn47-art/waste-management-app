import React from 'react';
import { Link } from 'react-router-dom';
import './HomePage.css';

function HomePage() {
  return (
    <div className="home-page">
      <section className="hero">
        <div className="hero-content">
          <h1>🗑️ Waste Management System</h1>
          <p>Efficient and transparent waste collection management for your city</p>
          <Link to="/login" className="btn btn-primary">
            Get Started
          </Link>
        </div>
      </section>

      <section className="features">
        <div className="container">
          <h2>Why Choose Our System?</h2>
          <div className="features-grid">
            <div className="feature-card">
              <h3>📍 Real-time Tracking</h3>
              <p>Track waste bins locations and collection status in real-time</p>
            </div>
            <div className="feature-card">
              <h3>📊 Analytics</h3>
              <p>Detailed statistics and reports on waste collection</p>
            </div>
            <div className="feature-card">
              <h3>🚚 Route Optimization</h3>
              <p>Optimized collection routes for efficient waste pickup</p>
            </div>
            <div className="feature-card">
              <h3>📱 Mobile Friendly</h3>
              <p>Access from any device, anytime, anywhere</p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}

export default HomePage;