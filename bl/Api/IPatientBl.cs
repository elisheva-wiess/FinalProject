using Bl.Models;
using Dal.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Bl.Api
{
    public interface IPatientBl
    {
        int? GetAgeById(string id);
        string? GetGenderById(string id);
        string? GetFullNameById(string id);
        string? GetHealthInsuranceById(string id);
    }
}



