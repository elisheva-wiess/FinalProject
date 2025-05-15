using Dal.Api;
using Dal.Models;
using Microsoft.Data.SqlClient;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Dal.Services
{
    public class PatientDalServices : IPatientDal
    {
        private readonly dbClass context;

        public PatientDalServices(dbClass _context)
        {
            context = _context;
        }


    }
}

