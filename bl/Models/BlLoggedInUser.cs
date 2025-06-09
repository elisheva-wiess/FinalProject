using Dal.Models;

namespace Bl.Models
{
    public class BlLoggedInUser
    {
        public BlPatient? Patient { get; set; }
        public BlTherapist? Therapist { get; set; }
        public Manager? Manager { get; set; }

        public string Role
        {
            get
            {
                if (Patient != null) return "Patient";
                if (Therapist != null) return "Therapist";
                if (Manager != null) return "Manager";
                return "Unknown";
            }
        }
    }
}
