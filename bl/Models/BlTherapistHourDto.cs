namespace Bl.Models
{
    public class BlTherapistHourDto
    {
        public string DayOfWeek { get; set; }
        public TimeSpan StartHour { get; set; }
        public TimeSpan EndHour { get; set; }
    }
}
