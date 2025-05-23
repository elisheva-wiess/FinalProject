using Dal.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Dal.Api
{
    public interface IEntryDal
    {
        public void SignUp(Patient patient);
        Patient IsPatient(string id);
        Therapist IsTherapist(string id);
        public Patient LogIn(string id);
        public void SignOut(string id);
    }
}
