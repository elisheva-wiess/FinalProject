using System;
using System.Collections.Generic;

namespace Server.Models;

public partial class Appointment
{
    public int AppointmentId { get; set; }

    public string TherapistId { get; set; } = null!;

    public string PatientId { get; set; } = null!;

    public DateTime AppointmentDate { get; set; }

    public string Status { get; set; } = null!;

    public virtual Patient Patient { get; set; } = null!;

    public virtual Therapist Therapist { get; set; } = null!;
}
