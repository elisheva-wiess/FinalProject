import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import '../../css/SignUp.css';

export default function SignUp() {
  const [user, setUser] = useState({
    firstName: '',
    lastName: '',
    idNumber: '',
    birthDate: '',
    gender: '',
    email: '',
    phone: '',
    address: '',
    insurance: '',
  });

  const [errors, setErrors] = useState({});
  const navigate = useNavigate();

  const requiredFields = ['firstName', 'lastName', 'idNumber', 'birthDate', 'phone', 'insurance'];

  const getHebrewLabel = (fieldName) => {
    const labels = {
      firstName: 'שם פרטי',
      lastName: 'שם משפחה',
      idNumber: 'תעודת זהות',
      birthDate: 'תאריך לידה',
      gender: 'מגדר',
      email: 'אימייל',
      phone: 'מספר טלפון',
      address: 'כתובת',
      insurance: 'קופת חולים',
    };
    return labels[fieldName] || fieldName;
  };

  const getAutoComplete = (field) => {
    const map = {
      email: 'email',
      phone: 'tel',
      firstName: 'given-name',
      lastName: 'family-name',
      birthDate: 'bday',
      idNumber: 'off',
      gender: 'off',
      address: 'street-address',
      insurance: 'off',
    };
    return map[field] || 'off';
  };

  const handleRegister = async () => {
    const newErrors = {};
    requiredFields.forEach((field) => {
      if (!user[field]) {
        newErrors[field] = 'שדה זה חובה';
      }
    });

    setErrors(newErrors);

    if (Object.keys(newErrors).length === 0) {
      try {
        const response = await fetch('/api/entry/signup', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(user),
        });

        if (!response.ok) {
          const errorText = await response.text();
          throw new Error(errorText || 'שגיאה בשרת');
        }

        const data = await response.json();

        localStorage.setItem('loggedInUser', JSON.stringify(data));

        alert('נרשמת בהצלחה!');
        navigate('/specializations');
      } catch (error) {
        alert('אירעה שגיאה בעת ההרשמה: ' + error.message);
      }
    }
  };

  return (
    <div className="register-container">
      <h2 className="register-title">טופס הרשמה</h2>
      <form className="form-grid" onSubmit={(e) => e.preventDefault()}>
        {Object.entries(user).map(([key, value]) => (
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
              type={key === 'birthDate' ? 'date' : 'text'}
              onChange={(e) => setUser({ ...user, [key]: e.target.value })}
              className={errors[key] ? 'error-input' : ''}
            />
            {errors[key] && <span className="error-text">{errors[key]}</span>}
          </div>
        ))}

        <div className="button-wrapper">
          <button type="button" onClick={handleRegister}>הירשם</button>
        </div>
      </form>
    </div>
  );
}
