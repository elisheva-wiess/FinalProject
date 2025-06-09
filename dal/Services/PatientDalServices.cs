using Dal.Api;
using Dal.Models;
using System;
using System.Linq;

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
            if (patient == null || patient.BirthDate == default)
                return null;

            var age = DateTime.Now.Year - patient.BirthDate.Year;
            if (DateTime.Now.DayOfYear < patient.BirthDate.DayOfYear)
                age--;

            return age;
        }

        public string GetGenderById(string id)
        {
            var patient = context.Patients.FirstOrDefault(p => p.PatientsId == id);
            return patient?.Gender ?? string.Empty;
        }

        public string GetFullNameById(string id)
        {
            var patient = context.Patients.FirstOrDefault(p => p.PatientsId == id);
            if (patient == null || string.IsNullOrEmpty(patient.FirstName) || string.IsNullOrEmpty(patient.LastName))
                return string.Empty;

            return $"{patient.FirstName} {patient.LastName}";
        }

        public string GetHealthInsuranceById(string id)
        {
            var patient = context.Patients.FirstOrDefault(p => p.PatientsId == id);
            return patient?.HealthInsurance ?? string.Empty;
        }
    }
}
