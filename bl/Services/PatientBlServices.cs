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

    }

}
