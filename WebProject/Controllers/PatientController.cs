using Bl.Api;
using Bl.Models;
using Bl.Services;
using Dal.Models;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;

namespace Server.Controllers
{
   
    [ApiController]
    [Route("api/[controller]")]
    public class PatientController : ControllerBase
    {
        IPatientBl patientBlServer;
        public PatientController(IPatientBl _patientBlServices)
        {
            patientBlServer = _patientBlServices;
        }
        [HttpGet("GetAgeById/{id}")]
        public IActionResult GetAgeById(string id)
        {
            try
            {
                var age = patientBlServer.GetAgeById(id);
                if (age!=null)
                {
                    return Ok(age);
                }
                return NotFound("מטופל לא נמצא");
            }
            catch (Exception ex)
            {
                Console.WriteLine($"שגיאה בקבלת גיל מטופל: {ex.Message}");
                return StatusCode(500, "שגיאה בקבלת גיל מטופל");
            }
        }
        [HttpGet("GetGenderById/{id}")]
        public IActionResult GetGenderById(string id)
        {
            try
            {
                var gender = patientBlServer.GetGenderById(id);
                if (gender != null)
                {
                    return Ok(gender);
                }
                return NotFound("מטופל לא נמצא");
            }
            catch (Exception ex)
            {
                Console.WriteLine($"שגיאה בקבלת מין מטופל: {ex.Message}");
                return StatusCode(500, "שגיאה בקבלת מין מטופל");
            }
        }
        [HttpGet("GetNameById/{id}")]
        public IActionResult GetNameById(string id)
        {
            try
            {
                var patient = patientBlServer.GetFullNameById(id);
                if (patient != null)
                {
                    return Ok(patient);
                }
                return NotFound("מטופל לא נמצא");
            }
            catch (Exception ex)
            {
                Console.WriteLine($"שגיאה בקבלת שם מטופל: {ex.Message}");
                return StatusCode(500, "שגיאה בקבלת שם מטופל");
            }
        }
        [HttpGet("GetHealthInsuranceById/{id}")]
        public IActionResult GetHealthInsuranceById(string id)
        {
            try
            {
                var healthInsurance = patientBlServer.GetHealthInsuranceById(id);
                if (healthInsurance != null)
                {
                    return Ok(healthInsurance);
                }
                return NotFound("מטופל לא נמצא");
            }
            catch (Exception ex)
            {
                Console.WriteLine($"שגיאה בקבלת ביטוח בריאות מטופל: {ex.Message}");
                return StatusCode(500, "שגיאה בקבלת ביטוח בריאות מטופל");
            }
        }

    
    }
}
