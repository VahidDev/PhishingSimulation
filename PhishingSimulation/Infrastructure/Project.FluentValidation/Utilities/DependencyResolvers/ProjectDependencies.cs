using FluentValidation;
using Microsoft.Extensions.DependencyInjection;
using Project.Core.Models;

namespace Project.FluentValidation.Utilities.DependencyResolvers
{
    public static class ProjectDependencies
    {
        public static void AddFluentValidation(this IServiceCollection services)
        {
            services.AddScoped<IValidator<PhishingRequest>, PhishingRequestValidator>();
        }
    }
}
