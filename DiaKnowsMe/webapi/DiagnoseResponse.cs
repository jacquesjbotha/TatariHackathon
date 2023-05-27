
namespace webapi
{
    public class DiagnoseResponse
    {
        public string likelyIssue { get; set; }
        public string urgency { get; set; }
        public string recommendedSpecialist { get; set; }
    }
}