using Dal.Api;
using Dal.Models;

namespace Dal.Services
{
    public class PersonalAreaDalServices : IPersonalAreaDal
    {
        private readonly dbClass context;

        public PersonalAreaDalServices(dbClass _context)
        {
            context = _context;
        }

        public List<Appointment> GetFutureAppointments(string patientId)
        {
            return context.Appointments
                .Where(a => a.PatientId == patientId && a.AppointmentDate > DateTime.Now)
                .ToList();
        }

        public List<Appointment> GetPastAppointments(string patientId)
        {
            return context.Appointments
                .Where(a => a.PatientId == patientId && a.AppointmentDate <= DateTime.Now)
                .ToList();
        }

        public Patient GetPersonalDetails(string patientId)
        {
            return context.Patients.FirstOrDefault(p => p.PatientsId == patientId)!;
        }

        public bool UpdatePersonalDetails(string patientId, Patient updatedDetails)
        {
            var existing = context.Patients.FirstOrDefault(p => p.PatientsId == patientId);
            if (existing == null) return false;

            existing.FirstName = updatedDetails.FirstName;
            existing.LastName = updatedDetails.LastName;
            existing.BirthDate = updatedDetails.BirthDate;
            existing.Address = updatedDetails.Address;
            existing.Gender = updatedDetails.Gender;
            existing.PhoneNumber = updatedDetails.PhoneNumber;
            existing.Email = updatedDetails.Email;
            existing.HealthInsurance = updatedDetails.HealthInsurance;

            context.SaveChanges();
            return true;
        }

        public List<Appointment> GetVisitSummaries(string patientId)
        {
            return context.Appointments
                .Where(a => a.PatientId == patientId && a.AppointmentDate <= DateTime.Now)
                .ToList();
        }
    }
}
