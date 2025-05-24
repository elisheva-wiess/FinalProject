using Dal.Api;

namespace Dal.Api
{
    public interface IDalManager
    {
        IWebsiteConnectionDal WebsiteConnectionDal { get; }
        IPatientDal PatientDal { get; }
        ITherapistDal TherapistDal { get; }
        ISpecializationDal SpecializationDal { get; }
        IAppointmentDal AppointmentDal { get; }
        IPersonalAreaDal PersonalAreaDal { get; }
    }
}
