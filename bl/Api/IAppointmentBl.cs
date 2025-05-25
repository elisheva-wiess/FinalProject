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
        public List<BlAppointmentSummary> GetAppointmentsByDateRange(DateTime startDate, DateTime endDate,string specializationId);
        public List<BlAppointmentSummary> AllHourSpetificalDayAndTherapist(string idTherapist, DateTime day);
        public void MakingAnAppointment(BlAppointmentRequestDto appointmentRequestDto);
        public List<BlAppointmentRequestDto> GetAppointmentsForPatientFromToday(string idPatient, DateTime currentDate);
        public List<BlAppointmentRequestDto> SeeAllMyAppointment(string patientId);
        public void DeleteAppointment(BlAppointmentRequestDto request);
    }
}
