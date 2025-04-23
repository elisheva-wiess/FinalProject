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
<<<<<<< HEAD

        List<TherapistHour> ViewTherapistsAvailableDays(string name, string specializationName);
=======
        public Patient LogIn(int id);
        public void SignUp(Patient patient);
>>>>>>> e110df938693e04e2103196cbb861ff195d715db
    }
}
