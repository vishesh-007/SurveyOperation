using Microsoft.AspNetCore.Mvc;
using SurveyOperationBackend.DTOs.Common;
using SurveyOperationBackend.DTOs.Survey;
using SurveyOperationBackend.Helper;
using SurveyOperationBackend.Model;
using SurveyOperationBackend.Services;

namespace SurveyOperationBackend.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class SurveyController(SurveyService surveyService) : ControllerBase
    {
        private readonly SurveyService _surveyService = surveyService;

        [HttpPost("create")]
        public async Task<ActionResult<APIResponse<SurveyModel>>> CreateSurvey([FromBody] CreateSurveyDto dto)
        {
            var survey = await _surveyService.CreateSurveyAsync(dto);

            return Ok(APIResponse.Success(survey, "Survey created successfully."));
        }



        [HttpGet]
        public async Task<ActionResult<APIResponse<PaginatedResponseDto<SurveyModel>>>> GetSurveys([FromQuery] SurveyQueryDto query)
        {
            var result  = await _surveyService.GetSurveysAsync(query);

            return Ok(APIResponse.Success(result, "Surveys retrieved successfully."));
        }



        [HttpGet("export")]
        public async Task<IActionResult> ExportSurveys([FromQuery] SurveyQueryDto query)
        {
            var fileBytes =
                await _surveyService.ExportSurveysAsync(query);

            return File(
                fileBytes,
                "text/csv",
                $"Surveys-{DateTime.UtcNow:yyyyMMddHHmmss}.csv");
        }


        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteSurvey(string id)
        {
            var deleted = await _surveyService.DeleteSurveyAsync(id);

            if (!deleted)
            {
                return NotFound(
                    APIResponse.Failure<object>(
                        "Survey not found or cannot be deleted.",
                        new List<string>
                        {
                    "The survey may not exist or may already be deleted."
                        }
                    )
                );
            }
            return Ok(APIResponse.Success<object>(null, "Survey deleted successfully."));
        }



        [HttpPut("{id}")]
        public async Task<ActionResult<APIResponse<SurveyModel>>> UpdateSurvey(string id, [FromBody] CreateSurveyDto dto)
        {
            var survey = await _surveyService.UpdateSurveyAsync(id, dto);

            if(survey == null)
            {
                return NotFound(
                    APIResponse.Failure<object>(
                        "Survey not found or cannot be updated.",
                        new List<string>
                        {
                            "The survey may not exist or may already be deleted."
                        }));
            }


            return Ok(
                APIResponse.Success(
                    survey,
                    "Survey updated successfully."));
        }
    }
}
