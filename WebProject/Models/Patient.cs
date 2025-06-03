using System;
using System.Collections.Generic;

namespace Server.Models;

public partial class Patient
{
    public string PatientsId { get; set; } = null!;

    public string FirstName { get; set; } = null!;

    public string LastName { get; set; } = null!;

    public DateOnly BirthDate { get; set; }

    public string? Address { get; set; }

    public string? Gender { get; set; }

    public string PhoneNumber { get; set; } = null!;

    public string? Email { get; set; }

    public string HealthInsurance { get; set; } = null!;

    public virtual ICollection<Appointment> Appointments { get; set; } = new List<Appointment>();
}
