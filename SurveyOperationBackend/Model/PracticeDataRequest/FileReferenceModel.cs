namespace SurveyOperationBackend.Model.PracticeDataRequest
{
    public class FileReferenceModel
    {
        public string FileName { get; set; } = string.Empty;

        public string BlobName { get; set; } = string.Empty;

        public string ContentType { get; set; } = string.Empty;
        
        public long Size { get; set; }

        public DateTime UploadedAt { get; set; } = DateTime.UtcNow;
    }
}