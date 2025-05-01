using System;
using System.Collections.Generic;

namespace Dal.Models;

public partial class Therapist
{
    public string TherapistsId { get; set; } = null!;

    public string FirstName { get; set; } = null!;

    public string LastName { get; set; } = null!;

    public string PhoneNumber { get; set; } = null!;

    public string? Email { get; set; }

    public int? YearsOfExperience { get; set; }

    public double Salary { get; set; }

    public virtual ICollection<Appointment> Appointments { get; set; } = new List<Appointment>();

    public virtual ICollection<AvailableAppointment> AvailableAppointments { get; set; } = new List<AvailableAppointment>();

    public virtual ICollection<TherapistHour> TherapistHours { get; set; } = new List<TherapistHour>();

    public virtual ICollection<TherapistSpecialization> TherapistSpecializations { get; set; } = new List<TherapistSpecialization>();

    public virtual ICollection<TherapistToSpecialization> TherapistToSpecializations { get; set; } = new List<TherapistToSpecialization>();
}
