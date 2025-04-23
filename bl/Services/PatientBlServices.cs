using Bl.Api;
using Bl.Models;
using Dal.Api;
using Dal.models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Bl.Services
{
    internal class PatientBlServices : IPatientBl
    {
        private readonly IPatientDal patientsDalServer;

        public List<BlSpecializationsTherapists> GetSpecializationsTherapistsByName(string name)
        {
            var specializationsTherapists = patientsDalServer.GetSpecializationsTherapistsByName(name);
            return DalToBl.ToListSpecializations(specializationsTherapists);
        }
<<<<<<< HEAD

        public List<BlAvailableAppointment> ViewTherapistsAvailableDays(string name, string specializationName)
        {
            var availableAppoints = patientsDalServer.ViewTherapistsAvailableDays(name, specializationName);
            return DalToBl.ToListAvailableAppointment(availableAppoints);
        }
=======
        public BlPatient LogIn(int id)
        {
            var patient = patientsDalServer.LogIn(id);
            if (patient != null)
            {
                return DalToBl.ToPatient(patient);
            }
            else
            {
                return null;
            }
        }

        public BlPatient SingUp(Patient patient)
        {

            patientsDalServer.SignUp(patient); // הוספת המטופל ל-DAL

            return DalToBl.ToPatient(patient);
        }

>>>>>>> e110df938693e04e2103196cbb861ff195d715db
    }

}
