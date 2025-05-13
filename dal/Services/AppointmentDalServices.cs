using Dal.Api;
using Dal.Models;
using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Dal.Services
{
    internal class AppointmentDalServices
    {
        public class PatientDallServices : IAppointmentDalServices
        {
            private readonly dbClass _context;

            public PatientDallServices(dbClass context)
            {
                _context = context;
            }
            public List<AvailableAppointment> GetAppointmentsByDateRange(DateTime startDate, DateTime endDate)
            {
                return _context.AvailableAppointments
                               .Where(a => a.AvailableDate >= startDate && a.AvailableDate <= endDate)
                               .ToList();
            }

            public List<AvailableAppointment> AllHourSpetificalDayAndTherapist(string idTherapist, DateTime day)
            {
                return _context.AvailableAppointments
                    .Where(th => th.TherapistId == idTherapist && th.AvailableDate == day)
                    .ToList();
            }
        }
    }
}
