import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import api from '../../services/api';
import '../../css/TherapistDetails.css';


const TherapistDetails = () => {
    const { id } = useParams();
    const [workingHours, setWorkingHours] = useState([]);
    const [appointments, setAppointments] = useState([]);
  
    useEffect(() => {
      api.get(`/Therapist/${id}`)
        .then(res => setWorkingHours(res.data))
        .catch(() => alert('שגיאה בטעינת שעות העבודה'));
  
      api.get(`/Therapist?id=${id}`)
        .then(res => setAppointments(res.data))
        .catch(() => alert('שגיאה בטעינת תורים פנויים'));
    }, [id]);
  
    return (
      <div className="therapist-details">
        <h2>שעות עבודה</h2>
        <ul>
          {workingHours.map((h, i) => (
            <li key={i}>{h}</li>
          ))}
        </ul>
  
        <h2>תורים פנויים</h2>
        <ul>
          {appointments.map((a, i) => (
            <li key={i}>{a.date} - {a.time}</li>
          ))}
        </ul>
      </div>
    );
  };
  
  export default TherapistDetails;
