import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import './Rooms.css';

function Rooms() {
  const navigate = useNavigate();
  const allRooms = ['A101', 'A102', 'A103', 'B201', 'B202', 'B203', 'C301', 'C302', 'D101', 'D102'];
  const [allocations, setAllocations] = useState([]);
  const [selectedRoom, setSelectedRoom] = useState('');
  const [roomStudents, setRoomStudents] = useState([]);

  useEffect(() => {
    axios.get('http://localhost:3001/allocations')
      .then(res => setAllocations(res.data))
      .catch(err => console.error(err));
  }, []);

  const getRoomStatus = (room) => {
    const count = allocations.filter(a => a.roomNumber === room).length;
    return {
      status: count >= 3 ? 'full' : 'available',
      count
    };
  };

  const handleRoomClick = (room) => {
    const students = allocations.filter(a => a.roomNumber === room);
    setSelectedRoom(room);
    setRoomStudents(students);
  };
  useEffect(() => {
  const isLoggedIn = localStorage.getItem('isLoggedIn');
  if (!isLoggedIn) {
    navigate('/login', { replace: true });
  }

  // Disable back navigation
  window.history.pushState(null, null, window.location.href);
  const handleBack = () => {
    window.history.go(1); // blocks back
  };
  window.addEventListener('popstate', handleBack);

  return () => {
    window.removeEventListener('popstate', handleBack);
  };
}, [navigate]);


  const totalRooms = allRooms.length;
  const allocatedCount = [...new Set(allocations.map(a => a.roomNumber))].length;
  const availableCount = totalRooms - allocatedCount;

  return (
    <div className="rooms-container">
      <div className="back-button">
        <button onClick={() => navigate('/dashboard')}>&larr; Back to Dashboard</button>
      </div>

      <h2>Room Overview</h2>
      <div className="summary">
        <p>Total Rooms: <b>{totalRooms}</b></p>
        <p>Allocated Rooms: <b>{allocatedCount}</b></p>
        <p>Available Rooms: <b>{availableCount}</b></p>
      </div>

      <div className="room-list">
        {allRooms.map((room, index) => {
          const { status, count } = getRoomStatus(room);
          return (
            <div
              key={index}
              className={`room-box ${status}`}
              onClick={() => handleRoomClick(room)}
            >
              {room} ({count}/3)
            </div>
          );
        })}
      </div>

      {selectedRoom && (
        <div className="student-details">
          <h3>Students in {selectedRoom}</h3>
          {roomStudents.length === 0 ? (
            <p>No students allocated to this room.</p>
          ) : (
            <ul>
              {roomStudents.map((s, i) => (
                <li key={i}>
                  <b>{s.studentName}</b><br />
                  Email: {s.email}<br />
                  Phone: {s.phone}
                </li>
              ))}
            </ul>
          )}
        </div>
      )}
    </div>
  );
}

export default Rooms;
