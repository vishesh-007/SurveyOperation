using Microsoft.AspNetCore.Http;
using System.ComponentModel.DataAnnotations;

namespace SurveyOperationBackend.DTOs.PracticeDataRequest
{
    public class CreatePracticeDataRequestDto
    {
        [Required(ErrorMessage = "Practice name is required.")]
        [StringLength(150, MinimumLength = 2, ErrorMessage = "Practice name must be between 2 and 150 characters.")]
        public string PracticeName { get; set; } = string.Empty;

        public IFormFile? Logo { get; set; }

        public IFormFile? Favicon { get; set; }

        [StringLength(2048, ErrorMessage = "Website URL cannot exceed 2048 characters.")]
        public string? Website { get; set; }

        [Required(ErrorMessage = "Phone number is required.")]
        [StringLength(15, MinimumLength = 7, ErrorMessage = "Phone number must be between 7 and 15 characters.")]
        public string PhoneNumber { get; set; } = string.Empty;

        public InvoiceFilesDto Invoice { get; set; } = new();

        [Required(ErrorMessage = "Public email is required.")]
        [EmailAddress(ErrorMessage = "Enter a valid public email address.")]
        [StringLength(100, ErrorMessage = "Public email cannot exceed 100 characters.")]
        public string PublicEmail { get; set; } = string.Empty;

        [Required(ErrorMessage = "Proposed URL is required.")]
        [StringLength(100, ErrorMessage = "Proposed URL cannot exceed 100 characters.")]
        public string ProposedUrl { get; set; } = string.Empty;

        public ContactPersonDto ContactPerson { get; set; } = new();

        public DataConversionFilesDto DataConversion { get; set; } = new();
    }
}