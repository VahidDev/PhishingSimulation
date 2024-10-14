namespace Project.Email
{
    public interface IEmailSender
    {
        Task SendMailAsync(string mail, string body);
    }
}
