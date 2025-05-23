using Dal.Models;
using Microsoft.AspNetCore.Mvc;
using Bl.Api;

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

        [HttpGet]
        public IActionResult GetTherapistApointmentsById(string id)
        {
            var therapistApointments = therapistBlServices.GetTherapistApointmentsById(id);
            if (therapistApointments != null)
                return Ok(therapistApointments);
            return BadRequest();

        }
        [HttpGet("{id}")]
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

        //[HttpGet("{therapistFirstName} {specializationName}")]
        //public IActionResult WorkingHoursTherapistByNameAndSpecialization(string therapistFirstName, string specializationName)
        //{
        //    var availableAppointment = therapistBlServices.WorkingHoursTherapistByNameAndSpecialization(therapistFirstName, specializationName);
        //    if (availableAppointment != null)
        //        return Ok(availableAppointment);
        //    return BadRequest();
        //}
    }
}
