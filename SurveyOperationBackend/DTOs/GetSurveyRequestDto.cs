namespace SurveyOperationBackend.DTOs
{
    public class GetSurveyRequestDto
    {
        public int Page { get; set; } = 1;

        public int PageSize { get; set; } = 10;

        public string? SortField { get; set; }

        public string? SortOrder { get; set; }

        public string? Search { get; set; }

        public int? Rating { get; set; }
    }
}