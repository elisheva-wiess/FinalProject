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

        public void SignUp(Patient patient)
        {
            _context.Patients.Add(patient);
            _context.SaveChanges();
        }
        public Patient LogIn(int id)
        {
            var patient = _context.Patients.FirstOrDefault(s => s.PatientsId == id);
            return patient;
        }
    }
}

