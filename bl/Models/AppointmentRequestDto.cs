using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Bl.Models
{
    public class AppointmentRequestDto
    {

            public string IdPatient { get; set; }
            public string IdTherapist { get; set; }
            public DateTime Day { get; set; }

    }
}
