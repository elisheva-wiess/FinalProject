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
        public Patient LogIn(int id);
        Patient IsPatient(int id);
        Therapist IsTherapist(int id);
        public void SignUp(Patient patient);
    }
}
