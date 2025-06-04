using Dal.Api;
using Dal.Models;
using Microsoft.Data.SqlClient;
using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Dal.Services
{
    public class WebsiteConnectionDalServices : IWebsiteConnectionDal
    {
        private readonly dbClass context;

        public WebsiteConnectionDalServices(dbClass _context)
        {
            context = _context;
        }

        public void SignUp(Patient patient)
        {
            context.Patients.Add(patient);
            context.SaveChanges();
        }

        /*public void SignOut(string id)
        {
            var patient = context.Patients.FirstOrDefault(s => s.PatientsId == id);
            var therapist = context.Therapists.FirstOrDefault(s => s.TherapistsId == id);
            if (patient == null && therapist == null)
            {
                throw new ArgumentException("User not found.", nameof(id)); // Handle not found
            }
            if (patient != null)
            {
                context.Patients.Remove(patient);
                context.SaveChanges();
            }
            if (therapist != null)
            {

                // מחיקת רשומות בטבלת פגישות הקשורות למטפל
                var therapistAppointments = context.Appointments.Where(a => a.TherapistId == id).ToList();
                context.Appointments.RemoveRange(therapistAppointments);
                // מחיקת המטפל
                context.Therapists.Remove(therapist);
                var therapistSpecializations = context.TherapistSpecializations.Where(ts => ts.TherapistId == id).ToList();
                context.TherapistSpecializations.RemoveRange(therapistSpecializations);
                // מחיקת המטפל
                context.Therapists.Remove(therapist);



                context.SaveChanges();
            }


            Console.WriteLine("user deleted successfully!");
        }*/
        public void SignOut(string id)
        {
            using var transaction = context.Database.BeginTransaction(); // התחלת טרנזקציה
            try
            {
                // בדיקת האם המשתמש הוא מטופל
                var patient = context.Patients.FirstOrDefault(s => s.PatientsId == id);
                if (patient != null)
                {
                    context.Patients.Remove(patient);
                    context.SaveChanges();
                }

                // בדיקת האם המשתמש הוא מטפל
                var therapist = context.Therapists.FirstOrDefault(s => s.TherapistsId == id);
                if (therapist != null)
                {
                    // מחיקת רשומות בטבלת TherapistHours
                    var therapistHours = context.TherapistHours.Where(th => th.TherapistId == id).ToList();
                    context.TherapistHours.RemoveRange(therapistHours);

                    // מחיקת רשומות בטבלת פגישות הקשורות למטפל
                    var therapistAppointments = context.Appointments.Where(a => a.TherapistId == id).ToList();
                    context.Appointments.RemoveRange(therapistAppointments);

                    // מחיקת רשומות בטבלת TherapistSpecialization
                    var therapistSpecializations = context.TherapistSpecializations.Where(ts => ts.TherapistId == id).ToList();
                    context.TherapistSpecializations.RemoveRange(therapistSpecializations);

                    // מחיקת המטפל עצמו
                    context.Therapists.Remove(therapist);
                    context.SaveChanges();
                }

                transaction.Commit(); // סיום טרנזקציה
                Console.WriteLine("User deleted successfully!");
            }
            catch (Exception ex)
            {
                transaction.Rollback(); // ביטול טרנזקציה במקרה של שגיאה
                Console.WriteLine($"Error: {ex.Message}");
            }
        }

        public Patient IsPatient(string id)
        {
            var patient = context.Patients.FirstOrDefault(s => s.PatientsId == id);
            return patient;
        }
        public Therapist IsTherapist(string id)
        {
            var therapist = context.Therapists.FirstOrDefault(s => s.TherapistsId == id);
            return therapist;
        }

        public Patient LogIn(string id)
        {
            var patient = context.Patients.FirstOrDefault(s => s.PatientsId == id);
            return patient;

        }

    }
}