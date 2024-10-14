using MongoDB.Bson.Serialization.Attributes;
using MongoDB.Bson;

namespace Project.Core.Models
{
    [BsonIgnoreExtraElements]
    public sealed class PhishingAttempt
    {
        [BsonId] 
        [BsonRepresentation(BsonType.ObjectId)]
        public string Id { get; set; } = string.Empty;

        [BsonElement("email")]
        public string Email { get; set; } = string.Empty;

        [BsonElement("attemptId")]
        public string AttemptId { get; set; } = string.Empty;

        [BsonElement("content")]
        public string Content { get; set; } = string.Empty;

        [BsonElement("status")]
        public string Status { get; set; }

        [BsonElement("clicked")]
        public bool Clicked { get; set; }
    }
}
