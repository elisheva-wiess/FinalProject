using Azure.Core;
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
    public class AppointmentDalServices : IAppointmentDal
    {
        private readonly dbClass context;

        public AppointmentDalServices(dbClass _context)
        {
            context = _context;
        }

        public List<AvailableAppointment> GetAppointmentsByDateRange(DateTime startDate, DateTime endDate, string specializationId)
        {
            var result = (from appointment in context.AvailableAppointments
                          join therapistSpecialty in context.TherapistSpecializations
                          on appointment.TherapistId equals therapistSpecialty.TherapistId
                          where appointment.AvailableDate >= startDate
                                && appointment.AvailableDate <= endDate
                                && therapistSpecialty.SpecializationId == int.Parse(specializationId)
                                && appointment.Status == false
                          select appointment).ToList();
            return result;
        }

        public List<AvailableAppointment> AllHourSpetificalDayAndTherapist(string idTherapist, DateTime day)

        {
            return context.AvailableAppointments
                .Where(th => th.TherapistId == idTherapist && th.AvailableDate.Date == day.Date)
                .ToList();
        }
        public void MakingAnAppointment(string idPatient, string idTherapist, DateTime day)
        {
            var existingAppointment = context.AvailableAppointments
                .FirstOrDefault(a => a.TherapistId == idTherapist && a.AvailableDate == day);
            if (existingAppointment == null)
            {
                throw new InvalidOperationException("The selected appointment slot is not available.");
            }
            var newAppointment = new Appointment
            {
                PatientId = idPatient,
                TherapistId = idTherapist,
                AppointmentDate = day
            };
            context.Appointments.Add(newAppointment);
            context.SaveChanges();
        }

        public List<Appointment> GetFutureAppointments(string idPatient, DateTime today)
        {
            return context.Appointments
                           .Where(a => a.PatientId == idPatient && a.AppointmentDate >= today)
                           .OrderBy(a => a.AppointmentDate)
                           .ToList();
        }
        public List<Appointment> GetPastAppointments(string patientId)
        {
            return context.Appointments.
                Where(a => a.PatientId == patientId && a.AppointmentDate <= DateTime.Now)
                  .OrderBy(a => a.AppointmentDate)
                .ToList();
        }
        public void DeleteAppointment(string IdPatient, string IdTherapist, DateTime Day)
        {
            var appointment = context.Appointments
                .FirstOrDefault(a => a.PatientId == IdPatient &&
                                     a.TherapistId == IdTherapist &&
                                     a.AppointmentDate == Day);
            if (appointment != null)
            {
                context.Appointments.Remove(appointment);
                context.SaveChanges();
            }
            else
            {
                throw new InvalidOperationException("Appointment not found.");
            }
        }
    }
}


