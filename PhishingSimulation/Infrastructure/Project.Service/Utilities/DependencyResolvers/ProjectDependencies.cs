using Microsoft.Extensions.DependencyInjection;
using MongoDB.Driver;
using Project.Core.Models;
using Project.Service.Services.Abstraction;
using Project.Service.Services.Implementation;

namespace Project.Service.Utilities.DependencyResolvers
{
    public static class ProjectDependencies
    {
        public static void AddProjectDependencies(this IServiceCollection services)
        {
            services.AddScoped<IPhishingService, PhishingService>();

            services.AddTransient(sp =>
            {
                var mongoClient = sp.GetRequiredService<IMongoClient>();
                var database = mongoClient.GetDatabase("PhishingDB");
                return database.GetCollection<PhishingAttempt>("Attempts");
            });
        }
    }
}
