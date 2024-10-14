using Microsoft.Extensions.DependencyInjection;
using Microsoft.Extensions.Options;
using System.Net.Mail;
using System.Net;

namespace Project.Email.Utilities.DependencyResolvers
{
    public static class ProjectDependencies
    {
        public static void AddEmail(this IServiceCollection services)
        {
            services.AddScoped<IEmailSender, EmailSender>();

            services.AddScoped(sp =>
            {
                var smtpSettings = sp.GetRequiredService<IOptions<SmtpSettings>>().Value;

                var smtpClient = new SmtpClient(smtpSettings.Server, smtpSettings.Port)
                {
                    Credentials = new NetworkCredential(smtpSettings.Username, smtpSettings.Password),
                    EnableSsl = smtpSettings.EnableSsl
                };

                return smtpClient;
            });
        }
    }
}
