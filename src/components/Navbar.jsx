import React, { useState } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { useNotification } from '../context/NotificationContext';
import { logoutUser } from '../services/authService';
import saylaniLogo from '../assets/saylani logo.png';
import './Navbar.css';

const Navbar = () => {
  const { currentUser } = useAuth();
  const { showSuccess } = useNotification();
  const navigate = useNavigate();
  const location = useLocation();
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [showLogoutModal, setShowLogoutModal] = useState(false);

  const handleLogout = async () => {
    const result = await logoutUser();
    if (result.success) {
      showSuccess('Logged out successfully!');
      navigate('/');
    }
    setShowLogoutModal(false);
    setDropdownOpen(false);
  };

  const isActive = (path) => {
    return location.pathname === path;
  };

  return (
    <nav className="navbar">
      <div className="nav-container">
        {/* Left side - Logo */}
        <div className="nav-left">
          <Link to="/dashboard" className="logo-link">
            <img 
              src={saylaniLogo} 
              alt="Saylani Welfare" 
              className="nav-logo"
            />
            <span className="logo-text">Saylani Portal</span>
          </Link>
        </div>

        {/* Center - Navigation Links */}
        <div className="nav-center">
          <Link 
            to="/dashboard" 
            className={`nav-link ${isActive('/dashboard') ? 'active' : ''}`}
          >
            Dashboard
          </Link>
          <Link 
            to="/complaints" 
            className={`nav-link ${isActive('/complaints') ? 'active' : ''}`}
          >
            Complaints
          </Link>
          <Link 
            to="/lost-found" 
            className={`nav-link ${isActive('/lost-found') ? 'active' : ''}`}
          >
            Lost & Found
          </Link>
          <Link 
            to="/volunteer" 
            className={`nav-link ${isActive('/volunteer') ? 'active' : ''}`}
          >
            Volunteer
          </Link>
        </div>

        {/* Right side - User Menu with Dropdown */}
        <div className="nav-right">
          <div className="user-menu" onClick={() => setDropdownOpen(!dropdownOpen)}>
            <div className="user-avatar">
              {currentUser?.email?.charAt(0).toUpperCase() || 'U'}
            </div>
            <span className="user-name">
              {currentUser?.email?.split('@')[0] || 'User'}
            </span>
            <span className={`dropdown-arrow ${dropdownOpen ? 'open' : ''}`}>▼</span>
            
            {/* Dropdown Menu */}
            {dropdownOpen && (
              <div className="dropdown-menu">
                <div className="dropdown-header">
                  <div className="dropdown-user">
                    <div className="dropdown-avatar">
                      {currentUser?.email?.charAt(0).toUpperCase() || 'U'}
                    </div>
                    <div className="dropdown-user-info">
                      <span className="dropdown-user-name">
                        {currentUser?.email?.split('@')[0] || 'User'}
                      </span>
                      <span className="dropdown-user-email">
                        {currentUser?.email || 'user@saylani.com'}
                      </span>
                    </div>
                  </div>
                </div>
                
                <div className="dropdown-divider"></div>
                
                <Link to="/profile" className="dropdown-item">
                  <span className="item-icon">👤</span>
                  <span className="item-text">Profile</span>
                </Link>
                
                <Link to="/my-complaints" className="dropdown-item">
                  <span className="item-icon">📋</span>
                  <span className="item-text">My Complaints</span>
                </Link>
                
                <Link to="/my-items" className="dropdown-item">
                  <span className="item-icon">🔍</span>
                  <span className="item-text">My Items</span>
                </Link>
                
                <Link to="/my-volunteering" className="dropdown-item">
                  <span className="item-icon">🤝</span>
                  <span className="item-text">My Volunteering</span>
                </Link>
                
                <Link to="/settings" className="dropdown-item">
                  <span className="item-icon">⚙️</span>
                  <span className="item-text">Settings</span>
                </Link>
                
                <div className="dropdown-divider"></div>
                
                <button 
                  onClick={() => {
                    setDropdownOpen(false);
                    setShowLogoutModal(true);
                  }} 
                  className="dropdown-item logout"
                >
                  <span className="item-icon">🚪</span>
                  <span className="item-text">Logout</span>
                </button>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Logout Confirmation Modal */}
      {showLogoutModal && (
        <div className="modal-overlay" onClick={() => setShowLogoutModal(false)}>
          <div className="logout-modal" onClick={(e) => e.stopPropagation()}>
            <div className="modal-icon">🚪</div>
            <h3>Logout Confirmation</h3>
            <p>Are you sure you want to logout?</p>
            <div className="modal-actions">
              <button 
                className="modal-btn cancel"
                onClick={() => setShowLogoutModal(false)}
              >
                Cancel
              </button>
              <button 
                className="modal-btn confirm"
                onClick={handleLogout}
              >
                Yes, Logout
              </button>
            </div>
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;