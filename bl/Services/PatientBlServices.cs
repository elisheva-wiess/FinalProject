using AutoMapper;
using Bl.Api;
using Dal.Api;
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

        public int? GetAgeById(string id)
        {
            // לא נדרש חישוב גיל, כבר מחושב ב-DAL
            return patientsDalServer.GetAgeById(id);
        }

        public string GetGenderById(string id)
        {
            var gender = patientsDalServer.GetGenderById(id);
            return string.IsNullOrEmpty(gender) ? "Unknown" : gender;
        }

        public string GetFullNameById(string id)
        {
            var fullName = patientsDalServer.GetFullNameById(id);
            return string.IsNullOrEmpty(fullName) ? "Unknown" : fullName;
        }

        public string GetHealthInsuranceById(string id)
        {
            var hi = patientsDalServer.GetHealthInsuranceById(id);
            return string.IsNullOrEmpty(hi) ? "Unknown" : hi;
        }
    }
}
