using Dal.Models;
using Microsoft.AspNetCore.Mvc;
using Bl.Api;

namespace Server.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class TherapistController : ControllerBase
    {
        ITherapistBl _therapistBlServices;
        public TherapistController(ITherapistBl therapistBlServices)
        {
            _therapistBlServices = therapistBlServices;
        }

        [HttpGet]
        public IActionResult GetTherapistApointmentsById(string id)
        {
            var therapistApointments = _therapistBlServices.GetTherapistApointmentsById(id);
            if (therapistApointments != null)
                return Ok(therapistApointments);
            return BadRequest();
        }

        [HttpGet("{id}")]
        public IActionResult GetTherapistWorkingHoursById([FromRoute] string id)
        {
            var therapistWorkingHours = _therapistBlServices.GetTherapistWorkingHoursById(id);
            if (therapistWorkingHours != null)
                return Ok(therapistWorkingHours);
            return BadRequest();
        }

    }
}
