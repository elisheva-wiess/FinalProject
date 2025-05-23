using AutoMapper;
using Bl.Api;
using Bl.Services;
using Dal;
using Dal.Api;

namespace Bl
{
    public class BlManager : IBlManager
    {
        public IWebsiteConnectionBl WebsiteConnectionBl { get; }
        public IPatientBl PatientBl { get; }
        public ITherapistBl TherapistBl { get; }
        public ISpecializationBl SpecializationBl { get; }
        public IAppointmentBl AppointmentBl { get; }

        public BlManager(IDalManager dalManager, IMapper mapper)
        {
            WebsiteConnectionBl = new WebsiteConnectionBlServices(dalManager.WebsiteConnectionDal, mapper);
            PatientBl = new PatientBlServices(dalManager.PatientDal, mapper);
            TherapistBl = new TherapistBlServices(dalManager.TherapistDal, mapper);
            SpecializationBl = new SpecializationBlServices(dalManager.SpecializationDal, mapper);
            AppointmentBl = new AppointmentBlServices(dalManager.AppointmentDal, mapper);
        }
    }
}
