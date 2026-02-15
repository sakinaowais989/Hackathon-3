import React, { useState } from 'react';
import { useAuth } from '../../context/AuthContext';
import { useNotification } from '../../context/NotificationContext';
import './Complaints.css';

const ComplaintForm = () => {
  const { currentUser } = useAuth();
  const { showSuccess } = useNotification();
  const [formData, setFormData] = useState({
    title: '',
    category: '',
    description: '',
    priority: 'medium',
    location: '',
    department: ''
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
      showSuccess('Complaint submitted successfully!');
      setFormData({
        title: '', category: '', description: '',
        priority: 'medium', location: '', department: ''
      });
      setLoading(false);
    }, 1500);
  };

  const categories = [
    'Academic Issue',
    'Facility Problem',
    'Harassment',
    'Financial',
    'Transport',
    'Canteen',
    'Library',
    'Other'
  ];

  const departments = [
    'Academic Affairs',
    'Student Affairs',
    'Administration',
    'Facilities',
    'IT Support',
    'Finance',
    'Security'
  ];

  const priorities = [
    { value: 'low', label: 'Low', color: '#66b032', icon: '🟢', bg: '#e8f5e9' },
    { value: 'medium', label: 'Medium', color: '#ffc107', icon: '🟡', bg: '#fff3e0' },
    { value: 'high', label: 'High', color: '#f57c00', icon: '🟠', bg: '#fff3e0' },
    { value: 'urgent', label: 'Urgent', color: '#dc3545', icon: '🔴', bg: '#ffebee' }
  ];

  return (
    <div className="form-page">
      <div className="complaint-card">
        {/* Card Header with Decoration */}
        <div className="complaint-header">
          <div className="header-decoration">
            <span className="decoration-line"></span>
            <span className="decoration-line"></span>
            <span className="decoration-line"></span>
          </div>
          <div className="header-icon">
            <span className="icon-emoji">📢</span>
          </div>
          <h2>Submit Complaint</h2>
          <p>We value your feedback and concerns</p>
          <div className="header-badge">
            <span className="badge-icon">⏰</span>
            <span>24/7 Support</span>
          </div>
        </div>

        <form onSubmit={handleSubmit}>
          {/* Title Field */}
          <div className="complaint-input-group">
            <div className="input-icon-wrapper">
              <span className="input-icon">📝</span>
            </div>
            <div className="input-field-wrapper">
              <label className="input-label">Complaint Title</label>
              <input
                type="text"
                name="title"
                value={formData.title}
                onChange={handleChange}
                placeholder="e.g., Classroom Issue, WiFi Problem"
                required
                className="complaint-input"
              />
              <span className="input-border"></span>
            </div>
          </div>

          {/* Category and Department */}
          <div className="two-columns">
            <div className="complaint-input-group">
              <div className="input-icon-wrapper">
                <span className="input-icon">📂</span>
              </div>
              <div className="input-field-wrapper">
                <label className="input-label">Category</label>
                <select
                  name="category"
                  value={formData.category}
                  onChange={handleChange}
                  required
                  className="complaint-input"
                >
                  <option value="">Select category</option>
                  {categories.map(cat => (
                    <option key={cat} value={cat}>{cat}</option>
                  ))}
                </select>
                <span className="input-border"></span>
              </div>
            </div>

            <div className="complaint-input-group">
              <div className="input-icon-wrapper">
                <span className="input-icon">🏢</span>
              </div>
              <div className="input-field-wrapper">
                <label className="input-label">Department</label>
                <select
                  name="department"
                  value={formData.department}
                  onChange={handleChange}
                  required
                  className="complaint-input"
                >
                  <option value="">Select department</option>
                  {departments.map(dept => (
                    <option key={dept} value={dept}>{dept}</option>
                  ))}
                </select>
                <span className="input-border"></span>
              </div>
            </div>
          </div>

          {/* Description */}
          <div className="complaint-input-group">
            <div className="input-icon-wrapper">
              <span className="input-icon">📋</span>
            </div>
            <div className="input-field-wrapper">
              <label className="input-label">Description</label>
              <textarea
                name="description"
                value={formData.description}
                onChange={handleChange}
                placeholder="Please describe your issue in detail..."
                rows="4"
                required
                className="complaint-input"
              />
              <span className="input-border"></span>
            </div>
          </div>

          {/* Priority and Location */}
          <div className="two-columns">
            <div className="complaint-input-group">
              <div className="input-icon-wrapper">
                <span className="input-icon">⚡</span>
              </div>
              <div className="input-field-wrapper">
                <label className="input-label">Priority</label>
                <div className="priority-selector">
                  {priorities.map(p => (
                    <button
                      key={p.value}
                      type="button"
                      className={`priority-chip ${formData.priority === p.value ? 'active' : ''}`}
                      style={{
                        borderColor: formData.priority === p.value ? p.color : '#e0e0e0',
                        background: formData.priority === p.value ? p.bg : 'white'
                      }}
                      onClick={() => setFormData({...formData, priority: p.value})}
                    >
                      <span className="priority-icon">{p.icon}</span>
                      <span className="priority-text">{p.label}</span>
                      {formData.priority === p.value && (
                        <span className="priority-check">✓</span>
                      )}
                    </button>
                  ))}
                </div>
              </div>
            </div>

            <div className="complaint-input-group">
              <div className="input-icon-wrapper">
                <span className="input-icon">📍</span>
              </div>
              <div className="input-field-wrapper">
                <label className="input-label">Location</label>
                <input
                  type="text"
                  name="location"
                  value={formData.location}
                  onChange={handleChange}
                  placeholder="Building, Room #"
                  required
                  className="complaint-input"
                />
                <span className="input-border"></span>
              </div>
            </div>
          </div>

          {/* Submit Button */}
          <div className="complaint-footer">
            <button type="submit" className="complaint-submit-btn" disabled={loading}>
              {loading ? (
                <span className="btn-loader"></span>
              ) : (
                <>
                  <span className="btn-icon">📨</span>
                  <span className="btn-text">Submit Complaint</span>
                  <span className="btn-glow"></span>
                </>
              )}
            </button>
            <div className="footer-note">
              <span className="note-icon">⏰</span>
              <span>Your complaint will be addressed within 24-48 hours</span>
            </div>
          </div>
        </form>

        {/* Quick Tips */}
        <div className="quick-tips">
          <div className="tips-header">
            <span className="tips-icon">💡</span>
            <span>Quick Tips</span>
          </div>
          <div className="tips-list">
            <div className="tip-item">
              <span className="tip-bullet">•</span>
              <span>Be specific about the issue</span>
            </div>
            <div className="tip-item">
              <span className="tip-bullet">•</span>
              <span>Mention exact location</span>
            </div>
            <div className="tip-item">
              <span className="tip-bullet">•</span>
              <span>Urgent issues get priority</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ComplaintForm;