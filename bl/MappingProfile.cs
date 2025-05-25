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
            CreateMap<AvailableAppointment, BlAppointmentSummary>().ReverseMap();
            CreateMap<Appointment, BlAppointment>().ReverseMap();
            CreateMap<AvailableAppointment, BlAvailableAppointment>().ReverseMap();
            CreateMap<TherapistHour, BlWorkingHours>().ReverseMap();
            CreateMap<Therapist, BlTherapistSalary>().ReverseMap();
            CreateMap<BlTherapistHourDto, Therapist>().ReverseMap();
            CreateMap<Therapist, BlSpecializationsTherapists>();
            CreateMap<Appointment, BlAppointmentDto>()
                   .ForMember(dest => dest.TherapistName, opt => opt.MapFrom(src => src.Therapist.FirstName + " " + src.Therapist.LastName));
            CreateMap<Patient, BlPatientDto>().ReverseMap();
            CreateMap<Appointment, BlVisitSummaryDto>()
                .ForMember(dest => dest.TherapistName, opt => opt.MapFrom(src => src.Therapist.FirstName + " " + src.Therapist.LastName))
                .ForMember(dest => dest.SpecializationName,
                                   opt => opt.MapFrom(src => src.Therapist.TherapistSpecializations
                                  .Select(ts => ts.Specialization.SpecializationName)
                                  .FirstOrDefault()));

        }
    }
}
