import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import './Admissions.css';

function Admissions() {
  const navigate = useNavigate();
  const [studentName, setStudentName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [roomNumber, setRoomNumber] = useState('');
  const [admissions, setAdmissions] = useState([]);
  const [editId, setEditId] = useState(null);
  const allRooms = ['A101', 'A102', 'A103', 'B201', 'B202', 'B203', 'C301', 'C302', 'D101', 'D102'];

  const isRoomFull = (room) => admissions.filter(a => a.roomNumber === room).length >= 3;
  const resetForm = () => { setStudentName(''); setEmail(''); setPhone(''); setRoomNumber(''); setEditId(null); };

  const fetchAdmissions = () => {
    axios.get('http://localhost:3001/allocations')
      .then(res => setAdmissions(res.data))
      .catch(console.error);
  };

  useEffect(() => {
    if (localStorage.getItem('isLoggedIn') !== 'true') navigate('/', { replace: true });
    fetchAdmissions();
    window.history.pushState(null, '', window.location.href);
    const blockBack = () => window.history.go(1);
    window.addEventListener('popstate', blockBack);
    return () => window.removeEventListener('popstate', blockBack);
  }, [navigate]);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!editId && isRoomFull(roomNumber)) return alert("Room is full.");
    const data = { studentName, email, phone, roomNumber };
    const req = editId
      ? axios.put(`http://localhost:3001/allocations/${editId}`, data)
      : axios.post('http://localhost:3001/admitStudent', data);
    req.then(() => {
      alert(editId ? "Updated!" : "Admitted!");
      fetchAdmissions();
      resetForm();
    }).catch(err => alert(err.response?.data?.message || "Operation failed"));
  };

  const handleEdit = (a) => {
    setStudentName(a.studentName);
    setEmail(a.email);
    setPhone(a.phone);
    setRoomNumber(a.roomNumber);
    setEditId(a._id);
  };

  const handleDelete = (id) => {
    if (!window.confirm("Delete this entry?")) return;
    axios.delete(`http://localhost:3001/allocations/${id}`)
      .then(() => { alert("Deleted."); fetchAdmissions(); })
      .catch(() => alert("Delete failed."));
  };

  return (
    <div className="admissions-container">
      <div className="back-button">
        <button onClick={() => navigate('/dashboard')}>&larr; Back to Dashboard</button>
      </div>

      <div className="form-card">
        <h2>{editId ? 'Update Admission' : 'New Admission'}</h2>
        <form onSubmit={handleSubmit}>
          <label>Student Name:</label>
          <input type="text" value={studentName} onChange={e => setStudentName(e.target.value)} required />
          <label>Email:</label>
          <input type="email" value={email} onChange={e => setEmail(e.target.value)} required />
          <label>Phone:</label>
          <input type="text" value={phone} onChange={e => setPhone(e.target.value)} required />
          <label>Room Number:</label>
          <select value={roomNumber} onChange={e => setRoomNumber(e.target.value)} required>
            <option value="">Select a room</option>
            {allRooms.map((room, i) => (
              <option key={i} value={room} disabled={isRoomFull(room)}>
                {room} {isRoomFull(room) ? '(Full)' : ''}
              </option>
            ))}
          </select>
          <button type="submit" className="btn green">{editId ? 'Update' : 'Admit'}</button>
          {editId && <button type="button" className="btn grey" onClick={resetForm}>Cancel</button>}
        </form>
      </div>

      <div className="table-card">
        <h2>Admitted Students</h2>
        <table>
          <thead>
            <tr><th>Name</th><th>Email</th><th>Phone</th><th>Room</th><th>Actions</th></tr>
          </thead>
          <tbody>
            {admissions.map((a) => (
              <tr key={a._id}>
                <td>{a.studentName}</td>
                <td>{a.email}</td>
                <td>{a.phone}</td>
                <td>{a.roomNumber}</td>
                <td>
                  <button className="btn green" onClick={() => handleEdit(a)}>Update</button>
                  <button className="btn red" onClick={() => handleDelete(a._id)}>Delete</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default Admissions;
