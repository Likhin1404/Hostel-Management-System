import React from 'react';
import { useNavigate } from 'react-router-dom';
import './UserDashboard.css';

function UserDashboard() {
  const navigate = useNavigate();
  const user = JSON.parse(localStorage.getItem('userData'));

  if (!user) {
    return (
      <div className="user-dashboard">
        <h2>User Dashboard</h2>
        <p>User not found. Please login again.</p>
        <button onClick={() => navigate('/user-login')}>Go to Login</button>
      </div>
    );
  }

  return (
    <div className="user-dashboard">
      <h2>Welcome, {user.name}</h2>
      <p style={{ marginBottom: '30px' }}>Choose an option below:</p>

      <div className="app-grid">
        <div className="app-card" onClick={() => navigate('/user/students')}>
          <p>View Students</p>
        </div>

        <div className="app-card" onClick={() => navigate('/user/profile')}>
          <p>My Profile</p>
        </div>

        <div className="app-card" onClick={() => navigate('/user/complaint')}>
          <p>Submit Complaint</p>
        </div>

        <div className="app-card" onClick={() => navigate('/')}>
          <p>Back to Home</p>
        </div>
      </div>
    </div>
  );
}

export default UserDashboard;
