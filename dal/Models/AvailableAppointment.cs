using System;
using System.Collections.Generic;

namespace Dal.Models;

public partial class AvailableAppointment
{
    public int AvailableId { get; set; }

    public string TherapistId { get; set; } = null!;

    public DateTime AvailableDate { get; set; }

    public TimeOnly StartTimeSlot { get; set; }

    public TimeOnly EndTimeSlot { get; set; }

    public bool Status { get; set; }

    public virtual Therapist Therapist { get; set; } = null!;
}
