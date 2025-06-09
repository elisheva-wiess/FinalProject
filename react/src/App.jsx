import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';

import Navbar from './components/Layout/Header';
import Footer from './components/Layout/Footer';
import HomePage from './components/Home/HomePage';
import About from './components/Home/About';
import Login from './components/Authorization/Login';
import Register from './components/Authorization/SignUp';
import SpecializationsList from './components/Specializations/SpecializationsList';
import SpecializationDetails from './components/Specializations/SpecializationDetails';
import TherapistDetails from './components/Therapists/TherapistDetails';
import TherapistDashboard from './components/Therapists/TherapistDashboard';
import NotFound from './pages/NotFound';

import ManagerArea from './components/Areas/ManagerArea';
import TherapistArea from './components/Areas/TherapistArea';
import PatientArea from './components/Areas/PatientArea';

import { useUser } from './components/Authorization/UserContext';

const App = () => {
  const { user } = useUser();

  // פונקציה לרינדור אזור אישי לפי תפקיד המשתמש, עם ניתוב חזרה ללוגין אם לא מחובר
  const PrivateArea = () => {
    if (!user) {
      // אם לא מחובר, מפנים לעמוד הלוגין
      return <Navigate to="/login" replace />;
    }

    switch (user.role) {
      case 'manager':
        return <ManagerArea />;
      case 'therapist':
        return <TherapistArea />;
      case 'patient':
        return <PatientArea />;
      default:
        return <NotFound />;
    }
  };

  return (
    <Router>
      <Navbar />
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/about" element={<About />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/specializations" element={<SpecializationsList />} />
        <Route path="/specializations/:name" element={<SpecializationDetails />} />
        <Route path="/therapist/:id" element={<TherapistDetails />} />
        <Route path="/therapist-dashboard" element={<TherapistDashboard />} />

        {/* אזורים אישיים - רינדור דינמי לפי תפקיד */}
        <Route path="/personal-area" element={<PrivateArea />} />

        {/* ניתן להשאיר גם את הנתיבים הישירים, אבל מומלץ להחליף אותם בנתיב כללי */}
        <Route path="/manager" element={<PrivateArea />} />
        <Route path="/therapist" element={<PrivateArea />} />
        <Route path="/patient-area" element={<PrivateArea />} />

        <Route path="*" element={<NotFound />} />
      </Routes>
      <Footer />
    </Router>
  );
};

export default App;
