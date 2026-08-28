using Microsoft.AspNetCore.Mvc;
using SurveyOperationBackend.DTOs.Common;
using SurveyOperationBackend.DTOs.PracticeDataRequest;
using SurveyOperationBackend.Helper;
using SurveyOperationBackend.Model;
using SurveyOperationBackend.Model.PracticeDataRequest;
using SurveyOperationBackend.Services;

namespace SurveyOperationBackend.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class PracticeDataRequestController(PracticeDataRequestService practiceDataRequestService) : ControllerBase
    {


        [HttpPost]
        [Consumes("multipart/form-data")]
        public async Task<ActionResult<APIResponse<PracticeDataRequestModel>>>Create([FromForm] CreatePracticeDataRequestDto dto)
        {
            if(dto == null)
            {
                return BadRequest(APIResponse.Failure<PracticeDataRequestModel>("Request body is required."));
            }

            PracticeDataRequestValidator.Validate(dto);


            var result = await practiceDataRequestService.CreateAsync(dto);


            return Ok(APIResponse.Success(result, "Practice data request created successfully."));
        }
    }
}