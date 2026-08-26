using SurveyOperationBackend.DTOs.Common;

namespace SurveyOperationBackend.Helper
{
    public class APIResponse
    {
        public static APIResponse<T> Success<T>(T data, string message)
        {
            return new APIResponse<T>
            {
                Success = true,
                Message = message,
                Data = data
            };
        }


        public static APIResponse<T> Failure<T> (string message, List<string>? errors = null)
        {
            return new APIResponse<T>
            {
                Success = false,
                Message = message, 
                Errors = errors
            };
        }
    }
}
