import './Login.css';
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

function Login() {
  const navigate = useNavigate();
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  useEffect(() => {
    setUsername('');
    setPassword('');
    if (localStorage.getItem('isLoggedIn') === 'true') navigate('/dashboard');
  }, [navigate]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const { data } = await axios.post('http://localhost:3001/login', { username, password });
      alert(data.message);
      if (data.success) {
        localStorage.setItem('isLoggedIn', 'true');
        setUsername('');
        setPassword('');
        navigate('/dashboard');
      } else {
        alert('Invalid username or password.');
      }
    } catch (err) {
      alert(err.response?.data?.message || 'Login Failed');
    }
  };

  return (
    <div className="login-container">
      <h1>Welcome to Hostel Management System</h1>
      <p>Please proceed to the login page.</p>
      <form onSubmit={handleSubmit}>
        <label>Username:</label><br />
        <input type="text" required value={username} onChange={(e) => setUsername(e.target.value)} /><br /><br />
        <label>Password:</label><br />
        <input type="password" required value={password} onChange={(e) => setPassword(e.target.value)} /><br /><br />
        <button type="submit">Login</button>
      </form>
    </div>
  );
}

export default Login;
