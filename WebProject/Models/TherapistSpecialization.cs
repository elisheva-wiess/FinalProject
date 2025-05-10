using System;
using System.Collections.Generic;

namespace Server.Models;

public partial class TherapistSpecialization
{
    public int Id { get; set; }

    public int SpecializationId { get; set; }

    public string TherapistId { get; set; } = null!;

    public virtual Specialization Specialization { get; set; } = null!;

    public virtual Therapist Therapist { get; set; } = null!;
}
