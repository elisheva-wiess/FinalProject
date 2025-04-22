
using Microsoft.AspNetCore.Mvc;
using Bl.Api;

namespace Server.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class TherapistController : ControllerBase
    {
        ITherapistBl _therapistBlServices;
        public TherapistController(ITherapistBl therapistBlServices) {
            _therapistBlServices=therapistBlServices;
        }
        [HttpGet]
        public IActionResult GetTherapistApointmentsById(int id)
        {
           var therapistApointments = _therapistBlServices.GetTherapistApointmentsById(id);
            if (therapistApointments != null)
                return Ok(therapistApointments);
            return BadRequest();
        }
    }
}
