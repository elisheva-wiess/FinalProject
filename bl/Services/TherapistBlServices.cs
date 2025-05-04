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
    public class TherapistBlServices : ITherapistBl
    {
        private readonly ITherapistDal therapistDalServices;

        public List<BlAppointment> GetTherapistApointmentsById(string id)
        {
            var appintments= therapistDalServices.GetTherapistApointmentsById(id);
            return DalToBl.ToListAppointment(appintments);
        }

    }
}
