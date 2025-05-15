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

        public TherapistBlServices(ITherapistDal therapistDal)
        {
            therapistDalServices = therapistDal;
        }

        public List<BlAppointment> GetTherapistApointmentsById(string id)
        {
            var appintments = therapistDalServices.GetTherapistApointmentsById(id);
            return DalToBl.ToListAppointment(appintments);
        }

        public BlWorkingHours GetTherapistWorkingHoursById(string id)
        {
            if (string.IsNullOrWhiteSpace(id))
                throw new ArgumentException("Invalid therapist ID.");

            var workingHours = therapistDalServices?.GetTherapistWorkingHoursById(id);
            if (workingHours == null)
                return null;

            return DalToBl.ToWorkingHours(workingHours);
        }

        public BlTherapistSalary GetTherapistSalaryById(string id)
        {
            if (string.IsNullOrWhiteSpace(id))
                throw new ArgumentException("Invalid therapist ID.");

            var therapistSalary = therapistDalServices?.GetTherapistSalaryById(id);
            if (therapistSalary == null)
                return null;

            return DalToBl.ToTherapistSalary(therapistSalary);
        }

        //public List<BlAvailableAppointment> WorkingHoursTherapistByNameAndSpecialization(string therapistFirstName, string specializationName)
        //{
        //    var availableAppoints = therapistDalServices.WorkingHoursTherapistByNameAndSpecialization(therapistFirstName, specializationName);
        //    return DalToBl.ToListAvailableAppointment(availableAppoints);
        //}

    }
}



//using AutoMapper;
//using Bl.Api;
//using Bl.Models;
//using Dal.Api;
//using System;
//using System.Collections.Generic;

//namespace Bl.Services
//{
//    public class TherapistBlServices : ITherapistBl
//    {
//        private readonly ITherapistDal therapistDalServices;
//        private readonly IMapper mapper;

//        public TherapistBlServices(ITherapistDal therapistDal, IMapper _mapper)
//        {
//            therapistDalServices = therapistDal;
//            mapper = _mapper;
//        }

//        public List<BlAppointment> GetTherapistAppointmentsById(string id)
//        {
//            var appointments = therapistDalServices.GetTherapistAppointmentsById(id);
//            return mapper.Map<List<BlAppointment>>(appointments);
//        }

//        public BlWorkingHours GetTherapistWorkingHoursById(string id)
//        {
//            if (string.IsNullOrWhiteSpace(id))
//                throw new ArgumentException("Invalid therapist ID.");

//            var workingHours = therapistDalServices?.GetTherapistWorkingHoursById(id);
//            if (workingHours == null)
//                return null;

//            return mapper.Map<BlWorkingHours>(workingHours);
//        }

//        public BlTherapistSalary GetTherapistSalaryById(string id)
//        {
//            if (string.IsNullOrWhiteSpace(id))
//                throw new ArgumentException("Invalid therapist ID.");

//            var therapistSalary = therapistDalServices?.GetTherapistSalaryById(id);
//            if (therapistSalary == null)
//                return null;

//            return mapper.Map<BlTherapistSalary>(therapistSalary);
//        }
//    }
//}