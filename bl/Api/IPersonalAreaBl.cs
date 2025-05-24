using Bl.Models;
using Dal.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Bl.Api
{
    public interface IPersonalAreaBl
    {
        List<AppointmentDto> GetFutureAppointments(string patientId);
        List<AppointmentDto> GetPastAppointments(string patientId);
        PatientDto GetPersonalDetails(string patientId);
        bool UpdatePersonalDetails(string patientId, PatientDto updatedDetails);
        List<VisitSummaryDto> GetVisitSummaries(string patientId);
    }
}
