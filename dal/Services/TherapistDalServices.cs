using Dal.Api;
using Dal.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
namespace Dal.Services
{
    public class TherapistDalServices : ITherapistDal
    {
        private readonly dbClass context;

        public TherapistDalServices(dbClass _context)
        {
            context = _context;
        }

        public List<Appointment> GetTherapistApointmentsById(string id)
        {
            var therapists = context.Therapists.FirstOrDefault(t => t.TherapistsId == id);
            if (therapists != null)
            {
                return  context.Appointments.Where(t => t.TherapistId == therapists.TherapistsId).ToList();
            }
            else
            {
                return new List<Appointment>();
            }
        }

        public TherapistHour GetTherapistWorkingHoursById(string id)
        {
            var therapist = context.Therapists.FirstOrDefault(t => t.TherapistsId == id);
            if (therapist != null)
            {
                return context.TherapistHours.FirstOrDefault(t => t.TherapistId == id);
            }
            return null;
        }

        public Therapist GetTherapistSalaryById(string id)
        {
            var therapist = context.Therapists.FirstOrDefault(t => t.TherapistsId == id);
            if (therapist != null)
            {
                return context.Therapists.FirstOrDefault(t => t.TherapistsId == id);
            }
            return null;
        }

        //public List<TherapistHour> WorkingHoursTherapistByNameAndSpecialization(string therapistFirstName, string specializationName)
        //{
        //    var specialization = context.Specializations
        //                                 .FirstOrDefault(s => s.SpecializationName == specializationName);

        //    if (specialization == null)
        //        return new List<TherapistHour>();

        //    var therapistIdsWithSpecialization = context.TherapistSpecializations
        //                                                 .Where(ts => ts.SpecializationId == specialization.Id)
        //                                                 .Select(ts => ts.TherapistId)
        //                                                 .ToList();

        //    return context.TherapistHours
        //                   .Where(th => th.Therapist.FirstName == therapistFirstName && therapistIdsWithSpecialization.Contains(th.TherapistId))
        //                   .ToList();
        //}

    }
}

