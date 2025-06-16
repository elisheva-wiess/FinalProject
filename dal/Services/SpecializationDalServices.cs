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
    public class SpecializationDalServices : ISpecializationDal
    {
        private readonly dbClass context;

        public SpecializationDalServices(dbClass _context)
        {
            context = _context;
        }

        public List<Specialization> GetAllSpecializations()
        {
            return context.Specializations.ToList();
        }

        public List<Therapist> GetTherapistsBySpecializationName(string name)
        {
            var specialization = context.Specializations.FirstOrDefault(s => s.SpecializationName == name);

            if (specialization != null)
            {
                return context.TherapistSpecializations
                    .Where(ts => ts.SpecializationId == specialization.Id)
                    .Select(ts => ts.Therapist)
                    .Distinct()
                    .ToList();
            }
            else
            {
                return new List<Therapist>();
            }
            
        }
        public List<Specialization> GetSpecializationsByTherapistId(string therapistId)
        {
            return context.TherapistSpecializations
                .Where(ts => ts.TherapistId == therapistId)
                .Select(ts => ts.Specialization)
                .Distinct() // מסיר כפילויות
                .ToList();
        }

        public bool AddSpecialization(Specialization specialization)
        {
            try
            {
                context.Specializations.Add(specialization);
                context.SaveChanges();
                return true;
            }
            catch
            {
                return false;
            }
        }

    }
}
