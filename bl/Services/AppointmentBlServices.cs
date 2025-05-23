using Bl.Api;
using Bl.Models;
using Dal.Api;
using Dal.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Bl.Services
{
    public class AppointmentBlServices : IAppointmentBl
    {
        private readonly IAppointmentDal appointmentDalServices;

        public AppointmentBlServices(IAppointmentDal _appointmentDalServices)
        {
            appointmentDalServices = _appointmentDalServices;
        }

        public List<AppointmentSummary> GetAppointmentsByDateRange(DateTime startDate, DateTime endDate,string specializationId)
        {
            var appointments = appointmentDalServices.GetAppointmentsByDateRange(startDate, endDate, specializationId);

            var result = appointments
                .GroupBy(a => new { a.AvailableDate.Date, a.TherapistId })
                .Select(g => new AppointmentSummary
                {
                    Date = g.Key.Date,
                    TherapistId = g.Key.TherapistId,
                    StartTime = g.Min(x => x.StartTimeSlot), // Getting the earliest time slot
                    EndTime = g.Max(x => x.EndTimeSlot) // Getting the latest time slot
                }).ToList();

            return result;
        }

        public List<AppointmentSummary> AllHourSpetificalDayAndTherapist(string idTherapist, DateTime day)
        {
            var appointments = appointmentDalServices.AllHourSpetificalDayAndTherapist(idTherapist, day);
            var result = appointments
            .Select(g => new AppointmentSummary
            {
                Date = day,
                TherapistId = idTherapist,
                StartTime = g.StartTimeSlot,
                EndTime=g.EndTimeSlot
            }).ToList();
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

            return DalToBl.ToListAppointmentRequestDto(appointments);
        }
        public List<AppointmentRequestDto> SeeAllMyAppointment(string patientId)
        {
            var appointments = appointmentDalServices.SeeAllMyAppointment(patientId);
            if (appointments == null || !appointments.Any())
            {
                throw new InvalidOperationException("No appointments found for the given patient from today onward.");
            }

            return DalToBl.ToListAppointmentRequestDto(appointments);
        }
        public void DeleteApointment(AppointmentRequestDto request)
        {
            try
            {
                appointmentDalServices.DeleteApointment(request.IdPatient, request.IdTherapist, request.Day);
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



