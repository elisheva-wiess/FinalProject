using System;
using System.Collections.Generic;

namespace Dal.models;

public partial class Patient
{
    public int PatientsId { get; set; }

    public string FirstName { get; set; } = null!;

    public string LastName { get; set; } = null!;

    public DateOnly BirthDate { get; set; }

    public string? Address { get; set; }

    public string? Gender { get; set; }

    public string PhoneNumber { get; set; } = null!;

    public string? Email { get; set; }

    public virtual ICollection<Appointment> Appointments { get; set; } = new List<Appointment>();
}
