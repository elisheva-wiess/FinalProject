using System;
using System.Collections.Generic;

namespace Dal.models;

public partial class Appointment
{
    public int AppointmentId { get; set; }

    public int TherapistId { get; set; }

    public int PatientId { get; set; }

    public DateTime AppointmentDate { get; set; }

    public string? Status { get; set; }

    public virtual Patient Patient { get; set; } = null!;

    public virtual Therapist Therapist { get; set; } = null!;
}
