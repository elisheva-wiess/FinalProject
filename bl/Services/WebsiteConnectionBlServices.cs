using AutoMapper;
using Bl.Api;
using Bl.Models;
using Dal.Api;
using Dal.Models;
using System;

namespace Bl.Services
{
    public class WebsiteConnectionBlServices : IWebsiteConnectionBl
    {
        private readonly IWebsiteConnectionDal websiteConnectionDalServer;
        private readonly IMapper mapper;

        public WebsiteConnectionBlServices(IWebsiteConnectionDal _websiteConnectionsDalServer, IMapper _mapper)
        {
            websiteConnectionDalServer = _websiteConnectionsDalServer;
            mapper = _mapper;
        }

        public Patient SignUp(BlPatientDto patient)
        {
           var p= mapper.Map<Patient>(patient);
            websiteConnectionDalServer.SignUp(p);
            return p;
        }

        public void SignOut(string id)
        {
            websiteConnectionDalServer.SignOut(id);
        }

        public Patient IsPatient(string id)
        {
            return websiteConnectionDalServer.IsPatient(id);
        }

        public Therapist IsTherapist(string id)
        {
            return websiteConnectionDalServer.IsTherapist(id);
        }

        public Manager IsManager(string id)
        {
            return websiteConnectionDalServer.IsManager(id);
        }

        public BlLoggedInUser LogIn(string id)
        {
            var patient = IsPatient(id);
            if (patient != null)
                return new BlLoggedInUser { Patient = mapper.Map<BlPatient>(patient) };

            var therapist = IsTherapist(id);
            if (therapist != null)
                return new BlLoggedInUser { Therapist = mapper.Map<BlTherapist>(therapist) };

            var manager = IsManager(id);
            if (manager != null)
                return new BlLoggedInUser { Manager = manager }; 

            return null;
        }

    }
}
