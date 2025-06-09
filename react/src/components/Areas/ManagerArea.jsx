// ManagerArea.jsx
import React, { useEffect, useState } from 'react';
import './ManagerArea.css';

const ManagerArea = () => {
  const [therapists, setTherapists] = useState([]);
  const [patients, setPatients] = useState([]);
  const [appointments, setAppointments] = useState([]);

  useEffect(() => {
    fetch('/api/Therapist')
      .then(res => res.json())
      .then(data => setTherapists(data));

    fetch('/api/Patient')
      .then(res => res.json())
      .then(data => setPatients(data));

    fetch('/api/Appointment')
      .then(res => res.json())
      .then(data => setAppointments(data));
  }, []);

  return (
    <div className="manager-area">
      <h1>אזור מנהל</h1>

      <section>
        <h2>ניהול מטפלים</h2>
        <ul>
          {therapists.map(t => (
            <li key={t.id}>{t.fullName} - {t.specialization}</li>
          ))}
        </ul>
        {/* הוסף כפתורי הוספה/עדכון/מחיקה לפי הצורך */}
      </section>

      <section>
        <h2>ניהול מטופלים</h2>
        <ul>
          {patients.map(p => (
            <li key={p.id}>{p.fullName}</li>
          ))}
        </ul>
        {/* הוסף כפתורי הוספה/עדכון/מחיקה לפי הצורך */}
      </section>

      <section>
        <h2>כל התורים</h2>
        <ul>
          {appointments.map(a => (
            <li key={a.id}>
              {new Date(a.date).toLocaleString()} - מטפל: {a.therapistName}, מטופל: {a.patientName}
            </li>
          ))}
        </ul>
      </section>
    </div>
  );
};

export default ManagerArea;
