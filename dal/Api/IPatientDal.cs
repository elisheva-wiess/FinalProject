using Dal.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Dal.Api
{
    public interface IPatientDal
    {
        public Patient LogIn(string id);
        Patient IsPatient(string id);
        Therapist IsTherapist(string id);
        public void SignUp(Patient patient);
        List<Therapist> GetTherapistsBySpecializationName(string name);
        List<Specialization> GetAllSpecializations();
        List<TherapistHour> ViewTherapistsAvailableDays(string therapistFirstName, string specializationName);
    }
}
