using System;
using System.Collections.Generic;

namespace Dal.models
{

    public partial class TherapistHour
    {
        public int TherapistHoursId { get; set; }

        public string TherapistId { get; set; } = null!;

        public string DayOfWeek { get; set; } = null!;

        public TimeOnly StartTime { get; set; }

        public TimeOnly EndTime { get; set; }

        public int TreatmentTime { get; set; }

        public virtual Therapist Therapist { get; set; } = null!;
    }
}