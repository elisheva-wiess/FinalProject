//using AutoMapper;
//using Dal.Models;
//using System;
//using System.Collections.Generic;
//using System.Linq;
//using System.Text;
//using System.Threading.Tasks;
//using static System.Runtime.InteropServices.JavaScript.JSType;

//namespace Bl
//{
//    public class Mapper : Profile
//    {
//        public Mapper()
//        {
//            CreateMap<Dal.Models.Patient, Bl.Models.BlPatient>().ReverseMap();

//            CreateMap<Dal.Models.Therapist, Bl.Models.BlTherapist>().ReverseMap();

//            CreateMap<Dal.Models.Specialization, Bl.Models.BlSpecializations>().ReverseMap();

//            CreateMap<Dal.Models.AvailableAppointment, Bl.Models.AppointmentSummary>().ReverseMap();

//            CreateMap<Dal.Models.Appointment, Bl.Models.BlAppointment>().ReverseMap();

//            CreateMap<Dal.Models.AvailableAppointment, Bl.Models.BlAvailableAppointment>().ReverseMap();

//            CreateMap<Dal.Models.Specialization, Bl.Models.BlSpecializationsTherapists>().ReverseMap();

//            CreateMap<Dal.Models.TherapistHour, Bl.Models.BlWorkingHours>().ReverseMap();

//            CreateMap<Dal.Models.Therapist, Bl.Models.BlTherapistSalary>().ReverseMap();
//        }
//    }
//}
