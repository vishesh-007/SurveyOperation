namespace SurveyOperationBackend.DTOs.Common
{
    public class PaginatedResponseDto<T>
    {
        public List<T> Items { get; set; } = new();

        public int PageNumber { get; set; }

        public int PageSize { get; set; }

        public long TotalRecords { get; set; }

        public int TotalPages { get; set; }

        public Boolean HasPreviousPage => PageNumber > 1;

        public Boolean HasNextPage => PageNumber < TotalPages;

    }
}
