import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import './Logout.css';

function Logout() {
  const navigate = useNavigate();

  useEffect(() => {
    // Optionally clear session or localStorage here
    alert("You have been logged out.");
    navigate('/'); // Redirect to Home instead of Login
  }, [navigate]);

  return <div className="logout-page">Logging out...</div>;
}

export default Logout;
