import { Link, useNavigate } from 'react-router-dom';
import './Header.css';
import React from 'react';

function Header() {
  const navigate = useNavigate();
  const handleLogout = () => {
    localStorage.removeItem('isLoggedIn');
    navigate('/', { replace: true });
    window.location.reload(); // optional full reload
  };

  return (
    <header className="header">
      <div className="header-title" onClick={() => navigate('/')}>
        Hostel Management System
      </div>
      <nav className="nav">
        <ul>
          <li><Link to="/">Home</Link></li>
          <li><Link to="/login">Login</Link></li>
          <li><Link to="/about">About Us</Link></li>
          <li><button onClick={handleLogout} className="logout-button">Logout</button></li>
        </ul>
      </nav>
    </header>
  );
}

export default Header;
