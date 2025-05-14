using Bl.Api;
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
        public IActionResult GetAppointmentsByDateRange()
        {
            var currentDate = DateTime.Now;
            var endDate = currentDate.AddMonths(1);
            var availableAppointments = appointmentBlServices.GetAppointmentsByDateRange(currentDate, endDate);
            if (availableAppointments != null)
                return Ok(availableAppointments);
            return BadRequest();
        }

        [HttpGet("AllHourSpetificalDayAndTherapist")]
        public IActionResult AllHourSpetificalDayAndTherapist(string idTherapist, DateTime day)
        {
            return Ok(appointmentBlServices.AllHourSpetificalDayAndTherapist(idTherapist, day));

        }
        //פונקציה להביא את כל השעות של מטפל מסוים ביום מסוים
        //פונקציה לקבוע תור ביום מסוים שעה מסוימת אצל מטפל מסוים
        //פונקציה לבטל תור שנקבע
        //פונקציה להציג את כל התורים שלי
        //פונקציה להציג את כל התורים של מטפל מסוים
        //פונקציה להציג את כל התורים של מטפל מסוים בטווח תאריכים מסוים
        //פונקציה להציג את כל התורים של מטפל מסוים בטווח תאריכים מסוים

    }
}
