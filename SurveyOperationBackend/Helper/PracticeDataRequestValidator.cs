using Microsoft.AspNetCore.Http;
using SurveyOperationBackend.DTOs.PracticeDataRequest;
using SurveyOperationBackend.Exceptions;

namespace SurveyOperationBackend.Helper
{
    public static class PracticeDataRequestValidator
    {
        private const long LogoMaxSize = 10 * 1024 * 1024;

        private const long FaviconMaxSize = 10 * 1024 * 1024;

        private const long InvoiceMaxSize = 10 * 1024 * 1024;

        private const long DataConversionMaxSize =
            10 * 1024 * 1024;


        public static void Validate(
            CreatePracticeDataRequestDto dto)
        {
            var errors = new List<string>();


            ValidateImage(
                dto.Logo,
                "Logo",
                LogoMaxSize,
                new[] { ".png", ".jpg", ".jpeg" },
                new[]
                {
                    "image/png",
                    "image/jpeg"
                },
                errors);


            ValidateImage(
                dto.Favicon,
                "Favicon",
                FaviconMaxSize,
                new[] { ".ico", ".png" },
                new[]
                {
                    "image/x-icon",
                    "image/vnd.microsoft.icon",
                    "image/png"
                },
                errors);


            ValidatePdf(
                dto.Invoice.Header,
                "Invoice header",
                InvoiceMaxSize,
                errors);


            ValidatePdf(
                dto.Invoice.Footer,
                "Invoice footer",
                InvoiceMaxSize,
                errors);


            ValidateDataFile(
                dto.DataConversion.Businesses,
                "Businesses",
                errors);


            ValidateDataFile(
                dto.DataConversion.Contacts,
                "Contacts",
                errors);


            ValidateDataFile(
                dto.DataConversion.Invoices,
                "Invoices",
                errors);


            ValidateDataFile(
                dto.DataConversion.CreditNotes,
                "Credit Notes",
                errors);


            ValidateDataFile(
                dto.DataConversion.Receipts,
                "Receipts",
                errors);


            ValidateDataFile(
                dto.DataConversion.SubscriptionAndDD,
                "Subscription & DD",
                errors);


            ValidateDataFile(
                dto.DataConversion.Tasks,
                "Tasks",
                errors);


            ValidateDataFile(
                dto.DataConversion.Users,
                "Users",
                errors);


            if (errors.Count > 0)
            {
                throw new APIValidationException(errors);
            }
        }


        private static void ValidateImage(
            IFormFile? file,
            string fieldName,
            long maxSize,
            string[] allowedExtensions,
            string[] allowedContentTypes,
            List<string> errors)
        {
            if (file == null)
            {
                errors.Add(
                    $"{fieldName} is required.");

                return;
            }


            ValidateBasicFile(
                file,
                fieldName,
                maxSize,
                allowedExtensions,
                allowedContentTypes,
                errors);
        }


        private static void ValidatePdf(
            IFormFile? file,
            string fieldName,
            long maxSize,
            List<string> errors)
        {
            if (file == null)
            {
                errors.Add(
                    $"{fieldName} is required.");

                return;
            }


            ValidateBasicFile(
                file,
                fieldName,
                maxSize,
                new[] { ".pdf" },
                new[]
                {
                    "application/pdf"
                },
                errors);
        }


        private static void ValidateDataFile(
            IFormFile? file,
            string fieldName,
            List<string> errors)
        {
            if (file == null)
            {
                errors.Add(
                    $"{fieldName} file is required.");

                return;
            }


            ValidateBasicFile(
                file,
                fieldName,
                DataConversionMaxSize,
                new[]
                {
                    ".csv",
                    ".xls",
                    ".xlsx"
                },
                new[]
                {
                    "text/csv",
                    "application/csv",
                    "application/vnd.ms-excel",
                    "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet"
                },
                errors);
        }


        private static void ValidateBasicFile(
            IFormFile file,
            string fieldName,
            long maxSize,
            string[] allowedExtensions,
            string[] allowedContentTypes,
            List<string> errors)
        {
            if (file.Length <= 0)
            {
                errors.Add(
                    $"{fieldName} cannot be empty.");

                return;
            }


            if (file.Length > maxSize)
            {
                errors.Add(
                    $"{fieldName} cannot exceed " +
                    $"{FormatFileSize(maxSize)}.");

                return;
            }


            var extension =
                Path.GetExtension(file.FileName)
                    .ToLowerInvariant();


            if (!allowedExtensions.Contains(extension))
            {
                errors.Add(
                    $"{fieldName} has an unsupported file format. " +
                    $"Allowed formats: " +
                    $"{string.Join(", ", allowedExtensions)}.");

                return;
            }


            if (!allowedContentTypes.Contains(
                    file.ContentType,
                    StringComparer.OrdinalIgnoreCase))
            {
                errors.Add(
                    $"{fieldName} has an unsupported content type.");

                return;
            }


            var fileName =
                Path.GetFileName(file.FileName);


            if (fileName.Length > 255)
            {
                errors.Add(
                    $"{fieldName} file name cannot exceed 255 characters.");
            }
        }


        private static string FormatFileSize(
            long bytes)
        {
            return
                $"{bytes / (1024 * 1024)} MB";
        }
    }
}