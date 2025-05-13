// components/Specializations/SpecializationDetails.jsx
import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import api from '../../services/api';

const SpecializationDetails = () => {
    const { name } = useParams();
    const [therapists, setTherapists] = useState([]);
    const [appointments, setAppointments] = useState({});
    const [visible, setVisible] = useState({}); // כדי להציג/להסתיר טבלת תורים

    useEffect(() => {
        api.get(`/Patient/SpecializationsTherapists?name=${name}`)
            .then(res => setTherapists(res.data))
            .catch(() => alert('לא נמצאו מטפלים בהתמחות'));
    }, [name]);

    const toggleAppointments = (therapistFirstName) => {
        setVisible(prev => ({
            ...prev,
            [therapistFirstName]: !prev[therapistFirstName]
        }));

        if (!appointments[therapistFirstName]) {
            api.get(`/Patient/${therapistFirstName} ${name}`)
                .then(res => {
                    setAppointments(prev => ({
                        ...prev,
                        [therapistFirstName]: res.data
                    }));
                })
                .catch(() => alert('שגיאה בטעינת תורים פנויים'));
        }
    };

    return (
        <div className="specialization-details">
            <h2>מטפלים בתחום {name}</h2>
            {therapists.map((t, i) => (
                <div key={i} className="therapist-card">
                    <p><strong>{t.firstName} {t.lastName}</strong></p>
                    <p>שעות עבודה: {t.workingHours}</p>
                    <button onClick={() => toggleAppointments(t.firstName)}>
                        קבע תור
                    </button>
                    {visible[t.firstName] && appointments[t.firstName] && (
                        <table className="appointments-table">
                            <thead>
                                <tr>
                                    <th>תאריך</th>
                                    <th>שעה</th>
                                </tr>
                            </thead>
                            <tbody>
                                {appointments[t.firstName].map((a, i) => (
                                    <tr key={i}>
                                        <td>{a.date}</td>
                                        <td>{a.time}</td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    )}
                </div>
            ))}
        </div>
    );
};

export default SpecializationDetails;
