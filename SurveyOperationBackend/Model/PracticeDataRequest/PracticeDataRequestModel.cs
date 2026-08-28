using MongoDB.Bson;
using MongoDB.Bson.Serialization.Attributes;
using System.ComponentModel.DataAnnotations;

namespace SurveyOperationBackend.Model.PracticeDataRequest
{
    [BsonIgnoreExtraElements]
    public class PracticeDataRequestModel
    {
        [BsonId]
        [BsonRepresentation(BsonType.ObjectId)]
        public string Id { get; set; } = string.Empty;


        public string PracticeName { get; set; } = string.Empty;

        [BsonIgnoreIfNull]
        public FileReferenceModel? Logo { get; set; }

        [BsonIgnoreIfNull]
        public FileReferenceModel? Favicon { get; set; }

        [BsonIgnoreIfNull]
        public string? Website { get; set; }

        public string PhoneNumber { get; set; } = string.Empty;


        public InvoiceFileModel Invoice { get; set; }
            = new();


        public string PublicEmail { get; set; } = string.Empty;
        public string ProposedUrl { get; set; } = string.Empty;


        public ContactPersonModel ContactPerson { get; set; }
            = new();


        public DataConversionFilesModel DataConversion { get; set; }
            = new();


        public DateTime CreatedAt { get; set; } = DateTime.UtcNow;

        [BsonIgnoreIfNull]
        public DateTime? UpdatedAt { get; set; }
    }
}