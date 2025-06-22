using AutoMapper;
using Bl.Api;
using Bl.Models;
using Dal.Api;
using Dal.Models;
using Microsoft.EntityFrameworkCore;
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

        public List<BlTherapistDto> GetAllTherapists()
        {
            var allTherapists = therapistDal.GetAllTherapists();
            return mapper.Map<List<BlTherapistDto>>(allTherapists);
        }

        public List<BlAppointment> GetTherapistApointmentsById(string id)
        {
            var appointments = therapistDal.GetTherapistApointmentsById(id);
            return mapper.Map<List<BlAppointment>>(appointments);
        }

        public List<BlTherapistHourDto> GetTherapistWorkingHoursById(string id)
        {
            var dalHours = therapistDal.GetTherapistWorkingHoursById(id); 
            return mapper.Map<List<BlTherapistHourDto>>(dalHours);
        }

        public BlTherapistSalary GetTherapistSalaryById(string id)
        {
            if (string.IsNullOrWhiteSpace(id))
                throw new ArgumentException("Invalid therapist ID.");

            var therapist = therapistDal.GetTherapistSalaryById(id);
            return therapist == null ? null : mapper.Map<BlTherapistSalary>(therapist);
        }

        public bool AddTherapist(BlTherapist newTherapist)
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


        public List<BlTherapistHourDto> GetWorkingHoursByTherapistFullNameAndSpecialization(string therapistFullName, string specializationName)
        {
            var availableAppoints = therapistDal.GetWorkingHoursByTherapistFullNameAndSpecialization(therapistFullName, specializationName);
            return mapper.Map<List<BlTherapistHourDto>>(availableAppoints); 
        }
        

        public bool AddVisitSummary(BlVisitSummaryDto summaryDto)
        {
            try
            {
                var entity = mapper.Map<Appointment>(summaryDto);
                return therapistDal.AddVisitSummary(entity);
            }
            catch
            {
                return false;
            }
        }

    }
}
