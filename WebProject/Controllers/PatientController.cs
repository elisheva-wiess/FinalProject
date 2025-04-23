using Bl.Api;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;

namespace Server.Controllers 
{       
    [Route("api/[controller]")]                   
    [ApiController]
    public class PatientController : ControllerBase
    {
        IPatientBl _patientBlServer;
        public PatientController(IPatientBl patientBlServices)
        {
            _patientBlServer = patientBlServices;
        }
        [HttpGet]
        public IActionResult SpecializationsTherapists(string name)
        {
            var specializationsTherapists = _patientBlServer.GetSpecializationsTherapistsByName(name);
            if (specializationsTherapists != null)
                return Ok(specializationsTherapists);
            return BadRequest();
        }

        [HttpGet]
        public IActionResult GetTherapistApointmentsById(string name, string specializationName)
        {
            var availableAppointment = _patientBlServer.ViewTherapistsAvailableDays(name, specializationName);
            if (availableAppointment != null)
                return Ok(availableAppointment);
            return BadRequest();
        }
    }
}
