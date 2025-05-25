using AutoMapper;
using Bl.Api;
using Bl.Models;
using Dal.Api;
using Dal.Models;
using System;
using System.Collections.Generic;

namespace Bl.Services
{
    public class TherapistBlServices : ITherapistBl
    {
        private readonly ITherapistDal therapistDal;
        private readonly IMapper mapper;

        public TherapistBlServices(ITherapistDal _therapistDal, IMapper _mapper)
        {
            therapistDal = _therapistDal;
            mapper = _mapper;
        }

        public List<BlAppointment> GetTherapistApointmentsById(string id)
        {
            var appointments = therapistDal.GetTherapistApointmentsById(id);
            return mapper.Map<List<BlAppointment>>(appointments);
        }

        public BlWorkingHours GetTherapistWorkingHoursById(string id)
        {
            if (string.IsNullOrWhiteSpace(id))
                throw new ArgumentException("Invalid therapist ID.");

            var hours = therapistDal.GetTherapistWorkingHoursById(id);
            return hours == null ? null : mapper.Map<BlWorkingHours>(hours);
        }

        public BlTherapistSalary GetTherapistSalaryById(string id)
        {
            if (string.IsNullOrWhiteSpace(id))
                throw new ArgumentException("Invalid therapist ID.");

            var salary = therapistDal.GetTherapistSalaryById(id);
            return salary == null ? null : mapper.Map<BlTherapistSalary>(salary);
        }

        public bool AddTherapist(Therapist newTherapist)
        {
            if (newTherapist == null)
                return false;

            var therapistEntity = mapper.Map<Therapist>(newTherapist);
            return therapistDal.AddTherapist(therapistEntity);
        }

        public bool UpdateSalary(string therapistId, double newSalary)
        {
            if (string.IsNullOrWhiteSpace(therapistId) || newSalary < 0)
                return false;

            return therapistDal.UpdateSalary(therapistId, newSalary);
        }

        public bool UpdateWorkingHours(string therapistId, List<BlTherapistHourDto> newHours)
        {
            if (string.IsNullOrWhiteSpace(therapistId) || newHours == null)
                return false;

            var hoursEntities = mapper.Map<List<TherapistHour>>(newHours);
            return therapistDal.UpdateWorkingHours(therapistId, hoursEntities);
        }


        //public List<BlAvailableAppointment> WorkingHoursTherapistByNameAndSpecialization(string therapistFirstName, string specializationName)
        //{
        //    var availableAppoints = therapistDal.WorkingHoursTherapistByNameAndSpecialization(therapistFirstName, specializationName);
        //    return mapper.Map.<BlAvailableAppointment> (availableAppoints);
        //}
    }
}
