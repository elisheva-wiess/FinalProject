import React, { useState } from 'react';
import { registerUser } from '../services/apiService'; 

const Register = () => {
  const [formData, setFormData] = useState({ username: '', password: '' });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await registerUser(formData);
      alert('הרשמה הצליחה!');
    } catch (error) {
      alert('שגיאה בהרשמה');
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <input type="text" name="username" onChange={handleChange} placeholder="שם משתמש" required />
      <input type="password" name="password" onChange={handleChange} placeholder="סיסמה" required />
      <button type="submit">הרשם</button>
    </form>
  );
};

export default Register;
