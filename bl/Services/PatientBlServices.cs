using Bl.Api;
using Bl.Models;
using Dal.Api;
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
    }

}
