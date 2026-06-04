import React from 'react';
import { Link } from 'react-router-dom';
import './Navbar.css';

function Navbar({ user, onLogout }) {
  return (
    <nav className="navbar">
      <div className="container nav-content">
        <Link to="/" className="logo">
          🗑️ Waste Management
        </Link>
        <ul className="nav-links">
          <li><Link to="/dashboard">Dashboard</Link></li>
          <li><Link to="/map">Map</Link></li>
          <li><Link to="/bins">Bins</Link></li>
          <li className="user-info">
            <span>{user?.full_name || user?.username}</span>
            <button className="btn btn-secondary" onClick={onLogout}>
              Logout
            </button>
          </li>
        </ul>
      </div>
    </nav>
  );
}

export default Navbar;