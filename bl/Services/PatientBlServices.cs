using AutoMapper;
using Bl.Api;
using Bl.Models;
using Dal.Api;
using Dal.Models;
using System;

namespace Bl.Services
{
    public class PatientBlServices : IPatientBl
    {
        private readonly IPatientDal patientsDalServer;
        private readonly IMapper mapper;

        public PatientBlServices(IPatientDal _patientsDalServer, IMapper _mapper)
        {
            patientsDalServer = _patientsDalServer;
            mapper = _mapper;
        }

        public int GetAgeById(string id)
        {
            var age = patientsDalServer.GetAgeById(id); // Get the age as an integer
            if (age == null)
            {
                throw new InvalidOperationException("Age not found for the given patient ID.");
            }
            return age.Value; // Return the calculated age
        }
        public string GetGenderById(string id)
        {
            var gender = patientsDalServer.GetGenderById(id);
            if (gender == null)
            {
                throw new InvalidOperationException("Gender not found for the given patient ID.");
            }
            return gender;
        }

        public string GetFullNameById(string id)
        {
            var fullName = patientsDalServer.GetFullNameById(id);
            if (string.IsNullOrEmpty(fullName))
            {
                throw new InvalidOperationException("Full name not found for the given patient ID.");
            }
            return fullName;
        }

        public string GetHealthInsuranceById(string id)
        {
            var healthInsurance = patientsDalServer.GetHealthInsuranceById(id);
            if (string.IsNullOrEmpty(healthInsurance))
            {
                throw new InvalidOperationException("Health insurance not found for the given patient ID.");
            }
            return healthInsurance;
        }
    }
}