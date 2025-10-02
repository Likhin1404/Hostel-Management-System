// src/pages/user/StudentPage.js
import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import './StudentPage.css';

function StudentPage() {
  const [roomData, setRoomData] = useState({});
  const navigate = useNavigate();

  useEffect(() => {
    axios.get('http://localhost:3001/allocations')
      .then(res => {
        const grouped = {};
        res.data.forEach(student => {
          const room = student.roomNumber;
          if (!grouped[room]) grouped[room] = [];
          grouped[room].push(student);
        });
        setRoomData(grouped);
      })
      .catch(err => console.error(err));
  }, []);

  return (
    <div className="student-page">
      <h2>Students by Room</h2>

      <div className="room-grid">
        {Object.entries(roomData).map(([room, students]) => (
          <div key={room} className="room-card">
            <h3>Room {room}</h3>
            {students.map((student, index) => (
              <div key={index} className="student-entry">
                <p><strong>Name:</strong> {student.studentName}</p>
                <hr />
              </div>
            ))}
          </div>
        ))}
      </div>
         <div className="button-group">
          <button type="button" onClick={() => navigate('/user/dashboard')}>
            Back to Dashboard
          </button>
        </div>
    </div>
  );
}

export default StudentPage;
