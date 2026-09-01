using MongoDB.Bson;
using MongoDB.Driver;
using SurveyOperationBackend.DTOs.PracticeDataRequest;
using SurveyOperationBackend.Model.PracticeDataRequest;
using SurveyOperationBackend.Settings;

namespace SurveyOperationBackend.Services
{
    public class PracticeDataRequestService(IMongoClient mongoClient, MongoDbSettings mongoDbSettings, AzureBlobStorageService _azureBlobStorageService)
    {

        private readonly IMongoCollection<PracticeDataRequestModel> _collection = mongoClient.GetDatabase(mongoDbSettings.DatabaseName)
                                                                                                .GetCollection<PracticeDataRequestModel>(mongoDbSettings.PracticeDataRequestCollectionName);


        private readonly IMongoCollection<CounterModel> _counterCollection = mongoClient.GetDatabase(mongoDbSettings.DatabaseName)
                                                                                  .GetCollection<CounterModel>(mongoDbSettings.CounterCollectionName);


        public async Task<PracticeDataRequestModel> CreateAsync(CreatePracticeDataRequestDto dto)
        {
            var practiceObjectId = ObjectId.GenerateNewId().ToString();

            var practiceId = await GetNextSequenceValueAsync();

            var uploadedFiles = new List<string>();

            try
            {
                var model = new PracticeDataRequestModel
                {
                    Id = practiceObjectId,

                    PracticeId = practiceId,

                    PracticeName = dto.PracticeName.Trim(),

                    Website = string.IsNullOrWhiteSpace(dto.Website) ? null : dto.Website.Trim(),

                    PhoneNumber = dto.PhoneNumber.Trim(),

                    PublicEmail = dto.PublicEmail.Trim(),

                    ProposedUrl = dto.ProposedUrl.Trim(),

                    CreatedAt = DateTime.UtcNow
                };


                model.Logo = await UploadFileAsync(dto.Logo!, $"practices/{practiceId}/logo", uploadedFiles);


                model.Favicon = await UploadFileAsync(dto.Favicon!, $"practices/{practiceId}/favicon", uploadedFiles);


                model.Invoice.Header = await UploadFileAsync(dto.Invoice.Header!, $"practices/{practiceId}/invoice/header", uploadedFiles);


                model.Invoice.Footer = await UploadFileAsync(dto.Invoice.Footer!, $"practices/{practiceId}/invoice/footer", uploadedFiles);


                model.ContactPerson = new ContactPersonModel
                {
                    Name = dto.ContactPerson.Name.Trim(),

                    Email = dto.ContactPerson.Email.Trim(),

                    PhoneNumber = dto.ContactPerson.PhoneNumber.Trim()
                };


                model.DataConversion.Businesses = await UploadFileAsync(dto.DataConversion.Businesses!, $"practices/{practiceId}/data-conversion/businesses", uploadedFiles);


                model.DataConversion.Contacts = await UploadFileAsync(dto.DataConversion.Contacts!, $"practices/{practiceId}/data-conversion/contacts", uploadedFiles);


                model.DataConversion.Invoices = await UploadFileAsync(dto.DataConversion.Invoices!, $"practices/{practiceId}/data-conversion/invoices", uploadedFiles);


                model.DataConversion.CreditNotes = await UploadFileAsync(dto.DataConversion.CreditNotes!, $"practices/{practiceId}/data-conversion/credit-notes", uploadedFiles);


                model.DataConversion.Receipts = await UploadFileAsync(dto.DataConversion.Receipts!, $"practices/{practiceId}/data-conversion/receipts", uploadedFiles);


                model.DataConversion.SubscriptionAndDD = await UploadFileAsync(dto.DataConversion.SubscriptionAndDD!, $"practices/{practiceId}/data-conversion/subscription-and-dd", uploadedFiles);


                model.DataConversion.Tasks = await UploadFileAsync(dto.DataConversion.Tasks!, $"practices/{practiceId}/data-conversion/tasks", uploadedFiles);


                model.DataConversion.Users = await UploadFileAsync(dto.DataConversion.Users!, $"practices/{practiceId}/data-conversion/users", uploadedFiles);



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



        private async Task<FileReferenceModel> UploadFileAsync(IFormFile file, string folder, List<string> uploadedFiles)
        {
            var extension = Path.GetExtension(file.FileName).ToLowerInvariant();

            var fileName = $"{Guid.NewGuid():N}{extension}";

            var blobName = $"{folder}/{fileName}";

            var fileReference = await _azureBlobStorageService.UploadFileAsync(file, blobName);

            uploadedFiles.Add(blobName);
            
            return fileReference;
        }



        private async Task<long> GetNextSequenceValueAsync()
        {
            var filter = Builders<CounterModel>.Filter.Eq(x => x.Id, "PracticeDataRequest");
            var update = Builders<CounterModel>.Update.Inc(x => x.Sequence, 1);
            var options = new FindOneAndUpdateOptions<CounterModel>
            {
                IsUpsert = true,
                ReturnDocument = ReturnDocument.After
            };
            var counter = await _counterCollection.FindOneAndUpdateAsync(filter, update, options);
            return counter.Sequence;
        }

    }
}
