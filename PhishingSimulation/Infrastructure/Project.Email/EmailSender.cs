using Microsoft.Extensions.Options;
using System.Net.Mail;

namespace Project.Email
{
    public sealed class EmailSender : IEmailSender
    {
        private readonly SmtpClient _smtpClient;
        private readonly SmtpSettings _smtpSettings;

        public EmailSender(IOptions<SmtpSettings> smtpSettings, SmtpClient smtpClient)
        {
            ArgumentNullException.ThrowIfNull(smtpSettings);
            ArgumentNullException.ThrowIfNull(smtpClient);

            _smtpSettings = smtpSettings.Value;
            _smtpClient = smtpClient;
        }

        public async Task SendMailAsync(string recipientEmail, string url)
        {
            var link = $"<a href='{url}'>Click here to view the news</a>";

            var mailMessage = new MailMessage
            {
                From = new MailAddress(_smtpSettings.From),
                Subject = "News",
                Body = link,
                IsBodyHtml = true,
            };
            mailMessage.To.Add(recipientEmail);

            await _smtpClient.SendMailAsync(mailMessage);
        }
    }
}