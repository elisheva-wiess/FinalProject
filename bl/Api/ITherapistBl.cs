using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using Bl.Models;
using Dal.Api;
namespace Bl.Api
{
    public interface ITherapistBl
    {
        List<BlAppointment> GetTherapistApointmentsById(string id);
    }
}
