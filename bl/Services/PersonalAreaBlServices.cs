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

        public List<AppointmentDto> GetFutureAppointments(string patientId)
        {
            var appointments = _dal.GetFutureAppointments(patientId);
            return _mapper.Map<List<AppointmentDto>>(appointments);
        }

        public List<AppointmentDto> GetPastAppointments(string patientId)
        {
            var appointments = _dal.GetPastAppointments(patientId);
            return _mapper.Map<List<AppointmentDto>>(appointments);
        }

        public PatientDto GetPersonalDetails(string patientId)
        {
            var patient = _dal.GetPersonalDetails(patientId);
            return _mapper.Map<PatientDto>(patient);
        }

        public bool UpdatePersonalDetails(string patientId, PatientDto updatedDetails)
        {
            var patient = _mapper.Map<Patient>(updatedDetails);
            return _dal.UpdatePersonalDetails(patientId, patient);
        }

        public List<VisitSummaryDto> GetVisitSummaries(string patientId)
        {
            var appointments = _dal.GetVisitSummaries(patientId);

            return appointments.Select(a =>
            {
                var therapist = a.Therapist;

                // אם יש כמה ספיקליזציות - נבחר את הראשונה (או נשיב ריק)
                var specializationName = therapist.TherapistSpecializations?.FirstOrDefault()?.Specialization?.SpecializationName ?? "No Specialization";

                return new VisitSummaryDto
                {
                    AppointmentDate = a.AppointmentDate,
                    TherapistName = therapist.FirstName + " " + therapist.LastName,
                    SpecializationName = specializationName
                };
            }).ToList();
        }

    }
}
