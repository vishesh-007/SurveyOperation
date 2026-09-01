using MongoDB.Bson.Serialization.Attributes;

namespace SurveyOperationBackend.Model.PracticeDataRequest
{
    public class CounterModel
    {
        [BsonId]
        public string Id { get; set; } = string.Empty;

        public long Sequence { get; set; }
    }
}
