import React, { useState } from 'react';
import api from '../../services/api';
import { useNavigate } from 'react-router-dom';
import '../../css/Login.css';

const Login = () => {
  const [id, setId] = useState('');
  const navigate = useNavigate();

  const handleLogin = () => {
    if (!id.trim()) {
      alert('אנא הזן תעודת זהות');
      return;
    }

    api.get(`/Patient/${id}`)
      .then(res => {
        if (res.data) {
          localStorage.setItem('user', JSON.stringify(res.data));
          navigate('/specializations');
        } else {
          alert('משתמש לא נמצא, יש להירשם קודם');
        }
      })
      .catch(() => alert('משתמש לא נמצא, יש להירשם קודם'));
  };

  return (
    <div className="login-container">
      <h2>התחברות</h2>
      <input
        placeholder="ת.ז"
        value={id}
        onChange={e => setId(e.target.value)}
      />
      <button onClick={handleLogin}>התחבר</button>
    </div>
  );
};

export default Login;
