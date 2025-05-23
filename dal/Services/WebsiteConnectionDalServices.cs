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

        public void SignOut(string id)
        {
            var patient = context.Patients.FirstOrDefault(s => s.PatientsId == id);

            if (patient == null)
            {
                throw new ArgumentException("Patient not found.", nameof(id)); // Handle not found
            }

            context.Patients.Remove(patient);
            context.SaveChanges();

            Console.WriteLine("Patient deleted successfully!");
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

