import React, { useState, useContext } from 'react';
import api from '../../services/api';
import { UserContext } from './UserContext';
import { useNavigate } from 'react-router-dom';
import '../../css/Login.css';

function Login() {
  const [id, setId] = useState('');
  const { setUser } = useContext(UserContext);
  const navigate = useNavigate();

  const handleLogin = () => {
    if (!id.trim()) {
      alert('אנא הזן תעודת זהות');
      return;
    }

    api.get(`/WebsiteConnection/Login/${id}`)
      .then(res => {
        const data = res.data;
        let userData = null;

        if (data.manager) {
          userData = { ...data.manager, role: 'manager' };
          navigate('/manager');
        } else if (data.therapist) {
          userData = { ...data.therapist, role: 'therapist' };
          navigate('/therapist-dashboard');
        } else if (data.patient) {
          userData = { ...data.patient, role: 'patient' };
          navigate('/patient-area');
        } else {
          alert('משתמש לא נמצא');
          return;
        }

        localStorage.setItem('user', JSON.stringify(userData));
        setUser(userData);
      })
      .catch(err => {
        console.error('שגיאה בעת התחברות:', err);
        alert('שגיאה בעת התחברות');
      });
  };

  return (
    <div className="login-container">
      <h1>התחברות</h1>
      <input
        type="text"
        placeholder="תעודת זהות"
        value={id}
        onChange={(e) => setId(e.target.value)}
      />
      <button onClick={handleLogin}>התחבר</button>
    </div>
  );
}

export default Login;
