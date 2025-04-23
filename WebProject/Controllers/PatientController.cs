using Bl.Api;
<<<<<<< HEAD
=======
using Bl.Models;
using Dal.Api;
using Dal.models;
>>>>>>> e110df938693e04e2103196cbb861ff195d715db
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
        public IActionResult Login(int id)
        {
            var patient= _patientBlServer.LogIn(id);
            if (patient != null)
                return Ok(patient);
            return null;

        }
        public IActionResult signUp([FromBody] Patient patient)
        {

        }
        public IActionResult GetAllSpecializations()
        {

        }
        public IActionResult ViewAvailableTherapistHours(string therapistName, string specializationName)
        {
        }

        public IActionResult MakeAnAppointment()
        {

        }
        public IActionResult CancelAnAppointment()
        {

        }

        [HttpGet]
        public IActionResult GetTherapistApointmentsById(string name, string specializationName)
        {
            var availableAppointment = _patientBlServer.ViewTherapistsAvailableDays(name, specializationName);
            if (availableAppointment != null)
                return Ok(availableAppointment);
            return BadRequest();
        }
        [HttpGet]
        public IActionResult GetAllSpecializations()
        {
            var AllSpecializationsTherapists = _patientBlServer.GetAllSpecializations();
            if (AllSpecializationsTherapists != null)
                return Ok(AllSpecializationsTherapists);
            return BadRequest();

        }
    }
}
