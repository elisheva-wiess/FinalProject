using Dal.Api;
using Dal.Models;
using Dal.Services;

namespace Dal
{
    public class DalManager : IDalManager
    {
        public IWebsiteConnectionDal WebsiteConnectionDal { get; }
        public IPatientDal PatientDal { get; }
        public ITherapistDal TherapistDal { get; }
        public ISpecializationDal SpecializationDal { get; }
        public IAppointmentDal AppointmentDal { get; }

        private readonly dbClass _context;

        public DalManager()
        {
            _context = new dbClass();

            WebsiteConnectionDal = new WebsiteConnectionDalServices(_context);
            PatientDal = new PatientDalServices(_context);
            TherapistDal = new TherapistDalServices(_context);
            SpecializationDal = new SpecializationDalServices(_context);
            AppointmentDal = new AppointmentDalServices(_context);
        }
    }
}
