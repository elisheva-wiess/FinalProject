
import axios from "axios";

const BASE_URL = "/api/";

export const api = axios.create({
  baseURL: BASE_URL,
});

export const WebsiteConnection = {
  signUp: (patient) => api.post("WebsiteConnection/SignUp", patient),
  signOut: (id) => api.delete(`WebsiteConnection/SignOut/${id}`),
  login: (id) => api.get(`WebsiteConnection/Login/${id}`),
  getUser: (id) => api.get(`WebsiteConnection/getUser/${id}`),
};

// Therapists
export const Therapist = {
  getAppointments: (id) => api.get(`Therapist/GetTherapistApointmentsById`, { params: { id } }),
  getWorkingHours: (id) => api.get(`Therapist/GetTherapistWorkingHoursById/${id}`),
  getSalary: (id) => api.get(`Therapist/GetTherapistSalaryById`, { params: { id } }),
  addTherapist: (data) => api.post(`Therapist/AddTherapist`, data),
  updateSalary: (therapistId, newSalary) => api.put(`Therapist/UpdateSalary`, null, { params: { therapistId, newSalary } }),
  updateWorkingHours: (therapistId, newHours) => api.put(`Therapist/UpdateWorkingHours`, newHours, { params: { therapistId } }),
  getWorkingHoursByFullNameAndSpecialization: (therapistFullName, specializationName) =>
    api.get(`Therapist/GetWorkingHoursByTherapistFullNameAndSpecialization/${therapistFullName}/${specializationName}`),
  addVisitSummary: (summaryDto) => api.post(`Therapist/AddVisitSummary`, summaryDto),
};

// Specializations
export const Specialization = {
  getAll: () => api.get("Specialization/GetAllSpecializations"),
  getTherapistsByName: (name) => api.get("Specialization/GetTherapistsBySpecializationName", { params: { name } }),
  getByTherapist: (therapistId) => api.get(`Specialization/GetSpecializationsByTherapistId/${therapistId}`),
  add: (specializationDto) => api.post(`Specialization/AddSpecialization`, specializationDto),
};

// Personal Area
export const PersonalArea = {
  getVisitSummaries: (patientId) => api.get("PersonalArea/VisitSummaries", { params: { patientId } }),
  getPersonalDetails: (patientId) => api.get("PersonalArea/GetPersonalDetails", { params: { patientId } }),
  updatePersonalDetails: (updatedDetails) => api.put("PersonalArea/UpdatePersonalDetails", updatedDetails),
};

// Patient
export const Patient = {
  getAgeById: (id) => api.get(`Patient/GetAgeById/${id}`),
  getGenderById: (id) => api.get(`Patient/GetGenderById/${id}`),
  getNameById: (id) => api.get(`Patient/GetNameById/${id}`),
  getHealthInsuranceById: (id) => api.get(`Patient/GetHealthInsuranceById/${id}`),
};

// Appointments
export const Appointment = {
  getAvailableAppointments: (specializationId) =>
    api.get("Appointment/GetAvailableAppointments", { params: { specializationId } }),
  allHourSpecificDayAndTherapist: (idTherapist, day) =>
    api.get("Appointment/AllHourSpetificalDayAndTherapist", { params: { idTherapist, day } }),
  makeAppointment: (request) => api.post("Appointment/MakingAnAppointment", request),
  getPastAppointments: (patientId) => api.get("Appointment/GetPastAppointments", { params: { patientId } }),
  getFutureAppointments: (idPatient) => api.get(`Appointment/GetFutureAppointments/${idPatient}`),
  deleteAppointment: (request) => api.delete("Appointment/DeleteAppointment", { data: request }),
};

