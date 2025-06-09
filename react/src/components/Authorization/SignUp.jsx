import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useUser } from '../Authorization/UserContext';
import api from '../../services/api';
import '../../css/SignUp.css';

export default function SignUp() {
  const [userDetails, setUserDetails] = useState({
    patientsId: '',           
    firstName: '',
    lastName: '',
    birthDate: '',
    gender: '',
    email: '',
    phoneNumber: '',         
    address: '',
    healthInsurance: '',      
  });

  const [errors, setErrors] = useState({});
  const navigate = useNavigate();
  const { setUser } = useUser();

  const requiredFields = [
    'firstName',
    'lastName',
    'patientsId',
    'birthDate',
    'phoneNumber',
    'healthInsurance',
  ];

  const getHebrewLabel = (fieldName) => {
    const labels = {
      firstName: 'שם פרטי',
      lastName: 'שם משפחה',
      patientsId: 'תעודת זהות',
      birthDate: 'תאריך לידה',
      gender: 'מגדר',
      email: 'אימייל',
      phoneNumber: 'מספר טלפון',
      address: 'כתובת',
      healthInsurance: 'קופת חולים',
    };
    return labels[fieldName] || fieldName;
  };

  const getAutoComplete = (field) => {
    const map = {
      email: 'email',
      phoneNumber: 'tel',
      firstName: 'given-name',
      lastName: 'family-name',
      birthDate: 'bday',
      patientsId: 'off',
      gender: 'off',
      address: 'street-address',
      healthInsurance: 'off',
    };
    return map[field] || 'off';
  };

  const handleRegister = async () => {
    const newErrors = {};
    requiredFields.forEach((field) => {
      if (!userDetails[field]) {
        newErrors[field] = 'שדה זה חובה';
      }
    });

    setErrors(newErrors);

    if (Object.keys(newErrors).length === 0) {
      try {
        const { data } = await api.post('/WebsiteConnection/signup', userDetails);

        // שמירה גם בקונטקסט וגם ב-localStorage
        const userWithRole = {
          role: data.role || 'patient',
          ...data.user || data
        };

        setUser(userWithRole);
        localStorage.setItem('user', JSON.stringify(userWithRole));

        alert('נרשמת בהצלחה!');
        navigate('/specializations');
      } catch (error) {
        const msg = error.response?.data || error.message || 'שגיאה לא ידועה';
        alert('אירעה שגיאה בעת ההרשמה: ' + msg);
        console.error('Signup failed:', error);
      }
    }
  };

  return (
    <div className="register-container">
      <h2 className="register-title">טופס הרשמה</h2>
      <form className="form-grid" onSubmit={(e) => e.preventDefault()}>
        {Object.entries(userDetails).map(([key, value]) => (
          <div className="input-group" key={key}>
            <label htmlFor={key}>
              {getHebrewLabel(key)}
              {requiredFields.includes(key) && <span className="required-star"> *</span>}
            </label>
            <input
              id={key}
              name={key}
              autoComplete={getAutoComplete(key)}
              value={value}
              type={
                key === 'birthDate' ? 'date' :
                key === 'email' ? 'email' :
                key === 'phoneNumber' ? 'tel' :
                'text'
              }
              onChange={(e) => setUserDetails({ ...userDetails, [key]: e.target.value })}
              className={errors[key] ? 'error-input' : ''}
            />
            {errors[key] && <span className="error-text">{errors[key]}</span>}
          </div>
        ))}

        <div className="button-wrapper">
          <button type="button" onClick={handleRegister}>
            הירשם
          </button>
        </div>
      </form>
    </div>
  );
}
