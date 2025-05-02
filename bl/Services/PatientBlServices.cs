using Bl.Api;
using Bl.Models;
using Dal.Api;
using Dal.Models;
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
            var specializationsTherapists = patientsDalServer.GetTherapistsBySpecializationName(name);
            return DalToBl.ToListSpecializations(specializationsTherapists);
        }
        public List<BlAvailableAppointment> ViewTherapistsAvailableDays(string name, string specializationName)
        {
            var availableAppoints = patientsDalServer.ViewTherapistsAvailableDays(name, specializationName);
            return DalToBl.ToListAvailableAppointment(availableAppoints);
        }


        public PatientOrTherapist LogIn(string id)
        {
            var patient = IsPatient(id);
            if (patient != null)
            {
                return DalToBl.IsPatient(patient);
            }
            var therapist = IsTherapist(id);
            if (therapist != null)
            {
                return DalToBl.IsTherapist(therapist);
            }
            return null;
        }

        public Patient IsPatient(string id)
        {
            return patientsDalServer.IsPatient(id);
        }
        public Therapist IsTherapist(string id)
        {
            return patientsDalServer.IsTherapist(id);
        }
        public BlPatient SingUp(Patient patient)
        {
            patientsDalServer.SignUp(patient);
            return DalToBl.ToPatient(patient);
        }

        public List<BlSpecializations> GetAllSpecializations()
        {
            var AllSpecializations = patientsDalServer.GetAllSpecializations();
            return DalToBl.ToListAllSpecializations(AllSpecializations);

        }

    }
}
