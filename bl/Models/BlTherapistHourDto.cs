namespace Bl.Models
{
    public class BlTherapistHourDto
    {
        public int Id { get; set; }
        public string TherapistId { get; set; }
        public string DayOfWeek { get; set; }
        public TimeSpan StartHour { get; set; }
        public TimeSpan EndHour { get; set; }
    }
}
