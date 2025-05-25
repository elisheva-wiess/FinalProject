using Dal.Api;
using Dal.Models;
using Microsoft.EntityFrameworkCore;
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

        public bool AddTherapist(Therapist newTherapist)
        {
            context.Therapists.Add(newTherapist);
            return context.SaveChanges() > 0;
        }

        public bool UpdateSalary(string therapistId, double newSalary)
        {
            var therapist = context.Therapists.FirstOrDefault(t => t.TherapistsId == therapistId);
            if (therapist == null)
                return false;

            therapist.Salary = newSalary;
            return context.SaveChanges() > 0;
        }

        public bool UpdateWorkingHours(string therapistId, List<TherapistHour> newHours)
        {
            var existingHours = context.TherapistHours.Where(h => h.TherapistId == therapistId).ToList();

            if (!existingHours.Any())
                return false;

            // כאן ניתן להחליף או לעדכן לפי הצורך, לדוגמה:
            context.TherapistHours.RemoveRange(existingHours);
            context.TherapistHours.AddRange(newHours);

            return context.SaveChanges() > 0;
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

