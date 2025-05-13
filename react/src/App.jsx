import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

import Navbar from './components/Layout/Header';
import Footer from './components/Layout/Footer';
import HomePage from './components/Home/HomePage';
import About from './components/Home/About';
import Login from './components/Authorization/Login';
import Register from './components/Authorization/Register';
import SpecializationsList from './components/Specializations/SpecializationsList';
import SpecializationDetails from './components/Specializations/SpecializationDetails';
import TherapistDetails from './components/Therapists/TherapistDetails';
import NotFound from './pages/NotFound';

const App = () => {
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
        <Route path="*" element={<NotFound />} />
      </Routes>
      <Footer />
    </Router>
  );
};

export default App;
