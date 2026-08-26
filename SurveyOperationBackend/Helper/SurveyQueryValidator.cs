using SurveyOperationBackend.DTOs.Survey;

namespace SurveyOperationBackend.Helper
{
    public static class SurveyQueryValidator
    {
        private static readonly HashSet<string> AllowedSortFields =
            new(StringComparer.OrdinalIgnoreCase)
            {
                "username",
                "accountname",
                "businessname",
                "feedback",
                "refno",
                "rating"
            };

        private static readonly HashSet<string> AllowedSortOrders =
            new(StringComparer.OrdinalIgnoreCase)
            {
                "asc",
                "desc"
            };


        public static List<string> Validate(
            SurveyQueryDto query)
        {
            var errors = new List<string>();

            if (!string.IsNullOrWhiteSpace(query.SortBy))
            {
                if (!AllowedSortFields.Contains(
                    query.SortBy.Trim()))
                {
                    errors.Add(
                        $"Invalid sortBy value. Allowed values are: " +
                        $"{string.Join(", ", AllowedSortFields)}.");
                }
            }


            if (!string.IsNullOrWhiteSpace(query.SortOrder))
            {
                if (!AllowedSortOrders.Contains(
                    query.SortOrder.Trim()))
                {
                    errors.Add(
                        "Invalid sortOrder value. Allowed values are: asc, desc.");
                }
            }


            return errors;
        }
    }
}