using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Bl.Models
{
    public class BlPatientOrTherapist
    {
        public BlPatient? Patient { get; set; }
        public BlTherapist? Therapist { get; set; }
        public string Role => Patient != null ? "Patient" : "Therapist";
    }

}
