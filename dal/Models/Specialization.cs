using System;
using System.Collections.Generic;

namespace Dal.Models;

public partial class Specialization
{
    public int Id { get; set; }

    public string SpecializationName { get; set; } = null!;

    public string? Description { get; set; }

    public virtual ICollection<TherapistSpecialization> TherapistSpecializations { get; set; } = new List<TherapistSpecialization>();
}
