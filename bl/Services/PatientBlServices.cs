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
    public class PatientBlServices : IPatientBl
    {
        private readonly IPatientDal patientsDalServer;

        public PatientBlServices(IPatientDal _patientsDalServer)
        {
            patientsDalServer = _patientsDalServer;
        }


    }
}
