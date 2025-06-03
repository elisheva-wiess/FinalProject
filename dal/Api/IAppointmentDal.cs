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
        public List<AvailableAppointment> GetAppointmentsByDateRange(DateTime startDate, DateTime endDate, string specializationId);
        public List<AvailableAppointment> AllHourSpetificalDayAndTherapist(string idTherapist, DateTime day);
        public void MakingAnAppointment(string idPatient, string idTherapist, DateTime day);
        public List<Appointment> GetFutureAppointments(string idPatient, DateTime today);
        public List<Appointment> GetPastAppointments(string patientId);
        public void DeleteAppointment(string IdPatient, string IdTherapist, DateTime Day);
    }
}
