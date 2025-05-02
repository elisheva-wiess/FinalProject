using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;


namespace Bl.Models
{
    public partial class BlSpecializationsTherapists
    {
        public string TherapistsId { get; set; }

        public string FirstName { get; set; } = null!;

        public string LastName { get; set; } = null!;

        public string PhoneNumber { get; set; } = null!;

        public string? Email { get; set; }

        public int? YearsOfExperience { get; set; }
    }
}
