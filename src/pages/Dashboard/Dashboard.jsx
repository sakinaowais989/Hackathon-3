import React, { useState, useEffect } from 'react';
import { useAuth } from '../../context/AuthContext';
import DashboardTable from './DashboardTable';
import './Dashboard.css';

const Dashboard = () => {
  const { currentUser } = useAuth();
  const [activeTab, setActiveTab] = useState('complaints');

  // Sample data
  const complaintsData = [
    { id: 1, title: 'Classroom Issue', status: 'pending', priority: 'high', date: '2024-01-15' },
    { id: 2, title: 'Library Books', status: 'resolved', priority: 'medium', date: '2024-01-10' },
  ];

  const lostFoundData = [
    { id: 1, itemName: 'Laptop', type: 'lost', status: 'pending', location: 'Library', date: '2024-01-14' },
    { id: 2, itemName: 'Wallet', type: 'found', status: 'resolved', location: 'Canteen', date: '2024-01-12' },
  ];

  const volunteerData = [
    { id: 1, eventName: 'Food Drive', role: 'Coordinator', status: 'approved', eventDate: '2024-02-01' },
    { id: 2, eventName: 'Teaching', role: 'Teacher', status: 'pending', eventDate: '2024-02-15' },
  ];

  return (
    <div className="dashboard-page">
      {/* Welcome Section */}
      <div className="welcome-section">
        <h2>Welcome, {currentUser?.email?.split('@')[0] || 'User'}! 👋</h2>
        <p>Here's what's happening today</p>
      </div>

      {/* Horizontal Stats Cards */}
      <div className="horizontal-stats">
        <div className="stat-item">
          <div className="stat-icon">📋</div>
          <div className="stat-content">
            <span className="stat-value">{complaintsData.length}</span>
            <span className="stat-label">Complaints</span>
          </div>
        </div>

        <div className="stat-item">
          <div className="stat-icon">🔍</div>
          <div className="stat-content">
            <span className="stat-value">{lostFoundData.length}</span>
            <span className="stat-label">Lost & Found</span>
          </div>
        </div>

        <div className="stat-item">
          <div className="stat-icon">🤝</div>
          <div className="stat-content">
            <span className="stat-value">{volunteerData.length}</span>
            <span className="stat-label">Volunteer</span>
          </div>
        </div>

        <div className="stat-item">
          <div className="stat-icon">📅</div>
          <div className="stat-content">
            <span className="stat-value">3</span>
            <span className="stat-label">Events</span>
          </div>
        </div>
      </div>

      {/* Tabs */}
      <div className="dashboard-tabs">
        <button
          className={`tab-btn ${activeTab === 'complaints' ? 'active' : ''}`}
          onClick={() => setActiveTab('complaints')}
        >
          Complaints
        </button>
        <button
          className={`tab-btn ${activeTab === 'lostfound' ? 'active' : ''}`}
          onClick={() => setActiveTab('lostfound')}
        >
          Lost & Found
        </button>
        <button
          className={`tab-btn ${activeTab === 'volunteer' ? 'active' : ''}`}
          onClick={() => setActiveTab('volunteer')}
        >
          Volunteer
        </button>
      </div>

      {/* Tables */}
      <div className="tables-container">
        {activeTab === 'complaints' && (
          <>
            <div className="table-header">
              <h3>My Complaints</h3>
              <button className="add-btn" onClick={() => window.location.href = '/complaints'}>+ New</button>
            </div>
            <DashboardTable data={complaintsData} type="complaints" />
          </>
        )}

        {activeTab === 'lostfound' && (
          <>
            <div className="table-header">
              <h3>Lost & Found Items</h3>
              <button className="add-btn" onClick={() => window.location.href = '/lost-found'}>+ New</button>
            </div>
            <DashboardTable data={lostFoundData} type="lostfound" />
          </>
        )}

        {activeTab === 'volunteer' && (
          <>
            <div className="table-header">
              <h3>Volunteer Activities</h3>
              <button className="add-btn" onClick={() => window.location.href = '/volunteer'}>+ New</button>
            </div>
            <DashboardTable data={volunteerData} type="volunteer" />
          </>
        )}
      </div>
    </div>
  );
};

export default Dashboard;