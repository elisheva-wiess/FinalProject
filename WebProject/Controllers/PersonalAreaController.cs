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
        private readonly IPersonalAreaBl _personalAreaBl;

        public PersonalAreaController(IPersonalAreaBl personalAreaBl)
        {
            _personalAreaBl = personalAreaBl;
        }

        /// <summary>
        /// מחזיר את התורים העתידיים של המטופל.
        /// </summary>
        [HttpGet("FutureAppointments")]
        public ActionResult<List<AppointmentDto>> GetFutureAppointments([FromQuery] string patientId)
        {
            if (string.IsNullOrWhiteSpace(patientId))
                return BadRequest("PatientId is required.");

            var futureAppointments = _personalAreaBl.GetFutureAppointments(patientId);

            if (futureAppointments == null || !futureAppointments.Any())
                return NotFound("No future appointments found.");

            return Ok(futureAppointments);
        }

        /// <summary>
        /// מחזיר את התורים הקודמים של המטופל.
        /// </summary>
        [HttpGet("PastAppointments")]
        public ActionResult<List<AppointmentDto>> GetPastAppointments([FromQuery] string patientId)
        {
            if (string.IsNullOrWhiteSpace(patientId))
                return BadRequest("PatientId is required.");

            var pastAppointments = _personalAreaBl.GetPastAppointments(patientId);

            if (pastAppointments == null || !pastAppointments.Any())
                return NotFound("No past appointments found.");

            return Ok(pastAppointments);
        }

        /// <summary>
        /// מחזיר את סיכומי הביקור של המטופל.
        /// </summary>
        [HttpGet("VisitSummaries")]
        public ActionResult<List<VisitSummaryDto>> GetVisitSummaries([FromQuery] string patientId)
        {
            if (string.IsNullOrWhiteSpace(patientId))
                return BadRequest("PatientId is required.");

            var summaries = _personalAreaBl.GetVisitSummaries(patientId);

            if (summaries == null || !summaries.Any())
                return NotFound("No visit summaries found.");

            return Ok(summaries);
        }

        /// <summary>
        /// מחזיר את הפרטים האישיים של המטופל.
        /// </summary>
        [HttpGet("PersonalDetails")]
        public ActionResult<PatientDto> GetPersonalDetails([FromQuery] string patientId)
        {
            if (string.IsNullOrWhiteSpace(patientId))
                return BadRequest("PatientId is required.");

            var details = _personalAreaBl.GetPersonalDetails(patientId);

            if (details == null)
                return NotFound("Patient not found.");

            return Ok(details);
        }

        /// <summary>
        /// מעדכן את הפרטים האישיים של המטופל.
        /// </summary>
        [HttpPut("UpdatePersonalDetails")]
        public IActionResult UpdatePersonalDetails([FromQuery] string patientId, [FromBody] PatientDto updatedDetails)
        {
            if (string.IsNullOrWhiteSpace(patientId))
                return BadRequest("PatientId is required.");

            if (updatedDetails == null)
                return BadRequest("Updated details are required.");

            var success = _personalAreaBl.UpdatePersonalDetails(patientId, updatedDetails);

            if (!success)
                return BadRequest("Failed to update personal details.");

            return Ok("Personal details updated successfully.");
        }
    }
}
