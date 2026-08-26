namespace SurveyOperationBackend.Exceptions
{
    public class APIValidationException : Exception
    {
        public List<string> Errors { get; }

        public APIValidationException(
            List<string> errors)
            : base("Validation failed.")
        {
            Errors = errors;
        }
    }
}