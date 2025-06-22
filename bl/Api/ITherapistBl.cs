using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using Bl.Models;
using Dal.Api;
using Dal.Models;
using Microsoft.AspNetCore.Mvc;
namespace Bl.Api
{
    public interface ITherapistBl
    {
        List<BlTherapistDto> GetAllTherapists();
        List<BlAppointment> GetTherapistApointmentsById(string id);
        List<BlTherapistHourDto> GetTherapistWorkingHoursById(string id);
        BlTherapistSalary GetTherapistSalaryById(string id);
        bool AddTherapist(BlTherapist newTherapist);
        bool UpdateSalary(string therapistId, double newSalary);
        bool UpdateWorkingHours(string therapistId, List<BlTherapistHourDto> newHours);
        List<BlTherapistHourDto> GetWorkingHoursByTherapistFullNameAndSpecialization(string therapistFullName, string specializationName);
        bool AddVisitSummary(BlVisitSummaryDto summaryDto);
    }
}
