namespace Project.Email
{
    public sealed class SmtpSettings
    {
        public required string Server { get; init; } 
        public required int Port { get; init; }
        public required string Username { get; init; }
        public required string Password { get; init; } = Environment.GetEnvironmentVariable("SMTP_PASSWORD") ?? string.Empty;
        public required string From { get; init; }
        public required bool EnableSsl { get; init; }
    }
}
