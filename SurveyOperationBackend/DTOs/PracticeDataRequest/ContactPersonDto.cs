using System.ComponentModel.DataAnnotations;

namespace SurveyOperationBackend.DTOs.PracticeDataRequest
{
    public class ContactPersonDto
    {
        [Required(ErrorMessage = "Contact person name is required.")]
        [StringLength(100, MinimumLength = 2, ErrorMessage = "Contact person name must be between 2 and 100 characters.")]
        public string Name { get; set; } = string.Empty;


        [Required(ErrorMessage = "Contact email is required.")]
        [EmailAddress(ErrorMessage = "Enter a valid contact email address.")]
        [StringLength(100, ErrorMessage = "Contact email cannot exceed 100 characters.")]
        public string Email { get; set; } = string.Empty;


        [Required(ErrorMessage = "Contact phone number is required.")]
        [StringLength(15, MinimumLength = 7, ErrorMessage = "Contact phone number must be between 7 and 15 characters.")]
        public string PhoneNumber { get; set; } = string.Empty;
    }
}