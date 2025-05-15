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
    public class SpecializationBlServices : ISpecializationBl
    {
        private readonly ISpecializationDal SpecializationsDalServer;

        public SpecializationBlServices(ISpecializationDal _SpecializationsDalServer)
        {
            SpecializationsDalServer = _SpecializationsDalServer;
        }

        public List<BlSpecializations> GetAllSpecializations()
        {
            var AllSpecializations = SpecializationsDalServer.GetAllSpecializations();
            return DalToBl.ToListAllSpecializations(AllSpecializations);

        }

        public List<BlSpecializationsTherapists> GetTherapistsBySpecializationName(string name)
        {
            var specializationsTherapists = SpecializationsDalServer.GetTherapistsBySpecializationName(name);
            return DalToBl.ToListSpecializations(specializationsTherapists);
        }
    }
}
