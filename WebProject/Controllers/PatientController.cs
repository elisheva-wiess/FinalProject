using Bl.Api;
using Dal.Api;
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
        public IActionResult GetAllSpecializations()
        {
            var AllSpecializationsTherapists = _patientBlServer.GetAllSpecializations();
            if (AllSpecializationsTherapists != null)
                return Ok(AllSpecializationsTherapists);
            return BadRequest();

        }
    }
}
