import React from 'react';
import { useAuth } from '../../context/AuthContext';
import './AdminDashboard.css';

const AdminDashboard = () => {
  const { currentUser } = useAuth();

  return (
    <div className="admin-dashboard">
      <h2>Admin Dashboard</h2>
      <p>Welcome Admin: {currentUser?.email}</p>
      
      <div className="admin-stats">
        <div className="stat-card">Total Users: 150</div>
        <div className="stat-card">Total Complaints: 45</div>
        <div className="stat-card">Pending Issues: 12</div>
      </div>
    </div>
  );
};

export default AdminDashboard;