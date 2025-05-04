using Dal.Api;
using Dal.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Dal.Services
{
    public class PatientDallServices : IPatientDal
    {
        private readonly dbClass _context;

        public PatientDallServices(dbClass context)
        {
            _context = context;
        }

        public void SignUp(Patient patient)
        {
            _context.Patients.Add(patient);
            _context.SaveChanges();
        }

        public Patient LogIn(string id)
        {
            var patient = _context.Patients.FirstOrDefault(s => s.PatientsId == id);
            return patient;

        }
        public Patient IsPatient(string id)
        {
            var patient = _context.Patients.FirstOrDefault(s => s.PatientsId == id);
            return patient;
        }
        public Therapist IsTherapist(string id)
        {
            var therapist = _context.Therapists.FirstOrDefault(s => s.TherapistsId == id);
            return therapist;
        }

        public List<Therapist> GetTherapistsBySpecializationName(string name)
        {
            var specialization = _context.Specializations.FirstOrDefault(s => s.SpecializationName == name);

            if (specialization != null)
            {
                return _context.TherapistSpecializations
                    .Where(ts => ts.SpecializationId == specialization.Id)
                    .Select(ts => ts.Therapist)
                    .Distinct()
                    .ToList();
            }
            else
            {
                return new List<Therapist>();
            }
        }

        public List<Specialization> GetAllSpecializations()
        {
            return _context.Specializations.ToList();
        }

        public List<TherapistHour> ViewTherapistsAvailableDays(string name, string specializationName)
        {
            var specialization = _context.Specializations
                                         .FirstOrDefault(s => s.SpecializationName == specializationName);

            if (specialization == null)
                return new List<TherapistHour>();

            var therapistIdsWithSpecialization = _context.TherapistSpecializations
                                                         .Where(ts => ts.SpecializationId == specialization.Id)
                                                         .Select(ts => ts.TherapistId)
                                                         .ToList();

            return _context.TherapistHours
                           .Where(th => th.Therapist.FirstName == name && therapistIdsWithSpecialization.Contains(th.TherapistId))
                           .ToList();
        }


    }
}

