using Bl.Api;

namespace Bl.Api
{
    public interface IBlManager
    {
        IWebsiteConnectionBl WebsiteConnectionBl { get; }
        IPatientBl PatientBl { get; }
        ITherapistBl TherapistBl { get; }
        ISpecializationBl SpecializationBl { get; }
        IAppointmentBl AppointmentBl { get; }
    }
}
