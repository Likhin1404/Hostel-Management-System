import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './UserLogin.css';
import axios from 'axios';

function UserLogin() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState(''); // This will be phone number
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const res = await axios.post('http://localhost:3001/user-login', {
        email,
        password,
      });

      if (res.data.success) {
        localStorage.setItem('userLoggedIn', true);
        localStorage.setItem('userData', JSON.stringify(res.data.user));
        navigate('/user/dashboard');
      } else {
        alert('Invalid email or phone.');
      }
    } catch (err) {
      alert('Login failed. Try again.');
      console.error(err);
    }
  };

  return (
    <div className="user-auth-container">
      <h2>User Login</h2>
      <form onSubmit={handleSubmit}>
        <input
          type="email"
          placeholder="Enter your email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />

        <input
          type="text"
          placeholder="Enter your phone number"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />

        <button type="submit">Login</button>
      </form>
    </div>
  );
}

export default UserLogin;
