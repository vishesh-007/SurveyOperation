using Microsoft.AspNetCore.Http;

namespace SurveyOperationBackend.DTOs.PracticeDataRequest
{
    public class DataConversionFilesDto
    {
        public IFormFile? Businesses { get; set; }

        public IFormFile? Contacts { get; set; }

        public IFormFile? Invoices { get; set; }

        public IFormFile? CreditNotes { get; set; }

        public IFormFile? Receipts { get; set; }

        public IFormFile? SubscriptionAndDD { get; set; }

        public IFormFile? Tasks { get; set; }

        public IFormFile? Users { get; set; }
    }
}