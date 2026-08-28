using Microsoft.AspNetCore.Http;

namespace SurveyOperationBackend.DTOs.PracticeDataRequest
{
    public class InvoiceFilesDto
    {
        public IFormFile? Header { get; set; }

        public IFormFile? Footer { get; set; }
    }
}