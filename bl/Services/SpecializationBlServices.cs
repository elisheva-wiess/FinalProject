using AutoMapper;
using Bl.Api;
using Bl.Models;
using Dal.Api;
using Dal.Models;
using System.Collections.Generic;

namespace Bl.Services
{
    public class SpecializationBlServices : ISpecializationBl
    {
        private readonly ISpecializationDal specializationsDal;
        private readonly IMapper mapper;

        public SpecializationBlServices(ISpecializationDal _specializationsDal, IMapper _mapper)
        {
            specializationsDal = _specializationsDal;
            mapper = _mapper;
        }

        public List<BlSpecializations> GetAllSpecializations()
        {
            var allSpecializations = specializationsDal.GetAllSpecializations();
            return mapper.Map<List<BlSpecializations>>(allSpecializations);
        }

        public List<BlSpecializationsTherapists> GetTherapistsBySpecializationName(string name)
        {
            var specTherapists = specializationsDal.GetTherapistsBySpecializationName(name);
            return mapper.Map<List<BlSpecializationsTherapists>>(specTherapists);
        }
        public List<BlSpecializations> GetSpecializationsByTherapistId(string therapistId)
        {
            var specializations = specializationsDal.GetSpecializationsByTherapistId(therapistId);
            return mapper.Map<List<BlSpecializations>>(specializations);
        }
    }
}
