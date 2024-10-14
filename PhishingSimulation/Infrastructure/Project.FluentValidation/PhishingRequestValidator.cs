using FluentValidation;
using Project.Core.Models;

namespace Project.FluentValidation
{
    public class PhishingRequestValidator : AbstractValidator<PhishingRequest>
    {
        public PhishingRequestValidator()
        {
            RuleFor(x => x.Email)
                .NotEmpty().WithMessage("Email is required.")
                .EmailAddress().WithMessage("Invalid email format.");

            RuleFor(x => x.Content)
                .NotEmpty().WithMessage("Content is required.");
        }
    }
}
