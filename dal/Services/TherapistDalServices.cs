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

        public List<TherapistHour> GetTherapistWorkingHoursById(string therapistId)
        {
            if (string.IsNullOrWhiteSpace(therapistId))
                return new List<TherapistHour>();

            return context.TherapistHours
                .Where(th => th.TherapistId == therapistId)
                .Include(th => th.Therapist)
                .Include(th => th.Therapist.TherapistSpecializations)
                    .ThenInclude(ts => ts.Specialization)
                .ToList();
        }

        public Therapist GetTherapistSalaryById(string id)
        {
            return context.Therapists
                .FirstOrDefault(t => t.TherapistsId == id);
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

            context.TherapistHours.RemoveRange(existingHours);
            context.TherapistHours.AddRange(newHours);

            return context.SaveChanges() > 0;
        }

        public List<TherapistHour> GetWorkingHoursByTherapistFullNameAndSpecialization(string therapistFullName, string specializationName)
        {
            if (string.IsNullOrWhiteSpace(therapistFullName) || string.IsNullOrWhiteSpace(specializationName))
                return new List<TherapistHour>();

            // פיצול השם המלא
            var nameParts = therapistFullName.Split(' ', StringSplitOptions.RemoveEmptyEntries);
            if (nameParts.Length < 2)
                return new List<TherapistHour>(); // אין שם פרטי ומשפחה

            var firstName = nameParts[0];
            var lastName = nameParts[1];

            // מציאת התמחות
            var specialization = context.Specializations.FirstOrDefault(s => s.SpecializationName == specializationName);
            if (specialization == null)
                return new List<TherapistHour>();

            // מציאת כל המטפלים בהתמחות
            var therapistIdsWithSpecialization = context.TherapistSpecializations
                .Where(ts => ts.SpecializationId == specialization.Id)
                .Select(ts => ts.TherapistId)
                .ToList();

            // החזרת שעות העבודה של המטפל
            return context.TherapistHours
                .Where(th => th.Therapist.FirstName == firstName &&
                             th.Therapist.LastName == lastName &&
                             therapistIdsWithSpecialization.Contains(th.TherapistId))
                .Include(th => th.Therapist) // כדי שיהיה אפשר למפות שם
                .Include(th => th.Therapist.TherapistSpecializations)
                    .ThenInclude(ts => ts.Specialization)
                .ToList();
        }

    }
}

