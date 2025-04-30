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

        List<BlSpecializations> GetAllSpecializations();

        List<BlAvailableAppointment> ViewTherapistsAvailableDays(string name, string specializationName);
        PatientOrTherapist LogIn(int id);
        Patient IsPatient(int id);
        Therapist IsTherapist(int id);
        BlPatient SingUp(Patient patient);

    }
}
