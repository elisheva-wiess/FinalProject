using Dal.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Dal.Api
{
    public interface IPersonalAreaDal
    {
        Patient GetPersonalDetails(string patientId);
        bool UpdatePersonalDetails(string patientId, Patient updatedDetails);
        List<Appointment> GetVisitSummaries(string patientId);
    }
}
