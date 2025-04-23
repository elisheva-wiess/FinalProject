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

<<<<<<< HEAD
        public static BlAvailableAppointment ToAvailableAppointment(TherapistHour therapistHour)
        {
            if (therapistHour != null)
            {
                return new BlAvailableAppointment
                {
                    TherapistFirstName = therapistHour.Therapist.FirstName,
                    TherapistLastName = therapistHour.Therapist.LastName,
                    DayOfWeek = therapistHour.DayOfWeek,
                    StartTime = therapistHour.StartTime,
                    EndTime = therapistHour.EndTime,
                };
            }
            else
                return null;
        }


        public static List<BlAvailableAppointment> ToListAvailableAppointment(List<TherapistHour> therapistHour)
        {
            List<BlAvailableAppointment> availableAppointments = new List<BlAvailableAppointment>();

            foreach (var item in therapistHour)
            {
                var availableAppoint = ToAvailableAppointment(item);
                availableAppointments.Add(availableAppoint);
            }
            return availableAppointments;
=======
        public static BlPatient ToPatient(Patient patient)
        {
            return new BlPatient
            {
                FirstName = patient.FirstName,
                LastName = patient.LastName,
                Gender = patient.Gender
            };
>>>>>>> e110df938693e04e2103196cbb861ff195d715db
        }
    }

}