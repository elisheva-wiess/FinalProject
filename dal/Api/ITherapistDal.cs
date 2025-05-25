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
        List<Appointment> GetTherapistApointmentsById(string id);
        TherapistHour GetTherapistWorkingHoursById(string id);
        Therapist GetTherapistSalaryById(string id);
        bool AddTherapist(Therapist newTherapist);
        bool UpdateSalary(string therapistId, double newSalary);
        bool UpdateWorkingHours(string therapistId, List<TherapistHour> newHours);
        //List<TherapistHour> WorkingHoursTherapistByNameAndSpecialization(string therapistFirstName, string specializationName);
    }
}
