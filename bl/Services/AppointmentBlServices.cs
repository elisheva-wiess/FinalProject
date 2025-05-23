using AutoMapper;
using Bl.Api;
using Bl.Models;
using Dal.Api;
using Dal.Models;
using System;
using System.Collections.Generic;
using System.Linq;

namespace Bl.Services
{
    public class AppointmentBlServices : IAppointmentBl
    {
        private readonly IAppointmentDal appointmentDalServices;
        private readonly IMapper mapper;

        public AppointmentBlServices(IAppointmentDal _appointmentDalServices, IMapper _mapper)
        {
            appointmentDalServices = _appointmentDalServices;
            mapper = _mapper;
        }

        public List<AppointmentSummary> GetAppointmentsByDateRange(DateTime startDate, DateTime endDate, string specializationId)
        {
            var appointments = appointmentDalServices.GetAppointmentsByDateRange(startDate, endDate, specializationId);

            var result = appointments
                .GroupBy(a => new { a.AvailableDate.Date, a.TherapistId })
                .Select(g => new AppointmentSummary
                {
                    Date = g.Key.Date,
                    TherapistId = g.Key.TherapistId,
                    StartTime = g.Min(x => x.StartTimeSlot),
                    EndTime = g.Max(x => x.EndTimeSlot)
                }).ToList();

            return result;
        }

        public List<AppointmentSummary> AllHourSpetificalDayAndTherapist(string idTherapist, DateTime day)
        {
            var appointments = appointmentDalServices.AllHourSpetificalDayAndTherapist(idTherapist, day);
            var result = mapper.Map<List<AppointmentSummary>>(appointments);
            return result;
        }

        public void MakingAnAppointment(AppointmentRequestDto request)
        {
            try
            {
                appointmentDalServices.MakingAnAppointment(request.IdPatient, request.IdTherapist, request.Day);
            }
            catch (InvalidOperationException ex)
            {
                throw new InvalidOperationException($"Failed to make an appointment: {ex.Message}");
            }
            catch (Exception ex)
            {
                throw new Exception($"An unexpected error occurred: {ex.Message}");
            }
        }

        public List<AppointmentRequestDto> GetAppointmentsForPatientFromToday(string idPatient, DateTime currentDate)
        {
            var appointments = appointmentDalServices.GetAppointmentsFromToday(idPatient, currentDate);
            if (appointments == null || !appointments.Any())
            {
                throw new InvalidOperationException("No appointments found for the given patient from today onward.");
            }

            return mapper.Map<List<AppointmentRequestDto>>(appointments);
        }

        public List<AppointmentRequestDto> SeeAllMyAppointment(string patientId)
        {
            var appointments = appointmentDalServices.SeeAllMyAppointment(patientId);
            if (appointments == null || !appointments.Any())
            {
                throw new InvalidOperationException("No appointments found for the given patient.");
            }

            return mapper.Map<List<AppointmentRequestDto>>(appointments);
        }

        public void DeleteAppointment(AppointmentRequestDto request)
        {
            try
            {
                appointmentDalServices.DeleteAppointment(request.IdPatient, request.IdTherapist, request.Day);
            }
            catch (InvalidOperationException ex)
            {
                throw new InvalidOperationException($"Failed to delete the appointment: {ex.Message}");
            }
            catch (Exception ex)
            {
                throw new Exception($"An unexpected error occurred: {ex.Message}");
            }
        }
    }
}