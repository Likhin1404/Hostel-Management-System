import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import './Dashboard.css';

function Dashboard() {
  const navigate = useNavigate();

  useEffect(() => {
    if (localStorage.getItem('isLoggedIn') !== 'true') {
      navigate('/login', { replace: true });
    }

    const blockBack = () => window.history.go(1);
    window.history.pushState(null, null, window.location.href);
    window.addEventListener('popstate', blockBack);

    return () => window.removeEventListener('popstate', blockBack);
  }, [navigate]);

  return (
    <div className="dashboard-container">
      <h2>Welcome to Hostel Dashboard</h2>
      <div className="dashboard-grid">
        <div className="dashboard-item" onClick={() => navigate('/admissions')}>Admissions</div>
        <div className="dashboard-item" onClick={() => navigate('/rooms')}>Rooms</div>
        <div className="dashboard-item" onClick={() => navigate('/complaints')}>Complaints</div>
      </div>
    </div>
  );
}

export default Dashboard;
