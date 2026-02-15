import React, { useState, useEffect } from 'react';
import { useAuth } from '../../context/AuthContext';
import { getUserComplaints } from '../../services/complaintService';
import StatusBadge from '../../components/StatusBadge';
import './Complaints.css';

const MyComplaint = () => {
  const { currentUser } = useAuth();
  const [complaints, setComplaints] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchComplaints = async () => {
      const result = await getUserComplaints(currentUser.uid);
      if (result.success) {
        setComplaints(result.data);
      }
      setLoading(false);
    };

    fetchComplaints();
  }, [currentUser]);

  const getPriorityClass = (priority) => {
    switch (priority) {
      case 'low': return 'priority-low';
      case 'medium': return 'priority-medium';
      case 'high': return 'priority-high';
      case 'urgent': return 'priority-urgent';
      default: return '';
    }
  };

  if (loading) return <div className="loading">Loading...</div>;

  return (
    <div className="my-complaints-page">
      <div className="page-header">
        <h2>My Complaints</h2>
        <p>Track your submitted complaints</p>
      </div>

      <div className="complaints-list">
        {complaints.length > 0 ? (
          complaints.map(complaint => (
            <div key={complaint.id} className="complaint-card">
              <div className="complaint-header">
                <h3>{complaint.title}</h3>
                <StatusBadge status={complaint.status} />
              </div>
              
              <p className="complaint-description">{complaint.description}</p>
              
              <div className="complaint-details">
                <div className="detail-row">
                  <span className="detail-label">Priority:</span>
                  <span className={`priority-badge ${getPriorityClass(complaint.priority)}`}>
                    {complaint.priority}
                  </span>
                </div>
                <div className="detail-row">
                  <span className="detail-label">Location:</span>
                  <span>{complaint.location}</span>
                </div>
                <div className="detail-row">
                  <span className="detail-label">Date of Incident:</span>
                  <span>{new Date(complaint.dateOfIncident).toLocaleDateString()}</span>
                </div>
                <div className="detail-row">
                  <span className="detail-label">Time:</span>
                  <span>{complaint.timeOfIncident}</span>
                </div>
              </div>
              
              {complaint.resolution && (
                <div className="resolution-section">
                  <strong>Resolution:</strong>
                  <p>{complaint.resolution}</p>
                </div>
              )}
              
              <div className="complaint-footer">
                <span className="complaint-date">
                  Submitted: {new Date(complaint.createdAt).toLocaleDateString()}
                </span>
              </div>
            </div>
          ))
        ) : (
          <div className="no-complaints">
            <p>No complaints submitted yet</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default MyComplaint;