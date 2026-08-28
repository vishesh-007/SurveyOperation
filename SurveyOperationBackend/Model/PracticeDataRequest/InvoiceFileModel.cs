using MongoDB.Bson.Serialization.Attributes;

namespace SurveyOperationBackend.Model.PracticeDataRequest
{
    public class InvoiceFileModel
    {
        [BsonIgnoreIfNull]
        public FileReferenceModel? Header { get; set; }

        [BsonIgnoreIfNull]
        public FileReferenceModel? Footer { get; set; }
    }
}
