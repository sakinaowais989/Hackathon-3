import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { signInWithEmailAndPassword } from 'firebase/auth';
import { auth } from '../../services/firebase';
import { useNotification } from '../../context/NotificationContext';
import saylaniLogo from '../../assets/saylani logo.png';
import './Auth.css';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [userType, setUserType] = useState('student'); // 'student' or 'admin'
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const { showError, showSuccess } = useNotification();
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    try {
      const userCredential = await signInWithEmailAndPassword(auth, email, password);
      console.log("Login successful:", userCredential.user.email);
      showSuccess(`${userType === 'admin' ? 'Admin' : 'Student'} login successful!`);
      
      // Redirect based on user type
      if (userType === 'admin') {
        navigate('/admin-dashboard');
      } else {
        navigate('/dashboard');
      }
    } catch (error) {
      console.error("Login error:", error.code);
      setError('Invalid email or password');
      showError('Invalid credentials');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="auth-page">
      <div className="auth-box" style={{ maxWidth: '380px' }}>
        <div className="logo-container">
          <img src={saylaniLogo} alt="Saylani Logo" style={{ width: '80px' }} />
          <h2 style={{ fontSize: '1.5rem', marginBottom: '5px' }}>Welcome Back!</h2>
          <p style={{ fontSize: '0.9rem' }}>Login to Campus Portal</p>
        </div>
        
        {error && <div className="error-message" style={{ padding: '10px' }}>{error}</div>}
        
        <form onSubmit={handleSubmit}>
          <div className="form-group" style={{ marginBottom: '15px' }}>
            <label style={{ fontSize: '0.9rem' }}>Email Address</label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              placeholder="Enter your email"
              disabled={loading}
              style={{ padding: '10px 12px' }}
            />
          </div>
          
          <div className="form-group" style={{ marginBottom: '15px' }}>
            <label style={{ fontSize: '0.9rem' }}>Password</label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              placeholder="Enter your password"
              disabled={loading}
              style={{ padding: '10px 12px' }}
            />
          </div>

          {/* User Type Selection */}
          <div className="user-type" style={{ 
            display: 'flex', 
            gap: '15px', 
            marginBottom: '20px',
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
              <span style={{ color: '#333' }}>Student</span>
            </label>
            <label style={{ display: 'flex', alignItems: 'center', gap: '5px' }}>
              <input
                type="radio"
                name="userType"
                value="admin"
                checked={userType === 'admin'}
                onChange={(e) => setUserType(e.target.value)}
              />
              <span style={{ color: '#333' }}>Admin</span>
            </label>
          </div>
          
          <button 
            type="submit" 
            disabled={loading} 
            className="auth-btn"
            style={{ padding: '12px', fontSize: '1rem', marginTop: '5px' }}
          >
            {loading ? <><span className="spinner"></span> Logging in...</> : 'Login'}
          </button>
        </form>

        <p className="auth-footer" style={{ marginTop: '15px', fontSize: '0.9rem' }}>
          Don't have an account? <Link to="/signup">Sign up</Link>
        </p>
      </div>
    </div>
  );
};

export default Login;