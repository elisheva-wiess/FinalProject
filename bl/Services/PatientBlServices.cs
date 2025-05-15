using Bl.Api;
using Bl.Models;
using Dal.Api;
using Dal.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Bl.Services
{
    public class PatientBlServices : IPatientBl
    {
        private readonly IPatientDal patientsDalServer;

        public PatientBlServices(IPatientDal _patientsDalServer)
        {
            patientsDalServer = _patientsDalServer;
        }


    }
}



//using AutoMapper;
//using Bl.Api;
//using Bl.Models;
//using Dal.Api;
//using Dal.Models;
//using System;
//using System.Collections.Generic;
//using System.Linq;

//namespace Bl.Services
//{
//    public class PatientBlServices : IPatientBl
//    {
//        private readonly IPatientDal patientsDalServer;
//        private readonly IMapper mapper;

//        public PatientBlServices(IPatientDal _patientsDalServer, IMapper _mapper)
//        {
//            patientsDalServer = _patientsDalServer;
//            mapper = _mapper;
//        }

//        public BlPatientOrTherapist LogIn(string id)
//        {
//            var patient = IsPatient(id);
//            if (patient != null)
//            {
//                return mapper.Map<BlPatientOrTherapist>(patient);
//            }
//            var therapist = IsTherapist(id);
//            if (therapist != null)
//            {
//                return mapper.Map<BlPatientOrTherapist>(therapist);
//            }
//            return null;
//        }

//        public Dal.Models.Patient IsPatient(string id)
//        {
//            return patientsDalServer.IsPatient(id);
//        }

//        public Dal.Models.Therapist IsTherapist(string id)
//        {
//            return patientsDalServer.IsTherapist(id);
//        }

//        public BlPatient SingUp(Dal.Models.Patient patient)
//        {
//            patientsDalServer.SignUp(patient);
//            return mapper.Map<BlPatient>(patient);
//        }

//        public List<BlSpecializationsTherapists> GetSpecializationsTherapistsByName(string name)
//        {
//            var specializationsTherapists = patientsDalServer.GetTherapistsBySpecializationName(name);
//            return mapper.Map<List<BlSpecializationsTherapists>>(specializationsTherapists);
//        }

//        public List<BlSpecializations> GetAllSpecializations()
//        {
//            var AllSpecializations = patientsDalServer.GetAllSpecializations();
//            return mapper.Map<List<BlSpecializations>>(AllSpecializations);
//        }

//        public List<BlAvailableAppointment> ViewTherapistsAvailableDays(string therapistFirstName, string specializationName)
//        {
//            var availableAppoints = patientsDalServer.ViewTherapistsAvailableDays(therapistFirstName, specializationName);
//            return mapper.Map<List<BlAvailableAppointment>>(availableAppoints);
//        }

//        public List<AppointmentSummary> GetAvailableAppointments(DateTime startDate, DateTime endDate)
//        {
//            var appointments = patientsDalServer.GetAppointmentsByDateRange(startDate, endDate);

//            var result = appointments
//                .GroupBy(a => new { a.AvailableDate.Date, a.TherapistId })
//                .Select(g => new AppointmentSummary
//                {
//                    Date = g.Key.Date,
//                    TherapistId = g.Key.TherapistId,
//                    StartTime = g.Min(x => x.TimeSlot), // Getting the earliest time slot
//                    EndTime = g.Max(x => x.TimeSlot) // Getting the latest time slot
//                }).ToList();

//            return result;
//        }
//    }
//}