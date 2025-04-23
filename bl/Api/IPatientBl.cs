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

        List<BlAvailableAppointment> ViewTherapistsAvailableDays(string name, string specializationName);
=======
        BlPatient LogIn(int id);
        BlPatient SingUp(Patient patient);

>>>>>>> e110df938693e04e2103196cbb861ff195d715db
    }
}
