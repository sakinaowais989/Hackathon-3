import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { createUserWithEmailAndPassword } from 'firebase/auth';
import { doc, setDoc } from 'firebase/firestore';
import { auth, db } from '../../services/firebase';
import { useNotification } from '../../context/NotificationContext';
import saylaniLogo from '../../assets/saylani logo.png';
import './Auth.css';

const Signup = () => {
  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    password: '',
    confirmPassword: '',
    phone: ''
  });
  const [userType, setUserType] = useState('student');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const { showSuccess, showError } = useNotification();
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');

    if (formData.password !== formData.confirmPassword) {
      setError('Passwords do not match');
      showError('Passwords do not match');
      return;
    }

    if (formData.password.length < 6) {
      setError('Password must be at least 6 characters');
      showError('Password too short');
      return;
    }

    setLoading(true);

    try {
      const userCredential = await createUserWithEmailAndPassword(
        auth, 
        formData.email, 
        formData.password
      );
      
      await setDoc(doc(db, 'users', userCredential.user.uid), {
        fullName: formData.fullName,
        email: formData.email,
        phone: formData.phone,
        role: userType,
        createdAt: new Date().toISOString()
      });

      showSuccess('Account created successfully!');
      navigate(userType === 'admin' ? '/admin-dashboard' : '/dashboard');
    } catch (error) {
      console.error("Signup error:", error.code);
      setError('Signup failed. Please try again.');
      showError('Signup failed');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="auth-page">
      <div className="auth-box" style={{ maxWidth: '400px' }}>
        <div className="logo-container">
          <img src={saylaniLogo} alt="Saylani Logo" style={{ width: '70px' }} />
          <h2 style={{ fontSize: '1.4rem' }}>Create Account</h2>
          <p style={{ fontSize: '0.85rem' }}>Join Saylani Welfare Family</p>
        </div>
        
        {error && <div className="error-message" style={{ padding: '8px' }}>{error}</div>}
        
        <form onSubmit={handleSubmit}>
          <div className="form-group" style={{ marginBottom: '12px' }}>
            <label style={{ fontSize: '0.85rem' }}>Full Name</label>
            <input
              type="text"
              name="fullName"
              value={formData.fullName}
              onChange={handleChange}
              required
              placeholder="Full name"
              style={{ padding: '8px 10px' }}
            />
          </div>

          <div className="form-group" style={{ marginBottom: '12px' }}>
            <label style={{ fontSize: '0.85rem' }}>Email</label>
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              required
              placeholder="Email address"
              style={{ padding: '8px 10px' }}
            />
          </div>

          <div className="form-group" style={{ marginBottom: '12px' }}>
            <label style={{ fontSize: '0.85rem' }}>Phone</label>
            <input
              type="tel"
              name="phone"
              value={formData.phone}
              onChange={handleChange}
              required
              placeholder="Phone number"
              style={{ padding: '8px 10px' }}
            />
          </div>

          <div className="form-group" style={{ marginBottom: '12px' }}>
            <label style={{ fontSize: '0.85rem' }}>Password</label>
            <input
              type="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              required
              placeholder="Password (min 6 chars)"
              style={{ padding: '8px 10px' }}
            />
          </div>

          <div className="form-group" style={{ marginBottom: '15px' }}>
            <label style={{ fontSize: '0.85rem' }}>Confirm Password</label>
            <input
              type="password"
              name="confirmPassword"
              value={formData.confirmPassword}
              onChange={handleChange}
              required
              placeholder="Confirm password"
              style={{ padding: '8px 10px' }}
            />
          </div>

          {/* User Type Selection */}
          <div className="user-type" style={{ 
            display: 'flex', 
            gap: '15px', 
            marginBottom: '15px',
            justifyContent: 'center'
          }}>
            <label style={{ display: 'flex', alignItems: 'center', gap: '5px' }}>
              <input
                type="radio"
                name="userType"
                value="student"
                checked={userType === 'student'}
                onChange={(e) => setUserType(e.target.value)}
              />
              <span style={{ fontSize: '0.9rem' }}>Student</span>
            </label>
            <label style={{ display: 'flex', alignItems: 'center', gap: '5px' }}>
              <input
                type="radio"
                name="userType"
                value="admin"
                checked={userType === 'admin'}
                onChange={(e) => setUserType(e.target.value)}
              />
              <span style={{ fontSize: '0.9rem' }}>Admin</span>
            </label>
          </div>
          
          <button 
            type="submit" 
            disabled={loading} 
            className="auth-btn"
            style={{ padding: '10px', fontSize: '0.95rem' }}
          >
            {loading ? <><span className="spinner"></span> Creating...</> : 'Sign Up'}
          </button>
        </form>
        
        <p className="auth-footer" style={{ marginTop: '12px', fontSize: '0.85rem' }}>
          Already have an account? <Link to="/">Login</Link>
        </p>
      </div>
    </div>
  );
};

export default Signup;