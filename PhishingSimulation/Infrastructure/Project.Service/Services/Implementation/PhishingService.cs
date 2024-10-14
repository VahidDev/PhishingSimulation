using FluentValidation;
using Microsoft.Extensions.Logging;
using MongoDB.Driver;
using Project.Core;
using Project.Core.Models;
using Project.Core.Utilities.Results;
using Project.Email;
using Project.Service.Services.Abstraction;

namespace Project.Service.Services.Implementation
{
    public sealed class PhishingService : IPhishingService
    {
        private readonly IMongoCollection<PhishingAttempt> _phishingAttempts;

        private readonly ILogger<PhishingService> _logger;
        private readonly IEmailSender _emailSender;
        private readonly IValidator<PhishingRequest> _phishingRequestValidator;

        public PhishingService(
            ILogger<PhishingService> logger,
            IEmailSender emailSender,
            IMongoDatabase mongoDb,
            IValidator<PhishingRequest> phishingRequestValidator
            )
        {
            ArgumentNullException.ThrowIfNull(logger);
            ArgumentNullException.ThrowIfNull(emailSender);
            ArgumentNullException.ThrowIfNull(mongoDb);
            ArgumentNullException.ThrowIfNull(phishingRequestValidator);

            _logger = logger;
            _emailSender = emailSender;
            _phishingRequestValidator = phishingRequestValidator;
            _phishingAttempts = mongoDb.GetCollection<PhishingAttempt>("PhishingAttempts");
        }

        public async Task<Result> SendPhishingEmail(PhishingRequest request)
        {
            var result = new Result();

            try
            {
                var validationResult = await _phishingRequestValidator.ValidateAsync(request);
                if (!validationResult.IsValid)
                {
                    result.Error = string.Join(", ", validationResult.Errors);
                    result.Success = false;
                    return result;
                }

                await _emailSender.SendMailAsync(request.Email, request.Content);

                result.Success = true;
            }
            catch (Exception ex)
            {
                _logger.LogError(ex, "An unexpected error occurred.");
                result.Error = "Please contact suport team.";
                result.Success = false;
            }

            return result;
        }

        public async Task<Result> RegisterClick(string attemptId)
        {
            var result = new Result();

            try
            {
                var attempt = await _phishingAttempts.Find(x => x.AttemptId == attemptId)
                                                     .FirstOrDefaultAsync();
                if (attempt == null)
                {
                    result.Success= false;
                    result.Error = "Attempt was not found.";
                    return result;
                }

                attempt.Clicked = true;
                attempt.Status = PhishingStatuses.Clicked.ToString();
                await _phishingAttempts.ReplaceOneAsync(x => x.AttemptId == attemptId, attempt);
            }
            catch (Exception ex)
            {
                _logger.LogError(ex, "An unexpected error occurred.");
                result.Error = "Please contact suport team.";
                result.Success = false;
            }

            return result;
        }
    }
}
