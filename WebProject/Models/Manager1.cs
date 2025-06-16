using System;
using System.Collections.Generic;

namespace Server.Models;

public partial class Manager1
{
    public string ManagerId { get; set; } = null!;

    public string FullName { get; set; } = null!;

    public string Email { get; set; } = null!;

    public string? Phone { get; set; }

    public string? Password { get; set; }
}
