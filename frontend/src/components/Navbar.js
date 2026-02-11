import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import './Navbar.css';

const Navbar = () => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  return (
    <nav className="navbar">
      <div className="navbar-container">
        <Link to="/" className="navbar-logo">
          🏛️ GramSewa
        </Link>
        <ul className="navbar-menu">
          <li><Link to="/public-feed">Public Feed</Link></li>
          {user ? (
            <>
              <li><Link to="/dashboard">My Complaints</Link></li>
              <li><Link to="/create-complaint">Create Complaint</Link></li>
              <li>
                <span className="user-name">{user.name}</span>
              </li>
              <li>
                <button onClick={handleLogout} className="btn btn-secondary">
                  Logout
                </button>
              </li>
            </>
          ) : (
            <li>
              <Link to="/login" className="btn btn-primary">
                Login
              </Link>
            </li>
          )}
        </ul>
      </div>
    </nav>
  );
};

export default Navbar;
