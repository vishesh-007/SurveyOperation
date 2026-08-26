using Microsoft.AspNetCore.Diagnostics;
using SurveyOperationBackend.Helper;

namespace SurveyOperationBackend.Exceptions
{
    public class GlobalExceptionHandler
        : IExceptionHandler
    {
        private readonly ILogger<GlobalExceptionHandler> _logger;

        public GlobalExceptionHandler(
            ILogger<GlobalExceptionHandler> logger)
        {
            _logger = logger;
        }


        public async ValueTask<bool> TryHandleAsync(
            HttpContext httpContext,
            Exception exception,
            CancellationToken cancellationToken)
        {
            _logger.LogError(
                exception,
                "An unhandled exception occurred.");

            httpContext.Response.ContentType =
                "application/json";


            if (exception is APIValidationException validationException)
            {
                httpContext.Response.StatusCode =
                    StatusCodes.Status400BadRequest;

                var response =
                    APIResponse.Failure<object>(
                        "Validation failed.",
                        validationException.Errors);

                await httpContext.Response.WriteAsJsonAsync(
                    response,
                    cancellationToken);

                return true;
            }


            httpContext.Response.StatusCode =
                StatusCodes.Status500InternalServerError;

            var errorResponse =
                APIResponse.Failure<object>(
                    "An unexpected error occurred.",
                    new List<string>
                    {
                        "Something went wrong while processing the request."
                    });

            await httpContext.Response.WriteAsJsonAsync(
                errorResponse,
                cancellationToken);

            return true;
        }
    }
}