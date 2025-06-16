using Dal.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Dal.Api
{
    public interface IWebsiteConnectionDal
    {
        void SignUp(Patient patient);
        Patient IsPatient(string id);
        Therapist IsTherapist(string id);
        Manager IsManager(string id);
        void SignOut(string id);
    }
}
