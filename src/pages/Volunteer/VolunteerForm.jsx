import React, { useState } from 'react';
import { useAuth } from '../../context/AuthContext';
import { useNotification } from '../../context/NotificationContext';
import './Volunteer.css';

const VolunteerForm = () => {
  const { currentUser } = useAuth();
  const { showSuccess } = useNotification();
  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    phone: '',
    eventType: '',
    role: '',
    date: '',
    hours: '',
    skills: '',
    experience: ''
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
      showSuccess('Volunteer registration submitted!');
      setFormData({
        fullName: '', email: '', phone: '', eventType: '',
        role: '', date: '', hours: '', skills: '', experience: ''
      });
      setLoading(false);
    }, 1500);
  };

  const eventTypes = [
    'Food Drive', 'Teaching', 'Health Camp', 
    'Tree Plantation', 'Blood Donation', 'Other'
  ];

  const roles = [
    'Coordinator', 'Teacher', 'Helper', 
    'First Aid', 'Registration', 'General'
  ];

  return (
    <div className="form-page">
      <div className="saylani-card volunteer-card">
        {/* Card Header */}
        <div className="card-header">
          <div className="header-icon">🤝</div>
          <h2>Volunteer Registration</h2>
          <p>Join us in making a difference</p>
          <div className="header-badge">Be the change</div>
        </div>

        <form onSubmit={handleSubmit}>
          {/* Personal Information Section */}
          <div className="form-section">
            <h3 className="section-title">
              <span className="title-icon">👤</span>
              Personal Information
            </h3>
            
            <div className="two-columns">
              <div className="saylani-input-group">
                <span className="input-icon">📝</span>
                <input
                  type="text"
                  name="fullName"
                  value={formData.fullName}
                  onChange={handleChange}
                  placeholder="Full name"
                  required
                />
                <label className="input-label">Full Name</label>
              </div>

              <div className="saylani-input-group">
                <span className="input-icon">📧</span>
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  placeholder="Email"
                  required
                />
                <label className="input-label">Email</label>
              </div>
            </div>

            <div className="saylani-input-group">
              <span className="input-icon">📞</span>
              <input
                type="tel"
                name="phone"
                value={formData.phone}
                onChange={handleChange}
                placeholder="Phone number"
                required
              />
              <label className="input-label">Phone Number</label>
            </div>
          </div>

          {/* Volunteer Details Section */}
          <div className="form-section">
            <h3 className="section-title">
              <span className="title-icon">🎯</span>
              Volunteer Details
            </h3>

            <div className="two-columns">
              <div className="saylani-input-group">
                <span className="input-icon">📋</span>
                <select
                  name="eventType"
                  value={formData.eventType}
                  onChange={handleChange}
                  required
                >
                  <option value="">Select event</option>
                  {eventTypes.map(event => (
                    <option key={event} value={event}>{event}</option>
                  ))}
                </select>
                <label className="input-label">Event Type</label>
              </div>

              <div className="saylani-input-group">
                <span className="input-icon">👔</span>
                <select
                  name="role"
                  value={formData.role}
                  onChange={handleChange}
                  required
                >
                  <option value="">Select role</option>
                  {roles.map(role => (
                    <option key={role} value={role}>{role}</option>
                  ))}
                </select>
                <label className="input-label">Preferred Role</label>
              </div>
            </div>

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
                <label className="input-label">Available Date</label>
              </div>

              <div className="saylani-input-group">
                <span className="input-icon">⏰</span>
                <input
                  type="number"
                  name="hours"
                  value={formData.hours}
                  onChange={handleChange}
                  placeholder="Hours/week"
                  min="1"
                  max="40"
                  required
                />
                <label className="input-label">Hours per Week</label>
              </div>
            </div>
          </div>

          {/* Skills Section */}
          <div className="form-section">
            <h3 className="section-title">
              <span className="title-icon">⭐</span>
              Skills & Experience
            </h3>

            <div className="saylani-input-group">
              <span className="input-icon">💪</span>
              <textarea
                name="skills"
                value={formData.skills}
                onChange={handleChange}
                placeholder="Your skills (e.g., teaching, first aid)"
                rows="2"
              />
              <label className="input-label">Skills</label>
            </div>

            <div className="saylani-input-group">
              <span className="input-icon">📚</span>
              <textarea
                name="experience"
                value={formData.experience}
                onChange={handleChange}
                placeholder="Previous volunteer experience"
                rows="2"
              />
              <label className="input-label">Experience (Optional)</label>
            </div>
          </div>

          {/* Submit Button */}
          <button type="submit" className="saylani-btn volunteer-btn" disabled={loading}>
            {loading ? (
              <span className="btn-loader"></span>
            ) : (
              <>
                <span className="btn-icon">🤝</span>
                <span>Join as Volunteer</span>
              </>
            )}
          </button>
        </form>

        {/* Motivational Footer */}
        <div className="volunteer-footer">
          <div className="quote">
            <span className="quote-icon">"</span>
            <p>Together we can make a difference</p>
            <span className="quote-icon">"</span>
          </div>
          <div className="stats-mini">
            <span>500+ Volunteers</span>
            <span>•</span>
            <span>50+ Events</span>
            <span>•</span>
            <span>1000+ Lives</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default VolunteerForm;