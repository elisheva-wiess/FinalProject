import React, { useEffect, useState } from 'react';
import api from '../../services/api';
import { useNavigate } from 'react-router-dom';
import { useUser } from '../Authorization/UserContext';
import '../../css/SpecializationsList.css';

const SpecializationsList = () => {
  const [specializations, setSpecializations] = useState([]);
  const navigate = useNavigate();
  const { user } = useUser();

  // אם המשתמש לא מחובר - ננווט לדף התחברות
  useEffect(() => {
    if (!user) {
      navigate('/login'); // או נתיב אחר לעמוד התחברות
    }
  }, [user, navigate]);

  // הבאת ההתמחויות מהשרת
  useEffect(() => {
    api
      .get('/Specialization/GetAllSpecializations')
      .then((res) => setSpecializations(res.data))
      .catch(() => alert('שגיאה בטעינת ההתמחויות'));
  }, []);

  return (
    <div className="specializations-container">
      {user && (
        <h2>
          שלום, {user.firstName} {user.lastName}
        </h2>
      )}
      <h3>בחר התמחות</h3>

      <div className="specializations-grid">
        {specializations.map((s, i) => (
          <div
            key={i}
            className="specialization-card"
            onClick={() => navigate(`/specializations/${s.specializationName}`)}
          >
            <h3>{s.specializationName}</h3>
            <p>{s.description}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default SpecializationsList;
