using System;
using System.Collections.Generic;

namespace Dal.models;

public partial class AvailableAppointment
{
    public int AvailableId { get; set; }

    public int TherapistId { get; set; }

    public DateTime AvailableDate { get; set; }

    public TimeOnly TimeSlot { get; set; }

    public virtual Therapist Therapist { get; set; } = null!;
}
