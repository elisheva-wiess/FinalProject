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
    internal class TherapistBlServices : ITherapistBl
    {
        private readonly ITherapistDal therapistDalServices;

        public List<BlAppointment> GetTherapistApointmentsById(int id)
        {
            var appintments= therapistDalServices.GetTherapistApointmentsById(id);
            return DalToBl.ToListAppointment(appintments);
        }
    }
}
