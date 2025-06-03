using AutoMapper;
using Bl.Api;
using Bl.Models;
using Dal.Api;
using Dal.Models;
using System.Collections.Generic;
using System.Linq;

namespace Bl.Services
{
    public class PersonalAreaBlServices : IPersonalAreaBl
    {
        private readonly IPersonalAreaDal _dal;
        private readonly IMapper _mapper;

        public PersonalAreaBlServices(IPersonalAreaDal dal, IMapper mapper)
        {
            _dal = dal;
            _mapper = mapper;
        }

        public BlPatientDto GetPersonalDetails(string patientId)
        {
            var patient = _dal.GetPersonalDetails(patientId);
            return _mapper.Map<BlPatientDto>(patient);
        }

        public bool UpdatePersonalDetails(string patientId, BlPatientDto updatedDetails)
        {
            var patient = _mapper.Map<Patient>(updatedDetails);
            return _dal.UpdatePersonalDetails(patientId, patient);
        }

        public List<BlVisitSummaryDto> GetVisitSummaries(string patientId)
        {
            var appointments = _dal.GetVisitSummaries(patientId);

            return appointments.Select(a =>
            {
                var therapist = a.Therapist;

                // אם יש כמה ספיקליזציות - נבחר את הראשונה (או נשיב ריק)
                var specializationName = therapist.TherapistSpecializations?.FirstOrDefault()?.Specialization?.SpecializationName ?? "No Specialization";

                return new BlVisitSummaryDto
                {
                    AppointmentDate = a.AppointmentDate,
                    TherapistName = therapist.FirstName + " " + therapist.LastName,
                    SpecializationName = specializationName
                };
            }).ToList();
        }

    }
}
