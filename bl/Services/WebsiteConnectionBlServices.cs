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

        public BlPatient SignUp(Patient patient)
        {
            websiteConnectionDalServer.SignUp(patient);
            return mapper.Map<BlPatient>(patient);
        }

        public Patient IsPatient(string id)
        {
            return websiteConnectionDalServer.IsPatient(id);
        }

        public Therapist IsTherapist(string id)
        {
            return websiteConnectionDalServer.IsTherapist(id);
        }

        public BlPatientOrTherapist LogIn(string id)
        {
            var patient = IsPatient(id);
            Console.WriteLine(patient != null ? "Patient found" : "Patient NOT found");

            if (patient != null)
                return new BlPatientOrTherapist { Patient = mapper.Map<BlPatient>(patient) };

            var therapist = IsTherapist(id);
            Console.WriteLine(therapist != null ? "Therapist found" : "Therapist NOT found");

            if (therapist != null)
                return new BlPatientOrTherapist { Therapist = mapper.Map<BlTherapist>(therapist) };

            Console.WriteLine("No user found");
            return null;
        }


    }
}
