using Bl.Models;
using Dal.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Bl.Api
{
    public interface IAppointmentBl
    {
        public List<AppointmentSummary> GetAppointmentsByDateRange(DateTime startDate, DateTime endDate,string specializationId);
        public List<AppointmentSummary> AllHourSpetificalDayAndTherapist(string idTherapist, DateTime day);
        public void MakingAnAppointment(AppointmentRequestDto appointmentRequestDto);
        public List<AppointmentRequestDto> GetAppointmentsForPatientFromToday(string idPatient, DateTime currentDate);
        public List<AppointmentRequestDto> SeeAllMyAppointment(string patientId);
        public void DeleteApointment(AppointmentRequestDto request);
    }
}
