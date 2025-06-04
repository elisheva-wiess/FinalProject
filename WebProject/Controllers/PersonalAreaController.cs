using Bl.Api;
using Bl.Models;
using Microsoft.AspNetCore.Mvc;
using System.Collections.Generic;
using System.Linq;

namespace Server.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class PersonalAreaController : ControllerBase
    {
        private readonly IPersonalAreaBl personalAreaBl;

        public PersonalAreaController(IPersonalAreaBl _personalAreaBl)
        {
            personalAreaBl = _personalAreaBl;
        }

        // מחזיר את סיכומי הביקור של המטופל.
        [HttpGet("VisitSummaries")]
        public ActionResult<List<BlVisitSummaryDto>> GetVisitSummaries([FromQuery] string patientId)
        {
            if (string.IsNullOrWhiteSpace(patientId))
                return BadRequest("PatientId is required.");

            var summaries = personalAreaBl.GetVisitSummaries(patientId);

            if (summaries == null || !summaries.Any())
                return NotFound("No visit summaries found.");

            return Ok(summaries);
        }

        // מחזיר את הפרטים האישיים של המטופל.
        [HttpGet("PersonalDetails")]
        public ActionResult<BlPatientDto> GetPersonalDetails([FromQuery] string patientId)
        {
            if (string.IsNullOrWhiteSpace(patientId))
                return BadRequest("PatientId is required.");

            var details = personalAreaBl.GetPersonalDetails(patientId);

            if (details == null)
                return NotFound("Patient not found.");

            return Ok(details);
        }

        // מעדכן את הפרטים האישיים של המטופל.
        [HttpPut("UpdatePersonalDetails")]
        public IActionResult UpdatePersonalDetails([FromBody] BlPatientDto updatedDetails)
        {
            if (string.IsNullOrWhiteSpace(updatedDetails.PatientsId))
                return BadRequest("PatientId is required.");

            if (updatedDetails == null)
                return BadRequest("Updated details are required.");

            var success = personalAreaBl.UpdatePersonalDetails(updatedDetails.PatientsId, updatedDetails);

            if (!success)
                return BadRequest("Failed to update personal details.");

            return Ok("Personal details updated successfully.");
        }
    }
}
