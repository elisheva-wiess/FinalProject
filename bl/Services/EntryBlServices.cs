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
    public class EntryBlServices : IEntryBl
    {
        private readonly IEntryDal entrysDalServer;

        public EntryBlServices(IEntryDal _entrysDalServer)
        {
            entrysDalServer = _entrysDalServer;
        }

        public BlPatient SingUp(Patient patient)
        {
            entrysDalServer.SignUp(patient);
            return DalToBl.ToPatient(patient);
        }
        public void SignOut(string id)
        {
            entrysDalServer.SignOut(id);



        }

        public Patient IsPatient(string id)
        {
            return entrysDalServer.IsPatient(id);
        }

        public Therapist IsTherapist(string id)
        {
            return entrysDalServer.IsTherapist(id);
        }

        public BlPatientOrTherapist LogIn(string id)
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

    }
}
