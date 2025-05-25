using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Bl.Models
{
    public class BlPatientDto
    {
        public string PatientsId { get; set; }
        public string FirstName { get; set; }
        public string LastName { get; set; }
        public DateOnly BirthDate { get; set; }
        public string? Address { get; set; }
        public string? Gender { get; set; }
        public string PhoneNumber { get; set; }
        public string? Email { get; set; }
        public string HealthInsurance { get; set; }
    }

}
