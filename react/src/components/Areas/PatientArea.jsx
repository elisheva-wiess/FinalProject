// PatientArea.jsx
import React, { useEffect, useState, useContext } from 'react';
import './PatientArea.css';
import { UserContext } from '../contexts/UserContext';

const PatientArea = () => {
  const { user } = useContext(UserContext);
  const [patientInfo, setPatientInfo] = useState(null);
  const [appointments, setAppointments] = useState([]);
  const [visitSummaries, setVisitSummaries] = useState([]);

  useEffect(() => {
    // דוגמאות קריאות API - החלף לפי המימוש שלך
    fetch(`/api/Patient/${user.id}`)
      .then(res => res.json())
      .then(data => setPatientInfo(data));

    fetch(`/api/Appointment/Patient/${user.id}`)
      .then(res => res.json())
      .then(data => {
        const upcoming = data.filter(a => new Date(a.date) >= new Date());
        setAppointments(upcoming);
      });

    fetch(`/api/PersonalArea/VisitSummaries/${user.id}`)
      .then(res => res.json())
      .then(data => setVisitSummaries(data));
  }, [user.id]);

  if (!patientInfo) return <p>טוען מידע...</p>;

  return (
    <div className="patient-area">
      <h1>שלום, {patientInfo.fullName}</h1>

      <section>
        <h2>פרטים אישיים</h2>
        <p>מייל: {patientInfo.email}</p>
        <p>טלפון: {patientInfo.phone}</p>
        {/* הוסף לפי הצורך */}
      </section>

      <section>
        <h2>תורים קרובים</h2>
        {appointments.length === 0 ? (
          <p>אין תורים קרובים</p>
        ) : (
          <ul>
            {appointments.map(a => (
              <li key={a.id}>{new Date(a.date).toLocaleString()} - {a.therapistName}</li>
            ))}
          </ul>
        )}
      </section>

      <section>
        <h2>סיכומי פגישות</h2>
        {visitSummaries.length === 0 ? (
          <p>אין סיכומי פגישה</p>
        ) : (
          <ul>
            {visitSummaries.map(v => (
              <li key={v.id}>{v.date} - {v.summary}</li>
            ))}
          </ul>
        )}
      </section>
    </div>
  );
};

export default PatientArea;
