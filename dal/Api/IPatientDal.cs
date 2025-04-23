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
        public Patient LogIn(int id);
        public void SignUp(Patient patient);
    }
}
