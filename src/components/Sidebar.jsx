import React from 'react';
import { NavLink } from 'react-router-dom';
import { 
  FiHome, 
  FiFileText, 
  FiAlertCircle, 
  FiUsers,
  FiMapPin,
  FiFlag,
  FiBarChart2 
} from 'react-icons/fi';
import './Sidebar.css';

const Sidebar = () => {
  const menuItems = [
    { path: '/dashboard', icon: <FiHome />, label: 'Dashboard' },
    { path: '/lost-found', icon: <FiMapPin />, label: 'Lost & Found' },
    { path: '/complaints', icon: <FiAlertCircle />, label: 'Complaints' },
    { path: '/volunteer', icon: <FiUsers />, label: 'Volunteer' },
    { path: '/reports', icon: <FiBarChart2 />, label: 'Reports' },
    { path: '/applications', icon: <FiFileText />, label: 'Applications' },
    { path: '/my-items', icon: <FiFlag />, label: 'My Items' },
  ];

  return (
    <aside className="sidebar">
      <nav className="sidebar-nav">
        {menuItems.map((item) => (
          <NavLink
            key={item.path}
            to={item.path}
            className={({ isActive }) => 
              isActive ? 'sidebar-link active' : 'sidebar-link'
            }
          >
            <span className="icon">{item.icon}</span>
            <span className="label">{item.label}</span>
          </NavLink>
        ))}
      </nav>
    </aside>
  );
};

export default Sidebar;