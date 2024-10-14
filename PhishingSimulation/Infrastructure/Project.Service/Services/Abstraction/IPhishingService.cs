using Project.Core.Models;
using Project.Core.Utilities.Results;

namespace Project.Service.Services.Abstraction
{
    public interface IPhishingService
    {
        Task<Result> SendPhishingEmail(PhishingRequest request);
        Task<Result> RegisterClick(string attemptId);
    }
}
