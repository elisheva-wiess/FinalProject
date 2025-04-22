using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using Bl.Models;
using Dal.models;

namespace Bl
{
    class DalToBl
    {
        public static BlAppointment ToAppointment(Appointment appointment)
        {
            if (appointment != null)
            {
                return new BlAppointment
                {
                    AppointmentId = appointment.AppointmentId,
                    PatientId = appointment.PatientId,
                    AppointmentDate = appointment.AppointmentDate,

                };
            }
            else
                return null;
        }
        public static List<BlAppointment> ToListAppointment(List<Appointment> appointment)
        {
            List<BlAppointment> appointments = new List<BlAppointment>();

            foreach (var item in appointment)
            {
                var appoint = ToAppointment(item);
                appointments.Add(appoint);
            }
            return appointments;
        }


        public static BlSpecializationsTherapists ToSpecializations(Therapist therapist)
        {
            if (therapist != null)
            {
                return new BlSpecializationsTherapists
                {
                    TherapistsId = therapist.TherapistsId,
                    FirstName = therapist.FirstName,
                    LastName = therapist.LastName,
                    SpecializationId = therapist.SpecializationId,
                    PhoneNumber = therapist.PhoneNumber,
                    Email = therapist.Email,
                    YearsOfExperience = therapist.YearsOfExperience,
                };
            }
            else
                return null;
        }

        public static List<BlSpecializationsTherapists> ToListSpecializations(List<Therapist> therapist)
        {
            List<BlSpecializationsTherapists> therapists = new List<BlSpecializationsTherapists>();

            foreach (var item in therapist)
            {
                var therap = ToSpecializations(item);
                therapists.Add(therap);
            }
            return therapists;
        }
    }
}
