// TherapistArea.jsx
import React, { useEffect, useState, useContext } from 'react';
import './TherapistArea.css';
import { UserContext } from '../contexts/UserContext';

const TherapistArea = () => {
  const { user } = useContext(UserContext);
  const [therapistInfo, setTherapistInfo] = useState(null);
  const [appointments, setAppointments] = useState([]);

  useEffect(() => {
    fetch(`/api/Therapist/${user.id}`)
      .then(res => res.json())
      .then(data => setTherapistInfo(data));

    fetch(`/api/Appointment/Therapist/${user.id}`)
      .then(res => res.json())
      .then(data => {
        const upcoming = data.filter(a => new Date(a.date) >= new Date());
        setAppointments(upcoming);
      });
  }, [user.id]);

  if (!therapistInfo) return <p>טוען מידע...</p>;

  return (
    <div className="therapist-area">
      <h1>שלום, {therapistInfo.fullName}</h1>

      <section>
        <h2>פרופיל מטפל</h2>
        <p>התמחות: {therapistInfo.specialization}</p>
        <p>שעות עבודה: {therapistInfo.workingHours}</p>
      </section>

      <section>
        <h2>תורים קרובים</h2>
        {appointments.length === 0 ? (
          <p>אין תורים קרובים</p>
        ) : (
          <ul>
            {appointments.map(a => (
              <li key={a.id}>
                {new Date(a.date).toLocaleString()} - {a.patientName}
                {/* כאן אפשר להוסיף כפתור להוספת סיכום פגישה */}
              </li>
            ))}
          </ul>
        )}
      </section>
    </div>
  );
};

export default TherapistArea;
