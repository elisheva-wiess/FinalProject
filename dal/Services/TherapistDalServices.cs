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
        private readonly dbClass _context;

        public TherapistDalServices(dbClass context)
        {
            _context = context;
        }

        public List<Appointment> GetTherapistApointmentsById(string id)
        {
            var therapists = _context.Therapists.FirstOrDefault(t => t.TherapistsId == id);
            if (therapists != null)
            {
                return _context.Appointments.Where(t => t.TherapistId == therapists.TherapistsId).ToList();
            }
            else
            {
                return new List<Appointment>();
            }
        }

        public TherapistHour GetTherapistWorkingHoursById(string id)
        {
            var therapist = _context.Therapists.FirstOrDefault(t => t.TherapistsId == id);
            if (therapist != null)
            {
                return _context.TherapistHours.FirstOrDefault(t => t.TherapistId == id);
            }
            return null;
        }

        public Therapist GetTherapistSalaryById(string id)
        {
            var therapist = _context.Therapists.FirstOrDefault(t => t.TherapistsId == id);
            if (therapist != null)
            {
                return _context.Therapists.FirstOrDefault(t => t.TherapistsId == id);
            }
            return null;
        }


    }
}

