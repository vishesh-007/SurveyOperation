namespace SurveyOperationBackend.Settings
{
    public class MongoDbSettings
    {
        public string ConnectionString { get; set; } = string.Empty;

        public string DatabaseName { get; set; } = string.Empty;

        public string SurveyCollectionName { get; set; } = string.Empty;

        public string PracticeDataRequestCollectionName { get; set; } = string.Empty;
    }
}