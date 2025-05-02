using Bl.Api;
using Bl.Models;
using Dal.Api;
using Dal.Models;
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




        [HttpGet("{id}")]
        public IActionResult Login(string id)
        {
            var patient = _patientBlServer.LogIn(id);
            if (patient != null)
                return Ok(patient);
            return null;
        }

        [HttpPost]
        public IActionResult signUp([FromBody] Patient patient)
        {
            var pat= _patientBlServer.SingUp(patient);
            if (pat != null)
                return Ok(pat);
            return null;
        }

        [HttpGet("SpecializationsTherapists")]
        public IActionResult SpecializationsTherapists(string name)
        {
            var specializationsTherapists = _patientBlServer.GetSpecializationsTherapistsByName(name);
            if (specializationsTherapists != null)
                return Ok(specializationsTherapists);
            return BadRequest();
        }

        [HttpGet("GetAllSpecializations")]
        public IActionResult GetAllSpecializations()
        {
            var AllSpecializationsTherapists = _patientBlServer.GetAllSpecializations();
            if (AllSpecializationsTherapists != null)
                return Ok(AllSpecializationsTherapists);
            return BadRequest();
        }

        [HttpGet("{name} {specializationName}")]
        public IActionResult GetTherapistApointmentsById(string name, string specializationName)
        {
            var availableAppointment = _patientBlServer.ViewTherapistsAvailableDays(name, specializationName);
            if (availableAppointment != null)
                return Ok(availableAppointment);
            return BadRequest();
        }

    }
}
