using AutoMapper;
using Dal.Models;
using Bl.Models;

namespace Bl
{
    public class MappingProfile : Profile
    {
        public MappingProfile()
        {
            CreateMap<Patient, BlPatient>().ReverseMap();
            CreateMap<Therapist, BlTherapist>().ReverseMap();
            CreateMap<Specialization, BlSpecializations>().ReverseMap();
            CreateMap<AvailableAppointment, AppointmentSummary>().ReverseMap();
            CreateMap<Appointment, BlAppointment>().ReverseMap();
            CreateMap<AvailableAppointment, BlAvailableAppointment>().ReverseMap();
            CreateMap<TherapistHour, BlWorkingHours>().ReverseMap();
            CreateMap<Therapist, BlTherapistSalary>().ReverseMap();
            CreateMap<Therapist, BlSpecializationsTherapists>();
        }
    }
}
