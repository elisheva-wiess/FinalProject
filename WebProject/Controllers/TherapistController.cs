using Dal.Models;
using Microsoft.AspNetCore.Mvc;
using Bl.Api;
using Bl.Models;

namespace Server.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class TherapistController : ControllerBase
    {
        ITherapistBl therapistBlServices;
        public TherapistController(ITherapistBl _therapistBlServices)
        {
            therapistBlServices = _therapistBlServices;
        }

        [HttpGet("GetTherapistApointmentsById")]
        public IActionResult GetTherapistApointmentsById(string id)
        {
            var therapistApointments = therapistBlServices.GetTherapistApointmentsById(id);
            if (therapistApointments != null)
                return Ok(therapistApointments);
            return BadRequest();

        }

        [HttpGet("GetTherapistWorkingHoursById/{id}")]
        public IActionResult GetTherapistWorkingHoursById([FromRoute] string id)
        {
            var therapistWorkingHours = therapistBlServices.GetTherapistWorkingHoursById(id);
            if (therapistWorkingHours != null)
                return Ok(therapistWorkingHours);
            return BadRequest();
        }

        [HttpGet("GetTherapistSalaryById")]
        public IActionResult GetTherapistSalaryById(string id)
        {
            var therapistSalary = therapistBlServices.GetTherapistSalaryById(id);
            if (therapistSalary != null)
                return Ok(therapistSalary);
            return BadRequest();
        }

        [HttpPost("AddTherapist")]
        public IActionResult AddTherapist([FromBody] BlTherapist newTherapist)
        {
            var result = therapistBlServices.AddTherapist(newTherapist);
            if (result)
                return Ok("Therapist added successfully");
            return BadRequest("Failed to add therapist");
        }

        [HttpPut("UpdateSalary")]
        public IActionResult UpdateSalary(string therapistId, double newSalary)
        {
            var result = therapistBlServices.UpdateSalary(therapistId, newSalary);
            if (result)
                return Ok("Salary updated successfully");
            return NotFound("Therapist not found");
        }

        [HttpPut("UpdateWorkingHours")]
        public IActionResult UpdateWorkingHours(string therapistId, List<BlTherapistHourDto> newHours)
        {
            var result = therapistBlServices.UpdateWorkingHours(therapistId, newHours);
            if (result)
                return Ok("Working hours updated successfully");
            return NotFound("Therapist not found or update failed");
        }

        [HttpGet("GetWorkingHoursByTherapistFullNameAndSpecialization/{therapistFullName}/{specializationName}")]
        public IActionResult GetWorkingHoursByTherapistFullNameAndSpecialization(string therapistFullName, string specializationName)
        {
            var availableAppointment = therapistBlServices.GetWorkingHoursByTherapistFullNameAndSpecialization(therapistFullName, specializationName);

            if (availableAppointment != null && availableAppointment.Any())
                return Ok(availableAppointment);

            return NotFound("לא נמצאו שעות עבודה עבור מטפל זה עם ההתמחות הזו.");
        }

        [HttpPost("AddVisitSummary")]
        public IActionResult AddVisitSummary([FromBody] BlVisitSummaryDto summaryDto)
        {
            if (summaryDto == null)
                return BadRequest("Visit summary is required.");

            var success = therapistBlServices.AddVisitSummary(summaryDto);

            if (!success)
                return BadRequest("Failed to add visit summary.");

            return Ok("Visit summary added successfully.");
        }

    }
}
