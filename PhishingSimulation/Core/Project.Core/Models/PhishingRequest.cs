namespace Project.Core.Models
{
    public sealed class PhishingRequest
    {
        public string Email { get; set; } = string.Empty;
        public string Content { get; set; } = string.Empty;
    }
}
