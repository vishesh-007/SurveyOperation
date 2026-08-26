using Microsoft.AspNetCore.Mvc;
using MongoDB.Driver;
using SurveyOperationBackend.Exceptions;
using SurveyOperationBackend.Helper;
using SurveyOperationBackend.Services;
using SurveyOperationBackend.Settings;

var builder = WebApplication.CreateBuilder(args);

// Add services to the container.

builder.Services
    .AddControllers()
    .ConfigureApiBehaviorOptions(options =>
    {
        options.InvalidModelStateResponseFactory =
            context =>
            {
                var errors = context.ModelState
                    .Values
                    .SelectMany(v => v.Errors)
                    .Select(e =>
                        string.IsNullOrWhiteSpace(
                            e.ErrorMessage)
                            ? "Invalid value."
                            : e.ErrorMessage)
                    .ToList();

                var response =
                    APIResponse.Failure<object>(
                        "Validation failed.",
                        errors);

                return new BadRequestObjectResult(
                    response);
            };
    });



builder.Services.AddExceptionHandler<GlobalExceptionHandler>();
builder.Services.AddProblemDetails();


//Swagger
builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen();


//MongoDb settings
var mongoDbSettings = builder.Configuration.GetSection("MongoDbSettings").Get<MongoDbSettings>();

builder.Services.AddSingleton(mongoDbSettings);

builder.Services.AddSingleton<IMongoClient>(
    new MongoClient(mongoDbSettings.ConnectionString)
);


//SurveyService 
builder.Services.AddScoped<SurveyService>();

builder.Services.AddCors(options =>
{
    options.AddPolicy("FrontendPolicy", policy =>
    {
        policy
            .WithOrigins("http://localhost:5173")
            .AllowAnyHeader()
            .AllowAnyMethod();
    });
});


var app = builder.Build();

app.UseExceptionHandler();


// Configure the HTTP request pipeline.
if (app.Environment.IsDevelopment())
{
    app.UseSwagger();

    app.UseSwaggerUI();
}



app.UseHttpsRedirection();

app.UseCors("FrontendPolicy");

app.UseAuthorization();

app.MapControllers();

app.Run();
