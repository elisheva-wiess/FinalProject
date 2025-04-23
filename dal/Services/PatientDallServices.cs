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
                return _context.Therapists.Where(t => t.Specialization == specialization).ToList();
            }
            else
            {
                return new List<Therapist>();
            }
        }
<<<<<<< HEAD
        public List<Specialization> GetAllSpecializations()
        {
            return _context.Specializations.ToList();

=======

<<<<<<< HEAD
        public List<TherapistHour> ViewTherapistsAvailableDays(string name, string specializationName)
        {
            var therapistSpecialization = _context.Specializations.FirstOrDefault(s => s.SpecializationName == specializationName);

            if (therapistSpecialization != null)
            {
                return _context.TherapistHours.Where(t => t.Therapist.FirstName == name && t.Therapist.SpecializationId == therapistSpecialization.Id).ToList();
            }
            else
            {
                return new List<TherapistHour>();
            }
=======
        public void SignUp(Patient patient)
        {
            _context.Patients.Add(patient);
            _context.SaveChanges();
        }
        public Patient LogIn(int id)
        {
            var patient = _context.Patients.FirstOrDefault(s => s.PatientsId == id);
            return patient;
>>>>>>> e110df938693e04e2103196cbb861ff195d715db
>>>>>>> 4b377af2ba8d08fc82a199a2fbafff5b1c71c153
        }
    }
}

