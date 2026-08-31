using Azure.Storage.Blobs;
using Microsoft.AspNetCore.Http;
using SurveyOperationBackend.Settings;
using SurveyOperationBackend.DTOs.PracticeDataRequest;
using SurveyOperationBackend.Model.PracticeDataRequest;

namespace SurveyOperationBackend.Services
{
    public class AzureBlobStorageService(AzureStorageSettings azureStorageSettings)
    {

        private readonly BlobContainerClient _containerClient = new BlobServiceClient(azureStorageSettings.ConnectionString)
                                                                .GetBlobContainerClient(azureStorageSettings.ContainerName);


        public async Task<FileReferenceModel>UploadFileAsync(IFormFile file, string blobName)
        {
            var blobClient = _containerClient.GetBlobClient(blobName);

            await using var stream = file.OpenReadStream();

            await blobClient.UploadAsync(stream, overwrite: false);

            return new FileReferenceModel 
            {
                FileName = Path.GetFileName(file.FileName),

                BlobName = blobName,

                ContentType = file.ContentType,

                Size = file.Length,

                UploadedAt = DateTime.UtcNow
            };
        }


        public async Task DeleteFileAsync(string blobName)
        {
            var blobClient = _containerClient.GetBlobClient(blobName);

            await blobClient.DeleteIfExistsAsync();
        }

    }
}
