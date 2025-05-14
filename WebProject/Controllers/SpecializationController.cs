using Bl.Api;
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


        [HttpGet("SpecializationsTherapists")]
        public IActionResult GetTherapistsBySpecializationName(string name)
        {
            var specializationsTherapists = SpecializationBlServer.GetTherapistsBySpecializationName(name);
            if (specializationsTherapists != null)
                return Ok(specializationsTherapists);
            return BadRequest();
        }

    }
}
