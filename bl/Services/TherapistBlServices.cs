using AutoMapper;
using Bl.Api;
using Bl.Models;
using Dal.Api;
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

        //public List<BlAvailableAppointment> WorkingHoursTherapistByNameAndSpecialization(string therapistFirstName, string specializationName)
        //{
        //    var availableAppoints = therapistDal.WorkingHoursTherapistByNameAndSpecialization(therapistFirstName, specializationName);
        //    return mapper.Map.<BlAvailableAppointment> (availableAppoints);
        //}
    }
}
