using Bl.Api;
using Bl.Models;
using Bl.Services;
using Dal.Models;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;

namespace Server.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class PatientController : ControllerBase
    {
        IPatientBl patientBlServer;
        public PatientController(IPatientBl _patientBlServices)
        {
            patientBlServer = _patientBlServices;
        }


    }
}
