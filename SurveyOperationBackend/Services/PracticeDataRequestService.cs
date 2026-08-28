using MongoDB.Bson;
using MongoDB.Driver;
using SurveyOperationBackend.DTOs.PracticeDataRequest;
using SurveyOperationBackend.Model.PracticeDataRequest;
using SurveyOperationBackend.Settings;

namespace SurveyOperationBackend.Services
{
    public class PracticeDataRequestService
    {
        private readonly IMongoCollection<PracticeDataRequestModel> _collection;

        private readonly AzureBlobStorageService _azureBlobStorageService;


        public PracticeDataRequestService(IMongoClient mongoClient, MongoDbSettings mongoDbSettings, AzureBlobStorageService azureBlobStorageService)
        {
            var database = mongoClient.GetDatabase(mongoDbSettings.DatabaseName);

            _collection = database.GetCollection<PracticeDataRequestModel>(mongoDbSettings.PracticeDataRequestCollectionName);

            _azureBlobStorageService = azureBlobStorageService;
        }



        public async Task<PracticeDataRequestModel> CreateAsync(CreatePracticeDataRequestDto dto)
        {
            var practiceId = ObjectId.GenerateNewId().ToString();

            var uploadedFiles = new List<string>();

            try
            {
                var model = new PracticeDataRequestModel
                {
                    Id = practiceId,

                    PracticeName = dto.PracticeName.Trim(),

                    Website = string.IsNullOrWhiteSpace(dto.Website) ? null : dto.Website.Trim(),

                    PhoneNumber = dto.PhoneNumber.Trim(),

                    PublicEmail = dto.PublicEmail.Trim(),

                    ProposedUrl = dto.ProposedUrl.Trim(),

                    CreatedAt = DateTime.UtcNow
                };


                model.Logo = await UploadFileAsync(dto.Logo!, $"practices/{practiceId}/logo");


                model.Favicon = await UploadFileAsync(dto.Favicon!, $"practices/{practiceId}/favicon");


                model.Invoice.Header = await UploadFileAsync(dto.Invoice.Header!, $"practices/{practiceId}/invoice/header");


                model.Invoice.Footer = await UploadFileAsync(dto.Invoice.Footer!, $"practices/{practiceId}/invoice/footer");


                model.ContactPerson = new ContactPersonModel
                {
                    Name = dto.ContactPerson.Name.Trim(),

                    Email = dto.ContactPerson.Email.Trim(),

                    PhoneNumber = dto.ContactPerson.PhoneNumber.Trim()
                };


                model.DataConversion.Businesses = await UploadFileAsync(dto.DataConversion.Businesses!, $"practices/{practiceId}/data-conversion/businesses");


                model.DataConversion.Contacts = await UploadFileAsync(dto.DataConversion.Contacts!, $"practices/{practiceId}/data-conversion/contacts");


                model.DataConversion.Invoices = await UploadFileAsync(dto.DataConversion.Invoices!, $"practices/{practiceId}/data-conversion/invoices");


                model.DataConversion.CreditNotes = await UploadFileAsync(dto.DataConversion.CreditNotes!, $"practices/{practiceId}/data-conversion/credit-notes");


                model.DataConversion.Receipts = await UploadFileAsync(dto.DataConversion.Receipts!, $"practices/{practiceId}/data-conversion/receipts");


                model.DataConversion.SubscriptionAndDD = await UploadFileAsync(dto.DataConversion.SubscriptionAndDD!, $"practices/{practiceId}/data-conversion/subscription-and-dd");


                model.DataConversion.Tasks = await UploadFileAsync(dto.DataConversion.Tasks!, $"practices/{practiceId}/data-conversion/tasks");


                model.DataConversion.Users = await UploadFileAsync(dto.DataConversion.Users!, $"practices/{practiceId}/data-conversion/users");



                await _collection.InsertOneAsync(model);

                return model;
            }

            catch
            {
                foreach (var file in uploadedFiles)
                {
                    try
                    {
                        await _azureBlobStorageService.DeleteFileAsync(file);

                    }
                    catch
                    {

                    }
                }

                throw;

            }
        }



        private async Task<FileReferenceModel>UploadFileAsync(IFormFile file, string folder)
        {
            var extension = Path.GetExtension(file.FileName).ToLowerInvariant();

            var fileName = $"{Guid.NewGuid():N}{extension}";

            var blobName = $"{folder}/{fileName}";

            return await _azureBlobStorageService.UploadFileAsync(file, blobName);
        }
    }
}
