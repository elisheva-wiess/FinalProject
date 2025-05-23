using Bl.Api;
using Dal.Models;
using Microsoft.AspNetCore.Mvc;
using System;

namespace WebApi.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class WebsiteConnectionController : ControllerBase
    {
        private readonly IWebsiteConnectionBl _websiteConnectionBl;

        public WebsiteConnectionController(IWebsiteConnectionBl websiteConnectionBl)
        {
            _websiteConnectionBl = websiteConnectionBl;
        }

        [HttpPost("SignUp")]
        public IActionResult SignUp([FromBody] Patient patient)
        {
            try
            {
                _websiteConnectionBl.SignUp(patient);
                return Ok("נרשמת בהצלחה");
            }
            catch (Exception ex)
            {
                Console.WriteLine($"שגיאה בהרשמה: {ex.Message}");
                return StatusCode(500, "שגיאה בהרשמה");
            }
        }

        [HttpGet("isPatient/{id}")]
        public IActionResult IsPatient(string id)
        {
            try
            {
                var patient = _websiteConnectionBl.IsPatient(id);
                if (patient != null)
                    return Ok(patient);
                return NotFound("לא נמצא מטופל עם תעודת זהות זו");
            }
            catch (Exception ex)
            {
                Console.WriteLine($"שגיאה בבדיקת מטופל: {ex.Message}");
                return StatusCode(500, "שגיאה בבדיקת מטופל");
            }
        }

        [HttpGet("isTherapist/{id}")]
        public IActionResult IsTherapist(string id)
        {
            try
            {
                var therapist = _websiteConnectionBl.IsTherapist(id);
                if (therapist != null)
                    return Ok(therapist);
                return NotFound("לא נמצא מטפל עם תעודת זהות זו");
            }
            catch (Exception ex)
            {
                Console.WriteLine($"שגיאה בבדיקת מטפל: {ex.Message}");
                return StatusCode(500, "שגיאה בבדיקת מטפל");
            }
        }

        [HttpGet("Login/{id}")]
        public IActionResult Login(string id)
        {
            var result = _websiteConnectionBl.LogIn(id);

            if (result == null)
                return NotFound(); // תגרום ל-catch בצד הלקוח לפעול

            if (result.Patient != null)
            {
                return Ok(new
                {
                    patient = result.Patient
                });
            }
            else if (result.Therapist != null)
            {
                return Ok(new
                {
                    therapist = result.Therapist
                });
            }

            return NotFound(); // רק ביטחון נוסף
        }


        // ? פעולה חדשה - אחת שמחזירה גם תפקיד וגם נתוני משתמש
        [HttpGet("getUser/{id}")]
        public IActionResult GetUser(string id)
        {
            try
            {
                var patient = _websiteConnectionBl.IsPatient(id);
                if (patient != null)
                {
                    return Ok(new
                    {
                        role = "patient",
                        user = patient
                    });
                }

                var therapist = _websiteConnectionBl.IsTherapist(id);
                if (therapist != null)
                {
                    return Ok(new
                    {
                        role = "therapist",
                        user = therapist
                    });
                }

                return NotFound("משתמש לא נמצא");
            }
            catch (Exception ex)
            {
                Console.WriteLine($"שגיאה בקבלת משתמש: {ex.Message}");
                return StatusCode(500, "שגיאה בשרת");
            }
        }
    }
}
