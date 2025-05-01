using Dal.models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Dal.Api
{
    public interface IPatientDal
    {     
        List<Therapist> GetSpecializationsTherapistsByName(string name);
        List<Specialization> GetAllSpecializations();
        List<TherapistHour> ViewTherapistsAvailableDays(string name, string specializationName);
        public Patient LogIn(string id);
        Patient IsPatient(string id);
        Therapist IsTherapist(string id);
        public void SignUp(Patient patient);
    }
}
