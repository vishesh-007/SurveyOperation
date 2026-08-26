using SurveyOperationBackend.DTOs.Common;

namespace SurveyOperationBackend.DTOs.Survey
{
    public class SurveyQueryDto : PaginatedQueryDto
    {
        public string? Search { get; set; }

        public Dictionary<string, string>? Filters { get; set; }

        public string? SortBy { get; set; }

        public string? SortOrder { get; set; }
    }
}
