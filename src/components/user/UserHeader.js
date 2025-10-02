import { Link, useNavigate } from 'react-router-dom';
import './UserHeader.css';

function UserHeader() {
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem('userLoggedIn');
    navigate('/'); // Go to home after logout
  };

  return (
    <header className="user-header">
      <div className="user-logo">User Portal</div>
      <nav className="user-nav">
        <Link to="/">Home</Link>
        <Link to="/user-login">Login</Link>
        <Link to="/about">About</Link>
        <button onClick={handleLogout} className="logout-btn">Logout</button>
      </nav>
    </header>
  );
}

export default UserHeader;
