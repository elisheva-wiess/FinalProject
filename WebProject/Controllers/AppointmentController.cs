using Bl.Api;
using Bl.Models;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;

namespace Server.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class AppointmentController : ControllerBase
    {
        IAppointmentBl appointmentBlServices;
        public AppointmentController(IAppointmentBl _appointmentBlServices)
        {
            appointmentBlServices = _appointmentBlServices;
        }

        [HttpGet("GetAvailableAppointments")]
        public IActionResult GetAppointmentsByDateRange(string specializationId)
        {
            if (string.IsNullOrEmpty(specializationId))
            {
                return BadRequest("Missing specializationId parameter.");
            }

            var currentDate = DateTime.Now;
            var endDate = currentDate.AddMonths(1);
            var availableAppointments = appointmentBlServices.GetAppointmentsByDateRange(currentDate, endDate, specializationId);
            if (availableAppointments != null)
                return Ok(availableAppointments);
            return BadRequest("No available appointments found.");
        }


        [HttpGet("AllHourSpetificalDayAndTherapist")]
        public IActionResult AllHourSpetificalDayAndTherapist(string idTherapist, string day)
        {
            if (!DateTime.TryParse(day, out var parsedDay))
            {
                return BadRequest("Invalid date format. Please use a valid DateTime format, such as 'yyyy-MM-dd'.");
            }

            return Ok(appointmentBlServices.AllHourSpetificalDayAndTherapist(idTherapist, parsedDay));
        }
        [HttpPost("MakingAnAppointment")]
        public IActionResult MakingAnAppointment([FromBody] BlAppointmentRequestDto request)
        {
            try
            {
                appointmentBlServices.MakingAnAppointment(request);
                return Ok("Appointment successfully created.");
            }
            catch (InvalidOperationException ex)
            {
                return BadRequest(new { Message = ex.Message });
            }
            catch (Exception ex)
            {
                return StatusCode(StatusCodes.Status500InternalServerError, new { Message = ex.Message });
            }
        }

        //לראות תורים שהמטופל קבע בעבר
        [HttpGet("GetPastAppointments")]
        public IActionResult GetPastAppointments(string patientId)
        {
            var appointments= appointmentBlServices.GetPastAppointments(patientId);
            if (appointments != null)
                return Ok(appointments);
            return BadRequest("fdhdh");
        }

        //לראות תורים עתידיים של מטופל
        [HttpGet("GetFutureAppointments")]
        public IActionResult GetFutureAppointments([FromRoute] string idPatient)
        {
            var currentDate = DateTime.Now;
            var appointments = appointmentBlServices.GetFutureAppointments(idPatient, currentDate);

            if (appointments != null)
                return Ok(appointments);
            return BadRequest("fdhdh");
        }

        [HttpDelete("DeleteAppointment")]
        public IActionResult DeleteAppointment([FromBody] BlAppointmentRequestDto request)
        {
            try
            {
                appointmentBlServices.DeleteAppointment(request);
                return Ok("Appointment successfully deleted.");
            }
            catch (InvalidOperationException ex)
            {
                return BadRequest(new { Message = ex.Message });
            }
            catch (Exception ex)
            {
                return StatusCode(StatusCodes.Status500InternalServerError, new { Message = ex.Message });
            }
        }

    }
}
