using Dal.Api;
using Dal.Models;
using Dal.Services;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Dal
{
    public class DalManager:IDalManager
    {
        public IPatientDal patientDal{ get; }

        private readonly dbClass _context;
        public DalManager()
        {
            _context = new dbClass();
            patientDal =new PatientDallServices(_context);
        }
    }
}
