using Microsoft.Extensions.DependencyInjection;
using Microsoft.Extensions.Options;
using MongoDB.Driver;

namespace Project.MongoDb.Utilities.DependencyResolvers
{
    public static class ProjectDependencies
    {
        public static void AddMongoDb(this IServiceCollection services)
        {
            services.AddSingleton<IMongoClient>(s =>
            {
                var mongoDbSettings = s.GetRequiredService<IOptions<MongoDbSettings>>().Value;
                return new MongoClient(mongoDbSettings.ConnectionString);
            });

            services.AddSingleton(s =>
            {
                var mongoClient = s.GetRequiredService<IMongoClient>();
                var mongoDbSettings = s.GetRequiredService<IOptions<MongoDbSettings>>().Value;
                return mongoClient.GetDatabase(mongoDbSettings.DatabaseName);
            });
        }
    }
}
