using Bl.Models;
using Dal.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Bl.Api
{
    public interface IWebsiteConnectionBl
    {
        Patient SignUp(BlPatientDto patient);
        Patient IsPatient(string id);
        Therapist IsTherapist(string id);
        BlPatientOrTherapist LogIn(string id);
        public void SignOut(string id);
    }
}
