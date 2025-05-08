using Bl.Api;
using Bl.Models;
using Dal.Api;
using Dal.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Bl.Services
{
    public class PatientBlServices : IPatientBl
    {
        private readonly IPatientDal patientsDalServer;

        public PatientBlServices(IPatientDal _patientsDalServer)
        {
            patientsDalServer = _patientsDalServer;
        }

        public PatientOrTherapist LogIn(string id)
        {
            var patient = IsPatient(id);
            if (patient != null)
            {
                return DalToBl.IsPatient(patient);
            }
            var therapist = IsTherapist(id);
            if (therapist != null)
            {
                return DalToBl.IsTherapist(therapist);
            }
            return null;
        }

        public Patient IsPatient(string id)
        {
            return patientsDalServer.IsPatient(id);
        }
        public Therapist IsTherapist(string id)
        {
            return patientsDalServer.IsTherapist(id);
        }
        public BlPatient SingUp(Patient patient)
        {
            patientsDalServer.SignUp(patient);
            return DalToBl.ToPatient(patient);
        }

        public List<BlSpecializationsTherapists> GetSpecializationsTherapistsByName(string name)
        {
            var specializationsTherapists = patientsDalServer.GetTherapistsBySpecializationName(name);
            return DalToBl.ToListSpecializations(specializationsTherapists);
        }

        public List<BlSpecializations> GetAllSpecializations()
        {
            var AllSpecializations = patientsDalServer.GetAllSpecializations();
            return DalToBl.ToListAllSpecializations(AllSpecializations);

        }

        public List<BlAvailableAppointment> ViewTherapistsAvailableDays(string therapistFirstName, string specializationName)
        {
            var availableAppoints = patientsDalServer.ViewTherapistsAvailableDays(therapistFirstName, specializationName);
            return DalToBl.ToListAvailableAppointment(availableAppoints);
        }

        public List<AppointmentSummary> GetAvailableAppointments(DateTime startDate, DateTime endDate)
        {
            var appointments = patientsDalServer.GetAppointmentsByDateRange(startDate, endDate);

            var result = appointments
                .GroupBy(a => new { a.AvailableDate.Date, a.TherapistId })
                .Select(g => new AppointmentSummary
                {
                    Date = g.Key.Date,
                    TherapistId = g.Key.TherapistId,
                    StartTime = g.Min(x => x.TimeSlot), // Getting the earliest time slot
                    EndTime = g.Max(x => x.TimeSlot) // Getting the latest time slot
                }).ToList();

            return result;
        }

    }
}
