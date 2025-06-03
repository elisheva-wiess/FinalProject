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
            CreateMap<BlTherapistHourDto, Therapist>().ReverseMap();
            CreateMap<Therapist, BlSpecializationsTherapists>();
            CreateMap<Patient, BlPatientDto>().ReverseMap();
            CreateMap<Appointment, BlVisitSummaryDto>()
                .ForMember(dest => dest.TherapistName, opt => opt.MapFrom(src => src.Therapist.FirstName + " " + src.Therapist.LastName))
                .ForMember(dest => dest.SpecializationName,
                                   opt => opt.MapFrom(src => src.Therapist.TherapistSpecializations
                                  .Select(ts => ts.Specialization.SpecializationName)
                                  .FirstOrDefault()));
            CreateMap<Therapist, BlTherapistSalary>()
                .ForMember(dest => dest.TherapistId, opt => opt.MapFrom(src => src.TherapistsId))
                .ForMember(dest => dest.FullName, opt => opt.MapFrom(src => src.FirstName + " " + src.LastName))
                .ForMember(dest => dest.Salary, opt => opt.MapFrom(src => src.Salary));
            CreateMap<TherapistHour, BlWorkingHours>()
                .ForMember(dest => dest.DayOfWeek, opt => opt.MapFrom(src => src.DayOfWeek.ToString()))
                .ForMember(dest => dest.StartTime, opt => opt.MapFrom(src => src.StartTime))
                .ForMember(dest => dest.EndTime, opt => opt.MapFrom(src => src.EndTime))
                .ReverseMap();
        }

    }
}
