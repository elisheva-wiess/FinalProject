using AutoMapper;
using Bl.Api;
using Bl.Models;
using Dal.Api;
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
        private readonly IMapper mapper;

        public AppointmentBlServices(IAppointmentDal _appointmentDalServices, IMapper _mapper)
        {
            appointmentDalServices = _appointmentDalServices;
            mapper = _mapper;
        }

        public List<AppointmentSummary> GetAppointmentsByDateRange(DateTime startDate, DateTime endDate)
        {
            var appointments = appointmentDalServices.GetAppointmentsByDateRange(startDate, endDate);

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
            //בדיקה tryוכו'
            //return new AppointmentSummary
            //{
            //    Date = day,
            //    TherapistId = idTherapist,
            //    StartTime = appointments.

            //};
            return null;

        }
    }
}


