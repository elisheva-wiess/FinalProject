using Dal.Api;
using Dal.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;


namespace Dal.Services
{
    public class PatientDalServices : IPatientDal
    {
        private readonly dbClass context;

        public PatientDalServices(dbClass _context)
        {
            context = _context;
        }
        public int? GetAgeById(string id)
        {
            var patient = context.Patients.FirstOrDefault(p => p.PatientsId == id);
            if (patient == null)
            {
                throw new InvalidOperationException("מטופל לא נמצא");
            }
            var age = DateTime.Now.Year - patient.BirthDate.Year;
            if (DateTime.Now.DayOfYear < patient.BirthDate.DayOfYear)
            {
                age--;
            }
            return age;
        }

        public string GetGenderById(string id)
        {
            var patient = context.Patients.FirstOrDefault(p => p.PatientsId == id);
            if (patient == null)
            {
                throw new InvalidOperationException("מטופל לא נמצא");
            }
            if (string.IsNullOrEmpty(patient.Gender))
            {
                throw new InvalidOperationException("מגדר לא נמצא עבור המטופל");
            }
            return patient.Gender;
        }

        public string GetFullNameById(string id)
        {
            var patient = context.Patients.FirstOrDefault(p => p.PatientsId == id);
            if (patient == null)
            {
                throw new InvalidOperationException("מטופל לא נמצא");
            }
            return $"{patient.FirstName} {patient.LastName}";
        }

        public string GetHealthInsuranceById(string id)
        {
            var patient = context.Patients.FirstOrDefault(p => p.PatientsId == id);
            if (patient == null)
            {
                throw new InvalidOperationException("מטופל לא נמצא");
            }
            if (string.IsNullOrEmpty(patient.HealthInsurance))
            {
                throw new InvalidOperationException("ביטוח בריאות לא נמצא עבור המטופל");
            }
            return patient.HealthInsurance;
        }
    }
}

