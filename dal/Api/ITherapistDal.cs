using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using Dal.models;

namespace Dal.Api
{
    public interface ITherapistDal
    {
        List<Appointment> GetTherapistApointmentsById(string id);
    }
}
