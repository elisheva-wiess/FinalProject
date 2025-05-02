using Dal.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Bl.Models
{

        public partial class BlPatient
        {
            public string FirstName { get; set; } = null!;

            public string LastName { get; set; } = null!;

            public string? Gender { get; set; }
        }
    }


