namespace SurveyOperationBackend.DTOs.Common
{
    public class PaginatedQueryDto
    {
        private const int MaxPageSize = 30;

        private int _pageNumber = 1;

        public int PageNumber
        {
            get => _pageNumber;
            set => _pageNumber = value < 1 ? 1 : value;
        }

        private int _pageSize = 5;

        public int PageSize
        {
            get => _pageSize;
            set
            {
                if (value < 1)
                    _pageSize = 1;
                else if (value > MaxPageSize)
                    _pageSize = MaxPageSize;
                else
                    _pageSize = value;
            }
        }
    }
}