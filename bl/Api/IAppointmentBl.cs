using Bl.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Bl.Api
{
    public interface IAppointmentBl
    {
        public List<AppointmentSummary> GetAppointmentsByDateRange(DateTime startDate, DateTime endDate);
        public List<AppointmentSummary> AllHourSpetificalDayAndTherapist(string idTherapist, DateTime day);
    }
}
