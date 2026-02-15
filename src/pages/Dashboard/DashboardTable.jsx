import React from 'react';
import './DashboardTable.css';

const DashboardTable = ({ data, type }) => {
  if (!data || data.length === 0) {
    return (
      <div className="table-container">
        <div className="no-data">
          <div className="no-data-icon">📭</div>
          <h3>No data found</h3>
          <p>Start by adding some {type}</p>
        </div>
      </div>
    );
  }

  const renderComplaintsTable = () => (
    <table className="dashboard-table">
      <thead>
        <tr>
          <th>Title</th>
          <th>Category</th>
          <th>Priority</th>
          <th>Status</th>
          <th>Date</th>
          <th>Actions</th>
        </tr>
      </thead>
      <tbody>
        {data.map((item, index) => (
          <tr key={item.id || index}>
            <td>{item.title || 'N/A'}</td>
            <td>{item.category || 'General'}</td>
            <td>
              <span className={`priority-badge ${item.priority || 'medium'}`}>
                {item.priority || 'medium'}
              </span>
            </td>
            <td>
              <span className={`status-badge ${item.status || 'pending'}`}>
                {item.status || 'pending'}
              </span>
            </td>
            <td>{item.date || new Date().toLocaleDateString()}</td>
            <td>
              <button className="action-btn view">View</button>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );

  const renderLostFoundTable = () => (
    <table className="dashboard-table">
      <thead>
        <tr>
          <th>Image</th>
          <th>Item</th>
          <th>Type</th>
          <th>Status</th>
          <th>Location</th>
          <th>Date</th>
          <th>Actions</th>
        </tr>
      </thead>
      <tbody>
        {data.map((item, index) => (
          <tr key={item.id || index}>
            <td>
              <div className="table-image-cell">
                {item.imageUrl ? (
                  <img src={item.imageUrl} alt={item.itemName} className="table-image" />
                ) : (
                  <div className="table-image-placeholder">
                    {item.type === 'lost' ? '🔴' : '🟢'}
                  </div>
                )}
              </div>
            </td>
            <td>{item.itemName || 'N/A'}</td>
            <td>
              <span className={`type-badge ${item.type || 'lost'}`}>
                {item.type || 'lost'}
              </span>
            </td>
            <td>
              <span className={`status-badge ${item.status || 'pending'}`}>
                {item.status || 'pending'}
              </span>
            </td>
            <td>{item.location || 'N/A'}</td>
            <td>{item.date || new Date().toLocaleDateString()}</td>
            <td>
              <button className="action-btn view">View</button>
              <button className="action-btn edit">Edit</button>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );

  const renderVolunteerTable = () => (
    <table className="dashboard-table">
      <thead>
        <tr>
          <th>Event</th>
          <th>Role</th>
          <th>Date</th>
          <th>Hours</th>
          <th>Status</th>
          <th>Actions</th>
        </tr>
      </thead>
      <tbody>
        {data.map((item, index) => (
          <tr key={item.id || index}>
            <td>{item.eventName || item.event || 'N/A'}</td>
            <td>{item.role || 'Volunteer'}</td>
            <td>{item.eventDate || item.date || new Date().toLocaleDateString()}</td>
            <td>{item.hours || 'N/A'}</td>
            <td>
              <span className={`status-badge ${item.status || 'pending'}`}>
                {item.status || 'pending'}
              </span>
            </td>
            <td>
              <button className="action-btn view">Details</button>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );

  return (
    <div className="table-container">
      {type === 'complaints' && renderComplaintsTable()}
      {type === 'lostfound' && renderLostFoundTable()}
      {type === 'volunteer' && renderVolunteerTable()}
    </div>
  );
};

export default DashboardTable;