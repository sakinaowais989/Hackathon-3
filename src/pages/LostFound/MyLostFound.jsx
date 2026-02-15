import React, { useState, useEffect } from 'react';
import { useAuth } from '../../context/AuthContext';
import { getUserLostFound } from '../../services/lostFoundService';
import StatusBadge from '../../components/StatusBadge';
import './LostFound.css';

const MyLostFound = () => {
  const { currentUser } = useAuth();
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchItems = async () => {
      const result = await getUserLostFound(currentUser.uid);
      if (result.success) {
        setItems(result.data);
      }
      setLoading(false);
    };

    fetchItems();
  }, [currentUser]);

  if (loading) return <div className="loading">Loading...</div>;

  return (
    <div className="my-items-page">
      <div className="page-header">
        <h2>My Lost & Found Reports</h2>
        <p>Track your reported items</p>
      </div>

      <div className="items-list">
        {items.length > 0 ? (
          items.map(item => (
            <div key={item.id} className="item-card">
              <div className="item-header">
                <span className={`item-type ${item.type}`}>
                  {item.type === 'lost' ? '🔴 Lost' : '🟢 Found'}
                </span>
                <StatusBadge status={item.status} />
              </div>
              
              <h3>{item.itemName}</h3>
              <p className="item-description">{item.description}</p>
              
              <div className="item-details">
                <div className="detail">
                  <strong>Location:</strong> {item.location}
                </div>
                <div className="detail">
                  <strong>Date:</strong> {new Date(item.date).toLocaleDateString()}
                </div>
                <div className="detail">
                  <strong>Contact:</strong> {item.contactInfo}
                </div>
              </div>
              
              <div className="item-footer">
                <span className="item-date">
                  Reported: {new Date(item.createdAt).toLocaleDateString()}
                </span>
              </div>
            </div>
          ))
        ) : (
          <div className="no-items">
            <p>No lost/found items reported yet</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default MyLostFound;