import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import api from '../../services/api';
import '../../css/SpecializationDetails.css';

const SpecializationDetails = () => {
  const { name } = useParams();
  const [therapists, setTherapists] = useState([]);
  const [appointments, setAppointments] = useState({});
  const [visible, setVisible] = useState({});

  useEffect(() => {
    api.get(`/Specialization/GetTherapistsBySpecializationName?name=${encodeURIComponent(name)}`)
      .then(res => setTherapists(res.data))
      .catch(() => alert('לא נמצאו מטפלים בהתמחות'));
  }, [name]);

  const toggleAppointments = (therapistId) => {
    const isVisible = visible[therapistId];
    setVisible(prev => ({
      ...prev,
      [therapistId]: !isVisible
    }));

    if (!appointments[therapistId] && !isVisible) {
      api.get(`/Appointment/GetAvailableAppointmentsByTherapistId?therapistId=${therapistId}`)
        .then(res => {
          setAppointments(prev => ({
            ...prev,
            [therapistId]: res.data
          }));
        })
        .catch(() => alert('שגיאה בטעינת תורים פנויים'));
    }
  };

  return (
    <div className="specialization-details">
      <h2>מטפלים בהתמחות: {name}</h2>
      <div className="therapists-list">
        {therapists.map((t, i) => (
          <div key={i} className="therapist-card">
            <h3>{t.firstName} {t.lastName}</h3>
            <p>{t.description}</p>
            <button onClick={() => toggleAppointments(t.id)}>קבע תור</button>

            {visible[t.id] && appointments[t.id] && (
              <table className="appointments-table">
                <thead>
                  <tr>
                    <th>תאריך</th>
                    <th>שעה</th>
                  </tr>
                </thead>
                <tbody>
                  {appointments[t.id].map((a, i) => (
                    <tr key={i}>
                      <td>{new Date(a.date).toLocaleDateString()}</td>
                      <td>{a.time}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default SpecializationDetails;
