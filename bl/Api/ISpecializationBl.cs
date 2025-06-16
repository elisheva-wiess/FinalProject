using Bl.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Bl.Api
{
    public interface ISpecializationBl
    {
        List<BlSpecializationDto> GetAllSpecializations();
        List<BlSpecializationsTherapists> GetTherapistsBySpecializationName(string name);
        List<BlSpecializationDto> GetSpecializationsByTherapistId(string therapistId);
        bool AddSpecialization(BlSpecializationDto specializationDto);
    }
}
