import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import './Complaints.css';

function Complaints() {
  const navigate = useNavigate();
  const [complaints, setComplaints] = useState([]);

  useEffect(() => {
    fetchComplaints();
  }, []);

  const fetchComplaints = async () => {
    try {
      const res = await axios.get('http://localhost:3001/complaints');
      setComplaints(res.data);
    } catch (err) {
      console.error('Failed to fetch complaints:', err);
    }
  };

  const deleteComplaint = async (id) => {
    if (window.confirm('Are you sure you want to delete this complaint?')) {
      try {
        await axios.delete(`http://localhost:3001/complaints/${id}`);
        fetchComplaints();
      } catch (err) {
        console.error('Failed to delete complaint:', err);
        alert('Delete failed');
      }
    }
  };

  const resolveComplaint = async (id) => {
    try {
      await axios.put(`http://localhost:3001/complaints/${id}/resolve`, { status: 'Resolved' });
      fetchComplaints();
    } catch (err) {
      console.error('Failed to resolve complaint:', err);
      alert('Resolve failed');
    }
  };

  return (
    <div className="complaints-container">
      <div className="back-button">
        <button onClick={() => navigate('/dashboard')}>&larr; Back to Dashboard</button>
      </div>

      <h2>📋 Student Complaints</h2>

      <div className="complaints-list">
        {complaints.length === 0 ? (
          <p className="no-complaints">No complaints yet.</p>
        ) : (
          complaints.map((c) => (
            <div key={c._id} className="complaint-card">
              <h4>{c.studentName} (Room {c.roomNumber})</h4>
              <p>{c.message}</p>
              <p className="status">Status: {c.status || 'Pending'}</p>
              <div className="button-group">
                <button
                  className="resolve-btn"
                  onClick={() => resolveComplaint(c._id)}
                  disabled={c.status === 'Resolved'}
                >
                  ✅ Resolve
                </button>
                <button className="delete-btn" onClick={() => deleteComplaint(c._id)}>
                  🗑️ Delete
                </button>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
}

export default Complaints;