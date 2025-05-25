using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Bl.Models
{
    public class BlVisitSummaryDto
    {
        public int AppointmentId { get; set; }
        public string TherapistName { get; set; }
        public string SpecializationName { get; set; }
        public DateTime AppointmentDate { get; set; }
    }

}
