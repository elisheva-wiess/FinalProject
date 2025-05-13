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

        public IActionResult Login([FromRoute] string id)

        {

            var patient = _patientBlServer.LogIn(id);

            if (patient != null)

                return Ok(patient);

            return NotFound("Patient not found.");

        }

        [HttpPost]
        public IActionResult SignUp([FromBody] Patient patient)
        {
            try
            {
                var pat = _patientBlServer.SingUp(patient);
                return Ok(pat);
            }
            catch (Exception ex)
            {
                return StatusCode(500, $"Internal server error: {ex.Message}"); 
            }
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

            if (AllSpecializationsTherapists != null && AllSpecializationsTherapists.Any())

                return Ok(AllSpecializationsTherapists);

            return NotFound("No specializations found."); 
        }

        [HttpGet("{therapistFirstName} {specializationName}")]
        public IActionResult ViewTherapistsAvailableDays(string therapistFirstName, string specializationName)
        {
            var availableAppointment = _patientBlServer.ViewTherapistsAvailableDays(therapistFirstName, specializationName);
            if (availableAppointment != null)
                return Ok(availableAppointment);
            return BadRequest();
        }


    }
}
