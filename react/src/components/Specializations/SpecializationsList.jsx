// components/Specializations/SpecializationsList.jsx
import React, { useEffect, useState } from 'react';
import api from '../../services/api';
import { useNavigate } from 'react-router-dom';
import '../../css/SpecializationsList.css';

const SpecializationsList = () => {
  const [specializations, setSpecializations] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    api.get('/Patient/GetAllSpecializations')
      .then(res => setSpecializations(res.data))
      .catch(() => alert('שגיאה בטעינת ההתמחויות'));
  }, []);

  return (
    <div className="specializations-container">
      <h2>בחר התמחות</h2>
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
