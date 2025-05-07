using Bl.Models;
using Dal.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Bl.Api
{
    public interface IPatientBl
    {
        BlPatientOrTherapist LogIn(string id);
        Patient IsPatient(string id);
        Therapist IsTherapist(string id);
        BlPatient SingUp(Patient patient);
        List<BlSpecializationsTherapists> GetSpecializationsTherapistsByName(string name);
        List<BlSpecializations> GetAllSpecializations();
        List<BlAvailableAppointment> ViewTherapistsAvailableDays(string therapistFirstName, string specializationName);
    }
}
