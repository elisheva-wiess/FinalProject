using Bl.Models;
using Dal.models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Bl.Api
{
    public interface IPatientBl
    {
        List<BlSpecializationsTherapists> GetSpecializationsTherapistsByName(string name);
<<<<<<< HEAD
        List<BlSpecializations> GetAllSpecializations();
=======
<<<<<<< HEAD

        List<BlAvailableAppointment> ViewTherapistsAvailableDays(string name, string specializationName);
=======
        BlPatient LogIn(int id);
        BlPatient SingUp(Patient patient);

>>>>>>> e110df938693e04e2103196cbb861ff195d715db
>>>>>>> 4b377af2ba8d08fc82a199a2fbafff5b1c71c153
    }
}
