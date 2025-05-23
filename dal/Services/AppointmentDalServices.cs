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
    public class AppointmentDalServices : IAppointmentDal
    {
        private readonly dbClass context;

        public AppointmentDalServices(dbClass _context)
        {
            context = _context;
        }

        public List<AvailableAppointment> GetAppointmentsByDateRange(DateTime startDate, DateTime endDate)
        {
            return context.AvailableAppointments
                           .Where(a => a.AvailableDate >= startDate && a.AvailableDate <= endDate)
                           .ToList();
        }

        public List<AvailableAppointment> AllHourSpetificalDayAndTherapist(string idTherapist, DateTime day)
        {
            return context.AvailableAppointments
                .Where(th => th.TherapistId == idTherapist && th.AvailableDate == day)
                .ToList();
        }
    }
}

