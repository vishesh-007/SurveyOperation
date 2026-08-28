using MongoDB.Bson.Serialization.Attributes;

namespace SurveyOperationBackend.Model.PracticeDataRequest
{
    public class DataConversionFilesModel
    {
        [BsonIgnoreIfNull]
        public FileReferenceModel? Businesses { get; set; }

        [BsonIgnoreIfNull]
        public FileReferenceModel? Contacts { get; set; }

        [BsonIgnoreIfNull]
        public FileReferenceModel? Invoices { get; set; }

        [BsonIgnoreIfNull] 
        public FileReferenceModel? CreditNotes { get; set; }

        [BsonIgnoreIfNull]
        public FileReferenceModel? Receipts { get; set; }

        [BsonIgnoreIfNull]
        public FileReferenceModel? SubscriptionAndDD { get; set; }

        [BsonIgnoreIfNull]
        public FileReferenceModel? Tasks { get; set; }

        [BsonIgnoreIfNull]
        public FileReferenceModel? Users { get; set; }
    }
}
