using Dal.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Dal.Api
{
    public interface IPatientDal
    {
        public int? GetAgeById(string id);
        public string GetGenderById(string id);
        public string GetFullNameById(string id);
        public string GetHealthInsuranceById(string id);

    }
}
