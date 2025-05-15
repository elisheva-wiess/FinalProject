import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import './index.css';

// ייבוא UserProvider (נתיב יחסית לפי מבנה התיקיות שלך)
import { UserProvider } from './components/Authorization/UserContext';

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <UserProvider>
      <App />
    </UserProvider>
  </React.StrictMode>
);
