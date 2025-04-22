using System;
using System.Collections.Generic;

namespace Dal.models;

public partial class Therapist
{
    public int TherapistsId { get; set; }

    public string FirstName { get; set; } = null!;

    public string LastName { get; set; } = null!;

    public int SpecializationId { get; set; }

    public string PhoneNumber { get; set; } = null!;

    public string? Email { get; set; }

    public int? YearsOfExperience { get; set; }

    public virtual ICollection<Appointment> Appointments { get; set; } = new List<Appointment>();

    public virtual ICollection<AvailableAppointment> AvailableAppointments { get; set; } = new List<AvailableAppointment>();

    public virtual Specialization Specialization { get; set; } = null!;

    public virtual ICollection<TherapistHour> TherapistHours { get; set; } = new List<TherapistHour>();
}
