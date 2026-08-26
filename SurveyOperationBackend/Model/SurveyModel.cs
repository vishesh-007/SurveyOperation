using MongoDB.Bson;
using MongoDB.Bson.Serialization.Attributes;

namespace SurveyOperationBackend.Model
{
    [BsonIgnoreExtraElements]
    public class SurveyModel
    {
        [BsonId]
        [BsonRepresentation(BsonType.ObjectId)]
        public string Id { get; set; } = string.Empty;

        public long AutoNumber { get; set; }

        public string RefNo { get; set; } = string.Empty;

        [BsonIgnoreIfNull]
        public string Username { get; set; } = string.Empty;

        [BsonIgnoreIfNull]
        public string AccountName { get; set; } = string.Empty;

        [BsonIgnoreIfNull]
        public string BusinessName { get; set; } = string.Empty;

        public int Rating { get; set; }

        public string Feedback { get; set; } = string.Empty;

        public SurveyStatus Status { get; set; } = SurveyStatus.undefined;

        public DateTime CreatedAt { get; set; } = DateTime.UtcNow;
    }

}