using System;
using System.Collections.Generic;
using Bl.Models;
using Dal.Models;

namespace Bl
{
    public class DalToBl
    {
        public static BlAppointment ToAppointment(Appointment appointment)
        {
            if (appointment == null)
                return null;

            return new BlAppointment
            {
                AppointmentId = appointment.AppointmentId,
                PatientId = appointment.PatientId,
                AppointmentDate = appointment.AppointmentDate,
            };
        }

        public static List<BlAppointment> ToListAppointment(List<Appointment> appointments)
        {
            var result = new List<BlAppointment>();
            foreach (var appointment in appointments)
            {
                result.Add(ToAppointment(appointment));
            }
            return result;
        }

        public static BlSpecializationsTherapists ToSpecializations(Therapist therapist)
        {
            if (therapist == null)
                return null;

            return new BlSpecializationsTherapists
            {
                TherapistsId = therapist.TherapistsId,
                FirstName = therapist.FirstName,
                LastName = therapist.LastName,
                PhoneNumber = therapist.PhoneNumber,
                Email = therapist.Email,
                YearsOfExperience = therapist.YearsOfExperience,
            };
        }

        public static List<BlSpecializationsTherapists> ToListSpecializations(List<Therapist> therapists)
        {
            var result = new List<BlSpecializationsTherapists>();
            foreach (var therapist in therapists)
            {
                result.Add(ToSpecializations(therapist));
            }
            return result;
        }

        public static BlSpecializations ASpecialization(Specialization specialization)
        {
            if (specialization == null)
                return null;

            return new BlSpecializations
            {
                SpecializationName = specialization.SpecializationName,
                Description = specialization.Description
            };
        }

        public static List<BlSpecializations> ToListAllSpecializations(List<Specialization> specializations)
        {
            var result = new List<BlSpecializations>();
            foreach (var specialization in specializations)
            {
                result.Add(ASpecialization(specialization));
            }
            return result;
        }

        public static BlAvailableAppointment ToAvailableAppointment(TherapistHour therapistHour)
        {
            if (therapistHour == null || therapistHour.Therapist == null)
                return null;

            return new BlAvailableAppointment
            {
                TherapistFirstName = therapistHour.Therapist.FirstName,
                TherapistLastName = therapistHour.Therapist.LastName,
                DayOfWeek = therapistHour.DayOfWeek,
                StartTime = therapistHour.StartTime,
                EndTime = therapistHour.EndTime,
            };
        }

        public static List<BlAvailableAppointment> ToListAvailableAppointment(List<TherapistHour> therapistHours)
        {
            var result = new List<BlAvailableAppointment>();
            foreach (var hour in therapistHours)
            {
                result.Add(ToAvailableAppointment(hour));
            }
            return result;
        }

        public static BlPatient ToPatient(Patient patient)
        {
            if (patient == null)
                return null;

            return new BlPatient
            {
                FirstName = patient.FirstName,
                LastName = patient.LastName,
                Gender = patient.Gender
            };
        }

        public static BlTherapist ToTherapist(Therapist therapist)
        {
            if (therapist == null)
                return null;

            return new BlTherapist
            {
                TherapistsId = therapist.TherapistsId,
                FirstName = therapist.FirstName,
                LastName = therapist.LastName,
                PhoneNumber = therapist.PhoneNumber,
                Email = therapist.Email,
                YearsOfExperience = therapist.YearsOfExperience
            };
        }

        public static PatientOrTherapist IsPatient(Patient patient)
        {
            return new PatientOrTherapist
            {
                BlPatient = ToPatient(patient),
                BlTherapist = null
            };
        }

        public static PatientOrTherapist IsTherapist(Therapist therapist)
        {
            return new PatientOrTherapist
            {
                BlPatient = null,
                BlTherapist = ToTherapist(therapist)
            };
        }
    }
}
