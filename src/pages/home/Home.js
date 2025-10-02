// src/pages/home/Home.js
import { useNavigate } from 'react-router-dom';
import './Home.css';

function Home() {
  const navigate = useNavigate();

  return (
    <div className="home-page">
      <h2>Welcome to the Hostel Management System</h2>
      <p>Manage all hostel-related operations efficiently.</p>
      
      <div className="home-buttons">
        <button onClick={() => navigate('/login')}>Admin Login</button>
          <button onClick={() => navigate('/user-login')}>User Login</button>
      </div>
    </div>
  );
}

export default Home;
