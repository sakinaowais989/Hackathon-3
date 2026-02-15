import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { Toaster } from 'react-hot-toast';

// Context Providers
import { AuthProvider } from './context/AuthContext';
import { NotificationProvider } from './context/NotificationContext';

// Components
import ProtectedRoute from './components/ProtectedRoute';
import Navbar from './components/Navbar';
import Sidebar from './components/Sidebar';
import NotificationAlert from './components/NotificationAlert';
import StatusBadge from './components/StatusBadge';

// Auth Pages
import Login from './pages/Auth/Login';
import Signup from './pages/Auth/Signup';

// Dashboard Pages
import Dashboard from './pages/Dashboard/Dashboard';
// ✅ DashboardTable ab Dashboard folder se import ho raha hai
import DashboardTable from './pages/Dashboard/DashboardTable';

// Admin Pages
import AdminDashboard from './pages/Admin/AdminDashboard';

// Lost & Found Pages
import LostFoundForm from './pages/LostFound/LostFoundForm';
import MyLostFound from './pages/LostFound/MyLostFound';

// Complaints Pages
import ComplaintForm from './pages/Complaints/ComplaintForm';
import MyComplaints from './pages/Complaints/MyComplaints';

// Volunteer Pages
import VolunteerForm from './pages/Volunteer/VolunteerForm';
import VolunteerList from './pages/Volunteer/VolunteerList';

// CSS Imports
import './styles/theme.css';
import './App.css';

// Page-specific CSS
import './pages/Auth/Auth.css';
import './pages/Dashboard/Dashboard.css';
import './pages/Admin/AdminDashboard.css';
import './pages/LostFound/LostFound.css';
import './pages/Complaints/Complaints.css';
import './pages/Volunteer/Volunteer.css';

// Component-specific CSS
import './components/Navbar.css';
import './components/Sidebar.css';
import './components/NotificationAlert.css';
import './components/StatusBadge.css';

function App() {
  return (
    <Router>
      <AuthProvider>
        <NotificationProvider>
          <div className="app">
            <Toaster 
              position="top-right"
              toastOptions={{
                duration: 4000,
                style: {
                  background: '#363636',
                  color: '#fff',
                },
                success: {
                  duration: 3000,
                  iconTheme: {
                    primary: '#66b032',
                    secondary: '#fff',
                  },
                },
                error: {
                  duration: 4000,
                  iconTheme: {
                    primary: '#ef4444',
                    secondary: '#fff',
                  },
                },
              }}
            />
            
            <NotificationAlert />
            
            <Routes>
              {/* Public Routes */}
              <Route path="/" element={<Login />} />
              <Route path="/login" element={<Login />} />
              <Route path="/signup" element={<Signup />} />
              <Route path="/register" element={<Signup />} />
              
              {/* Protected Routes */}
              <Route 
                path="/dashboard" 
                element={
                  <ProtectedRoute>
                    <>
                      <Navbar />
                      <div className="app-layout">
                        <Sidebar />
                        <main className="main-content">
                          <Dashboard />
                        </main>
                      </div>
                    </>
                  </ProtectedRoute>
                } 
              />
              
              <Route 
                path="/admin-dashboard" 
                element={
                  <ProtectedRoute>
                    <>
                      <Navbar />
                      <div className="app-layout">
                        <Sidebar />
                        <main className="main-content">
                          <AdminDashboard />
                        </main>
                      </div>
                    </>
                  </ProtectedRoute>
                } 
              />
              
              <Route 
                path="/lost-found" 
                element={
                  <ProtectedRoute>
                    <>
                      <Navbar />
                      <div className="app-layout">
                        <Sidebar />
                        <main className="main-content">
                          <LostFoundForm />
                        </main>
                      </div>
                    </>
                  </ProtectedRoute>
                } 
              />
              
              <Route 
                path="/my-items" 
                element={
                  <ProtectedRoute>
                    <>
                      <Navbar />
                      <div className="app-layout">
                        <Sidebar />
                        <main className="main-content">
                          <MyLostFound />
                        </main>
                      </div>
                    </>
                  </ProtectedRoute>
                } 
              />
              
              <Route 
                path="/complaints" 
                element={
                  <ProtectedRoute>
                    <>
                      <Navbar />
                      <div className="app-layout">
                        <Sidebar />
                        <main className="main-content">
                          <ComplaintForm />
                        </main>
                      </div>
                    </>
                  </ProtectedRoute>
                } 
              />
              
              <Route 
                path="/my-complaints" 
                element={
                  <ProtectedRoute>
                    <>
                      <Navbar />
                      <div className="app-layout">
                        <Sidebar />
                        <main className="main-content">
                          <MyComplaints />
                        </main>
                      </div>
                    </>
                  </ProtectedRoute>
                } 
              />
              
              <Route 
                path="/volunteer" 
                element={
                  <ProtectedRoute>
                    <>
                      <Navbar />
                      <div className="app-layout">
                        <Sidebar />
                        <main className="main-content">
                          <VolunteerForm />
                        </main>
                      </div>
                    </>
                  </ProtectedRoute>
                } 
              />
              
              <Route 
                path="/my-volunteering" 
                element={
                  <ProtectedRoute>
                    <>
                      <Navbar />
                      <div className="app-layout">
                        <Sidebar />
                        <main className="main-content">
                          <VolunteerList />
                        </main>
                      </div>
                    </>
                  </ProtectedRoute>
                } 
              />
              
              <Route path="*" element={<Navigate to="/dashboard" />} />
            </Routes>
          </div>
        </NotificationProvider>
      </AuthProvider>
    </Router>
  );
}

export default App;