import React, { useState } from 'react';
import { useAuth } from '../../context/AuthContext';
import { useNotification } from '../../context/NotificationContext';
import './LostFound.css';

const LostFoundForm = () => {
  const { currentUser } = useAuth();
  const { showSuccess } = useNotification();
  const [formData, setFormData] = useState({
    type: 'lost',
    itemName: '',
    category: '',
    location: '',
    date: '',
    contact: '',
    description: ''
  });
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    
    setTimeout(() => {
      showSuccess(`${formData.type === 'lost' ? 'Lost' : 'Found'} item reported!`);
      setFormData({
        type: 'lost', itemName: '', category: '', 
        location: '', date: '', contact: '', description: ''
      });
      setLoading(false);
    }, 1500);
  };

  const categories = [
    'Electronics', 'Documents', 'Accessories', 'Clothing', 
    'Books', 'Keys', 'Wallet', 'Mobile', 'Other'
  ];

  return (
    <div className="form-page">
      <div className="saylani-card lost-found-card">
        {/* Card Header with Decoration */}
        <div className="card-header">
          <div className="header-icon">
            {formData.type === 'lost' ? '🔍' : '🎯'}
          </div>
          <h2>{formData.type === 'lost' ? 'Report Lost Item' : 'Report Found Item'}</h2>
          <p>Help others in the Saylani community</p>
        </div>

        {/* Type Selector with Animation */}
        <div className="type-selector">
          <button
            type="button"
            className={`type-option ${formData.type === 'lost' ? 'active lost' : ''}`}
            onClick={() => setFormData({...formData, type: 'lost'})}
          >
            <span className="option-icon">🔴</span>
            <span className="option-text">Lost Item</span>
            {formData.type === 'lost' && <span className="active-indicator"></span>}
          </button>
          <button
            type="button"
            className={`type-option ${formData.type === 'found' ? 'active found' : ''}`}
            onClick={() => setFormData({...formData, type: 'found'})}
          >
            <span className="option-icon">🟢</span>
            <span className="option-text">Found Item</span>
            {formData.type === 'found' && <span className="active-indicator"></span>}
          </button>
        </div>

        <form onSubmit={handleSubmit}>
          {/* Item Name with Icon */}
          <div className="saylani-input-group">
            <span className="input-icon">📦</span>
            <input
              type="text"
              name="itemName"
              value={formData.itemName}
              onChange={handleChange}
              placeholder="Item name"
              required
            />
            <label className="input-label">Item Name</label>
          </div>

          {/* Category Select */}
          <div className="saylani-input-group">
            <span className="input-icon">🏷️</span>
            <select
              name="category"
              value={formData.category}
              onChange={handleChange}
              required
            >
              <option value="">Select category</option>
              {categories.map(cat => (
                <option key={cat} value={cat}>{cat}</option>
              ))}
            </select>
            <label className="input-label">Category</label>
          </div>

          {/* Location with Icon */}
          <div className="saylani-input-group">
            <span className="input-icon">📍</span>
            <input
              type="text"
              name="location"
              value={formData.location}
              onChange={handleChange}
              placeholder="Location"
              required
            />
            <label className="input-label">Location</label>
          </div>

          {/* Date and Contact - Two Columns */}
          <div className="two-columns">
            <div className="saylani-input-group">
              <span className="input-icon">📅</span>
              <input
                type="date"
                name="date"
                value={formData.date}
                onChange={handleChange}
                required
              />
              <label className="input-label">Date</label>
            </div>

            <div className="saylani-input-group">
              <span className="input-icon">📞</span>
              <input
                type="text"
                name="contact"
                value={formData.contact}
                onChange={handleChange}
                placeholder="Contact"
                required
              />
              <label className="input-label">Contact</label>
            </div>
          </div>

          {/* Description */}
          <div className="saylani-input-group">
            <span className="input-icon">📝</span>
            <textarea
              name="description"
              value={formData.description}
              onChange={handleChange}
              placeholder="Brief description"
              rows="2"
            />
            <label className="input-label">Description (Optional)</label>
          </div>

          {/* Submit Button with Animation */}
          <button type="submit" className="saylani-btn" disabled={loading}>
            {loading ? (
              <span className="btn-loader"></span>
            ) : (
              <>
                <span className="btn-icon">{formData.type === 'lost' ? '🔍' : '🎯'}</span>
                <span>{formData.type === 'lost' ? 'Report Lost Item' : 'Report Found Item'}</span>
              </>
            )}
          </button>
        </form>

        {/* Footer Note */}
        <div className="card-footer">
          <span className="footer-icon">⏰</span>
          <span>Reports are processed within 24 hours</span>
        </div>
      </div>
    </div>
  );
};

export default LostFoundForm;