import React, { useContext } from 'react';
import { UserContext } from '../Authorization/UserContext';

function TherapistDashboard() {
  const { user } = useContext(UserContext);

  if (!user || !user.therapist) {
    return <div>אין גישה - יש להתחבר כמטפל</div>;
  }

  const therapist = user.therapist;

  return (
    <div style={{ padding: '20px' }}>
      <h1>ברוך הבא, {therapist.firstName} {therapist.lastName}</h1>
      <p>מספר טלפון: {therapist.phoneNumber}</p>
      <p>דוא"ל: {therapist.email || 'לא סופק'}</p>
      <p>שנות ניסיון: {therapist.yearsOfExperience ?? 'לא ידוע'}</p>
      
      {/* הוסף כאן מידע נוסף ופעולות רלוונטיות למטפל */}
    </div>
  );
}

export default TherapistDashboard;
