import { useEffect, useState, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import './UserComplaintForm.css';

function UserComplaintForm() {
  const navigate = useNavigate();
  const storedUser = localStorage.getItem('userData');
  const user = storedUser ? JSON.parse(storedUser) : null;
  const [message, setMessage] = useState('');
  const [complaints, setComplaints] = useState([]);

  const fetchUserComplaints = useCallback(async () => {
    if (!user) return;
    try {
      const res = await axios.get(`http://localhost:3001/complaints/user/${user.email}`);
      setComplaints(res.data);
    } catch (err) {
      console.error('Failed to fetch user complaints:', err);
    }
  }, [user]);

  useEffect(() => {
    if (user) {
      fetchUserComplaints();
    }
  }, [fetchUserComplaints, user]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post('http://localhost:3001/submit-complaint', {
        studentName: user.name,
        email: user.email,
        roomNumber: user.roomNumber,
        message,
        status: 'Pending',
      });
      alert('Complaint submitted!');
      setMessage('');
      fetchUserComplaints();
      navigate('/user/dashboard');
    } catch (err) {
      console.error(err);
      alert('Failed to submit complaint');
    }
  };

  if (!user) {
    return <p>Please log in again.</p>;
  }

  return (
    <div className="complaint-form">
      <h2>📝 Submit a Complaint</h2>

      <form onSubmit={handleSubmit}>
        <textarea
          placeholder="Enter your complaint..."
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          required
          rows={5}
        />

        <div className="button-group">
          <button type="submit">Submit Complaint</button>
          <button type="button" onClick={() => navigate('/user/dashboard')}>
            Back to Dashboard
          </button>
        </div>
      </form>

      <h3>Your Complaints</h3>
      <div className="user-complaints-list">
        {complaints.length === 0 ? (
          <p>No complaints submitted yet.</p>
        ) : (
          complaints.map((c) => (
            <div key={c._id} className="user-complaint-card">
              <p>{c.message}</p>
              <p className="status">Status: {c.status || 'Pending'}</p>
            </div>
          ))
        )}
      </div>
    </div>
  );
}

export default UserComplaintForm;