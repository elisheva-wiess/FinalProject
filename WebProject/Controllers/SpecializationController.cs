using Bl.Api;
using Bl.Models;
using Dal.Api;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;

namespace Server.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class SpecializationController : ControllerBase
    {
        ISpecializationBl SpecializationBlServer;
        public SpecializationController(ISpecializationBl _SpecializationBlServer)
        {
            SpecializationBlServer = _SpecializationBlServer;
        }

        [HttpGet("GetAllSpecializations")]
        public IActionResult GetAllSpecializations()

        {
            var AllSpecializationsTherapists = SpecializationBlServer.GetAllSpecializations();

            if (AllSpecializationsTherapists != null && AllSpecializationsTherapists.Any())

                return Ok(AllSpecializationsTherapists);

            return NotFound("No specializations found.");
        }


        [HttpGet("GetTherapistsBySpecializationName")]
        public IActionResult GetTherapistsBySpecializationName(string name)
        {
            var specializationsTherapists = SpecializationBlServer.GetTherapistsBySpecializationName(name);
            if (specializationsTherapists != null)
                return Ok(specializationsTherapists);
            return BadRequest();
        }
        
        [HttpGet("GetSpecializationsByTherapistId/{therapistId}")]
        public IActionResult GetSpecializationsByTherapistId(string therapistId)
        {
            var specializations = SpecializationBlServer.GetSpecializationsByTherapistId(therapistId);
            if (specializations != null && specializations.Any())
                return Ok(specializations);
            return NotFound("No specializations found for the given therapist.");
        }

        [HttpPost("AddSpecialization")]
        public IActionResult AddSpecialization([FromBody] BlSpecializationDto specializationDto)
        {
            if (specializationDto == null || string.IsNullOrWhiteSpace(specializationDto.SpecializationName))
                return BadRequest("Specialization name is required.");

            var success = SpecializationBlServer.AddSpecialization(specializationDto);

            if (!success)
                return BadRequest("Failed to add specialization.");

            return Ok("Specialization added successfully.");
        }

    }
}
