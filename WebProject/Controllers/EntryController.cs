using Bl.Api;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;

namespace Server.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class EntryController : ControllerBase
    {
        IEntryBl entryBlServer;
        public EntryController(IEntryBl _entryBlServer)
        {
            entryBlServer = _entryBlServer;
        }


        [HttpGet("{id}")]
        public IActionResult Login([FromRoute] string id)
        {
            var patient = entryBlServer.LogIn(id);

            if (patient != null)

                return Ok(patient);

            return NotFound("Patient not found.");

        }

        [HttpPost]
        public IActionResult SignUp([FromBody] Patient patient)
        {
            try
            {
                var pat = entryBlServer.SingUp(patient);
                return Ok(pat);
            }
            catch (Exception ex)
            {
                return StatusCode(500, $"Internal server error: {ex.Message}");
            }
        }
    }
}
