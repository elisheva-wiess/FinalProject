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
            CreateMap<Therapist, BlTherapistDto>()
                .ForMember(dest => dest.Specializations, opt => opt.MapFrom(src =>
                    src.TherapistSpecializations
                        .Select(ts => ts.Specialization.SpecializationName)
                        .Distinct())) 
                .ReverseMap();
            CreateMap<Specialization, BlSpecializationDto>().ReverseMap();
            CreateMap<BlVisitSummaryDto, Appointment>().ReverseMap();
            CreateMap<BlSpecializationDto, Specialization>().ReverseMap();
            CreateMap<AvailableAppointment, BlAppointmentSummary>()
                 .ForMember(dest => dest.Date, opt => opt.MapFrom(src => src.AvailableDate))
                 .ForMember(dest => dest.StartTime, opt => opt.MapFrom(src => src.StartTimeSlot))
                 .ForMember(dest => dest.EndTime, opt => opt.MapFrom(src => src.EndTimeSlot))
                 .ReverseMap();
            CreateMap<Appointment, BlAppointment>().ReverseMap();
            CreateMap<Therapist, BlSpecializationsTherapists>();
            CreateMap<Patient, BlPatientDto>().ReverseMap();
            CreateMap<Appointment, BlVisitSummaryDto>()
                .ForMember(dest => dest.TherapistName, opt => opt.MapFrom(src => src.Therapist.FirstName + " " + src.Therapist.LastName))
                .ForMember(dest => dest.SpecializationName,
                                   opt => opt.MapFrom(src => src.Therapist.TherapistSpecializations
                                  .Select(ts => ts.Specialization.SpecializationName)
                                  .FirstOrDefault()));
            CreateMap<Appointment, BlAppointmentRequestDto>()
                .ForMember(dest => dest.IdPatient, opt => opt.MapFrom(src => src.PatientId))
                .ForMember(dest => dest.IdTherapist, opt => opt.MapFrom(src => src.TherapistId))
                .ForMember(dest => dest.Day, opt => opt.MapFrom(src => src.AppointmentDate));
            CreateMap<Therapist, BlTherapistSalary>()
                .ForMember(dest => dest.TherapistId, opt => opt.MapFrom(src => src.TherapistsId))
                .ForMember(dest => dest.FullName, opt => opt.MapFrom(src => src.FirstName + " " + src.LastName))
                .ForMember(dest => dest.Salary, opt => opt.MapFrom(src => src.Salary));
            CreateMap<TherapistHour, BlTherapistHourDto>()
                .ForMember(dest => dest.DayOfWeek, opt => opt.MapFrom(src => src.DayOfWeek.ToString()))
                .ForMember(dest => dest.StartTime, opt => opt.MapFrom(src => src.StartTime))
                .ForMember(dest => dest.EndTime, opt => opt.MapFrom(src => src.EndTime))
                .ReverseMap();

        }

    }
}

