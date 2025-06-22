using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using Dal.Models;

namespace Dal.Api
{
    public interface ITherapistDal
    {
        List<Therapist> GetAllTherapists();
        List<Appointment> GetTherapistApointmentsById(string id);
        List<TherapistHour> GetTherapistWorkingHoursById(string therapistId);
        Therapist GetTherapistSalaryById(string id);
        bool AddTherapist(Therapist newTherapist);
        bool UpdateSalary(string therapistId, double newSalary);
        bool UpdateWorkingHours(string therapistId, List<TherapistHour> newHours);
        List<TherapistHour> GetWorkingHoursByTherapistFullNameAndSpecialization(string therapistFullName, string specializationName);
        bool AddVisitSummary(Appointment summary);
    }
}
