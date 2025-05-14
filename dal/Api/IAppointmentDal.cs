using Dal.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Dal.Api
{
    public interface IAppointmentDal
    {
        public List<AvailableAppointment> GetAppointmentsByDateRange(DateTime startDate, DateTime endDate);
        public List<AvailableAppointment> AllHourSpetificalDayAndTherapist(string idTherapist, DateTime day);
    }
}
