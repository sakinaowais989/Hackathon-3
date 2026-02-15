import React, { useState, useEffect } from 'react';
import { useAuth } from '../../context/AuthContext';
import { getUserVolunteering } from '../../services/volunteerService';
import StatusBadge from '../../components/StatusBadge';
import './Volunteer.css';

const VolunteerList = () => {
  const { currentUser } = useAuth();
  const [volunteerings, setVolunteerings] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchVolunteerings = async () => {
      const result = await getUserVolunteering(currentUser.uid);
      if (result.success) {
        setVolunteerings(result.data);
      }
      setLoading(false);
    };

    fetchVolunteerings();
  }, [currentUser]);

  if (loading) return <div className="loading">Loading...</div>;

  return (
    <div className="my-volunteering-page">
      <div className="page-header">
        <h2>My Volunteer Activities</h2>
        <p>Track your volunteer registrations</p>
      </div>

      <div className="volunteer-list">
        {volunteerings.length > 0 ? (
          volunteerings.map(item => (
            <div key={item.id} className="volunteer-card">
              <div className="volunteer-header">
                <h3>{item.eventName}</h3>
                <StatusBadge status={item.status} />
              </div>
              
              <div className="volunteer-details">
                <div className="detail-row">
                  <span className="detail-label">Role:</span>
                  <span>{item.role}</span>
                </div>
                <div className="detail-row">
                  <span className="detail-label">Date:</span>
                  <span>{new Date(item.eventDate).toLocaleDateString()} at {item.eventTime}</span>
                </div>
                <div className="detail-row">
                  <span className="detail-label">Location:</span>
                  <span>{item.location}</span>
                </div>
                <div className="detail-row">
                  <span className="detail-label">Availability:</span>
                  <span className="availability-badge">{item.availability}</span>
                </div>
              </div>
              
              {item.skills && (
                <div className="skills-section">
                  <strong>Skills:</strong>
                  <p>{item.skills}</p>
                </div>
              )}
              
              {item.comments && (
                <div className="comments-section">
                  <strong>Comments:</strong>
                  <p>{item.comments}</p>
                </div>
              )}
              
              <div className="volunteer-footer">
                <span className="volunteer-date">
                  Registered: {new Date(item.createdAt).toLocaleDateString()}
                </span>
              </div>
            </div>
          ))
        ) : (
          <div className="no-volunteer">
            <p>No volunteer registrations yet</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default VolunteerList;