using System.ComponentModel.DataAnnotations;

namespace SurveyOperationBackend.DTOs.Survey
{
    public class CreateSurveyDto
    {
        [Required(ErrorMessage = "Username is required.")]
        [StringLength(100, MinimumLength = 3, ErrorMessage = "Username must be between 3 and 100 characters.")]
        public string Username { get; set; } = string.Empty;


        [Required(ErrorMessage = "Account name is required.")]
        [StringLength(150, ErrorMessage = "Account name cannot exceed 150 characters.")]
        public string AccountName { get; set; } = string.Empty;


        [Required(ErrorMessage = "Business name is required.")]
        [StringLength(150, ErrorMessage = "Business name cannot exceed 150 characters.")]
        public string BusinessName { get; set; } = string.Empty;


        [Range(1,5, ErrorMessage = "Rating must be between 1 and 5.")]
        public int Rating { get; set; }


        [Required(ErrorMessage = "Feedback is required.")]
        [StringLength(1000, ErrorMessage = "Feedback cannot exceed 1000 characters.")]
        public string Feedback { get; set; } = string.Empty;
    }
}