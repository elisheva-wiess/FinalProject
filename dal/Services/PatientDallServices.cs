using Dal.Api;
using Dal.models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Dal.Services
{
    internal class PatientDallServices : IPatientDal
    {
        private readonly dbClass _context;

        public PatientDallServices(dbClass context)
        {
            _context = context;
        }

        public List<Therapist> GetSpecializationsTherapistsByName(string name)
        {
            var specialization = _context.Specializations.FirstOrDefault(s => s.SpecializationName == name);

            if (specialization != null)
            {
                return _context.Therapists
                    .Where(t => t.SpecializationId == specialization.Id)
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

        //public List<TherapistHour> ViewTherapistsAvailableDays(string name, string specializationName)
        //{
        //    var therapistSpecialization = _context.Specializations.FirstOrDefault(s => s.SpecializationName == specializationName);

        //    if (therapistSpecialization != null)
        //    {
        //        return _context.TherapistHours.Where(t => t.Therapist.FirstName == name && t.Therapist.SpecializationId == therapistSpecialization.Id).ToList();
        //    }
        //    else
        //    {
        //        return new List<TherapistHour>();
        //    }
        //}

        public List<TherapistHour> ViewTherapistsAvailableDays(string name, string specializationName)
        {
            var therapistSpecialization = _context.Specializations.FirstOrDefault(s => s.SpecializationName == specializationName);

            return therapistSpecialization == null
                ? new List<TherapistHour>()
                : _context.TherapistHours
                          .Where(t => t.Therapist.FirstName == name && t.Therapist.SpecializationId == therapistSpecialization.Id)
                          .ToList();
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
      public  Patient IsPatient(string id)
        {
            var patient = _context.Patients.FirstOrDefault(s => s.PatientsId == id);
            return patient;
        }
     public   Therapist IsTherapist(string id)
        {
            var therapist = _context.Therapists.FirstOrDefault(s => s.TherapistsId == id);
            return therapist;
        }

    }
}

