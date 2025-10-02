// src/pages/user/UserProfile.js
import React from 'react';
import { useNavigate } from 'react-router-dom';
import './UserProfile.css';

function UserProfile() {
  const navigate = useNavigate();
  const storedUser = localStorage.getItem('userData');
  const user = storedUser ? JSON.parse(storedUser) : null;

  if (!user) {
    return <p style={{ textAlign: 'center', marginTop: '50px' }}>⚠️ User profile not found. Please log in again.</p>;
  }

  const handleBack = () => {
    navigate('/user/dashboard'); // ✅ This matches your StudentPage route
  };

  return (
    <div className="user-profile">
      <h2>My Profile</h2>

      <div className="profile-card">
        <p><strong>Name:</strong> {user.name}</p>
        <p><strong>Email:</strong> {user.email}</p>
        <p><strong>Room Number:</strong> {user.roomNumber}</p>
      </div>
      <button className="back-button" onClick={handleBack}>
        ← Back to Dashboard
      </button>
    </div>
  );
}

export default UserProfile;
