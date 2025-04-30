using System;
using System.Collections.Generic;

namespace Dal.models
{

    public partial class Specialization
    {
        public int Id { get; set; }

        public string SpecializationName { get; set; } = null!;

        public string? Description { get; set; }

        public virtual ICollection<TherapistToSpecialization> TherapistToSpecializations { get; set; } = new List<TherapistToSpecialization>();
    }
}