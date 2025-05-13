import React, { useState } from 'react';
import api from '../../services/api';
import { useNavigate } from 'react-router-dom';
import '../../css/Register.css';

const Register = () => {
  const [user, setUser] = useState({
    patientsId: '',
    firstName: '',
    lastName: '',
    birthDate: '',
    address: '',
    gender: '',
    phoneNumber: '',
    email: '',
    healthInsurance: ''
  });
  const navigate = useNavigate();

  const handleRegister = () => {
    api.post('/Patient', user)
      .then(() => {
        alert('נרשמת בהצלחה!');
        navigate('/login');
      })
      .catch(() => alert('שגיאה בהרשמה'));
  };

  return (
    <div className="register-container">
      <h2>הרשמה</h2>
      {Object.entries(user).map(([key, val]) => (
        <input
          key={key}
          placeholder={key}
          type={key === 'birthDate' ? 'date' : 'text'}
          onChange={e => setUser({ ...user, [key]: e.target.value })}
        />
      ))}
      <button onClick={handleRegister}>הירשם</button>
    </div>
  );
};

export default Register;
