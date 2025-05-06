using Bl.Api;
using Bl.Services;
using Dal;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Bl
{
    public class BlManager : IBlManager
    {
        public IPatientBl patientBl{ get; }

        public BlManager(IDalManager dalManager)
        {
            patientBl = new PatientBlServices(dalManager.patientDal);
        }
    }
}

