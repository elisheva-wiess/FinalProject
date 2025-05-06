import axios from 'axios';

const API_URL = 'http://localhost:7102'; // עדכון ל-URL הנכון

// פונקציה לרישום משתמש
export const registerUser = async (userData) => {
  try {
    const response = await axios.post(`${API_URL}/Patient`, userData);
    return response.data; // החזרת נתוני המשתמש שנרשם
  } catch (error) {
    console.error("Error during registration:", error);
    throw error; // טיפול בשגיאות
  }
};

// פונקציה להתחברות משתמש
export const loginUser = async (userData) => {
  try {
    const response = await axios.post(`${API_URL}/Patient/login`, userData); // עדכון לנתיב ההתחברות
    return response.data; // החזרת נתוני המשתמש המחובר
  } catch (error) {
    console.error("Error during login:", error);
    throw error; // טיפול בשגיאות
  }
};

// פונקציה לקבלת רשימת מטפלים
export const getTherapists = async () => {
  try {
    const response = await axios.get(`${API_URL}/therapist`); // עדכון לנתיב הנכון
    return response.data; // החזרת רשימת המטפלים
  } catch (error) {
    console.error("Error fetching therapists:", error);
    throw error; // טיפול בשגיאות
  }
};

// פונקציה לקבלת מינויים של מטפל לפי מזהה
export const getTherapistAppointments = async (id) => {
  try {
    const response = await axios.get(`${API_URL}/therapist/${id}/appointments`); // עדכון לנתיב הנכון
    return response.data; // החזרת רשימת המינויים
  } catch (error) {
    console.error("Error fetching therapist appointments:", error);
    throw error; // טיפול בשגיאות
  }
};
