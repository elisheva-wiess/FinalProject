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
    public class PatientDallServices : IPatientDal
    {
        private readonly dbClass context;

        public PatientDallServices(dbClass _context)
        {
            context = _context;
        }


    }
}

