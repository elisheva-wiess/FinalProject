import React, { useState } from 'react';
import { loginUser } from '../services/apiService'; 

const Login = () => {
  const [formData, setFormData] = useState({ username: '', password: '' });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await loginUser(formData);
      alert('כניסה הצליחה!');
    } catch (error) {
      alert('שגיאה בכניסה');
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <input type="text" name="username" onChange={handleChange} placeholder="שם משתמש" required />
      <input type="password" name="password" onChange={handleChange} placeholder="סיסמה" required />
      <button type="submit">התחבר</button>
    </form>
  );
};

export default Login;
