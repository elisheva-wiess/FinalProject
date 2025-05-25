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
        //חסר!!!!!!!!!!!!!
        public IActionResult GetAppointmentsByDateRange(string specializationId)
        {
            var currentDate = DateTime.Now;
            var endDate = currentDate.AddMonths(1);
            var availableAppointments = appointmentBlServices.GetAppointmentsByDateRange(currentDate, endDate, specializationId);
            if (availableAppointments != null)
                return Ok(availableAppointments);
            return BadRequest();
        }

        [HttpGet("AllHourSpetificalDayAndTherapist")]
        public IActionResult AllHourSpetificalDayAndTherapist(string idTherapist, DateTime day)
        {
            return Ok(appointmentBlServices.AllHourSpetificalDayAndTherapist(idTherapist, day));

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
        //לראות את כל התורים שהתקימו
        [HttpGet("SeeAllMyAppointment")]
        public IActionResult SeeAllMyAppointment(string patientId)
        {
            var appointments= appointmentBlServices.SeeAllMyAppointment(patientId);
            if (appointments != null)
                return Ok(appointments);
            return BadRequest("fdhdh");
        }
        //לראות את כל התורים שקבע ועדיין לא התקיימו
        [HttpGet("GetAppointmentsForPatientFromToday")]
        public IActionResult GetAppointmentsForPatientFromToday([FromRoute] string idPatient)
        {
            var currentDate = DateTime.Now;
            var appointments = appointmentBlServices.GetAppointmentsForPatientFromToday(idPatient,
                                                                                        currentDate);
            if (appointments != null)
                return Ok(appointments);
            return BadRequest("fdhdh");
        }
        [HttpDelete]
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

        //פונקציה להביא את כל השעות של מטפל מסוים ביום מסוים
        //פונקציה לקבוע תור ביום מסוים שעה מסוימת אצל מטפל מסוים
        //פונקציה לבטל תור שנקבע
        //פונקציה להציג את כל התורים שלי
        //פונקציה להציג את כל התורים של מטפל מסוים
        //פונקציה להציג את כל התורים של מטפל מסוים בטווח תאריכים מסוים


    }
}
