using CsvHelper;
using MongoDB.Bson;
using MongoDB.Driver;
using SurveyOperationBackend.DTOs.Common;
using SurveyOperationBackend.DTOs.Survey;
using SurveyOperationBackend.Exceptions;
using SurveyOperationBackend.Helper;
using SurveyOperationBackend.Model;
using SurveyOperationBackend.Settings;
using System.Globalization;
using System.Text;

namespace SurveyOperationBackend.Services
{
    public class SurveyService
    {
        private readonly IMongoCollection<SurveyModel> _surveyCollection;

        public SurveyService(IMongoClient mongoClient, MongoDbSettings settings)
        {
            var database = mongoClient.GetDatabase(settings.DatabaseName);
            _surveyCollection = database.GetCollection<SurveyModel>(settings.SurveyCollectionName);
        }


        public async Task<SurveyModel> CreateSurveyAsync(CreateSurveyDto dto)
        {

            var maxAutoNumber = await _surveyCollection
                .Find(Builders<SurveyModel>.Filter.Empty)
                .SortByDescending(s => s.AutoNumber)
                .Project(s => s.AutoNumber)
                .FirstOrDefaultAsync();


            var nextAutoNumber = maxAutoNumber + 1;

            var survey = new SurveyModel
            {
                AutoNumber = nextAutoNumber,
                RefNo = $"SUR-{nextAutoNumber:D3}",

                Username = dto.Username,
                AccountName = dto.AccountName,
                BusinessName = dto.BusinessName,
                Rating = dto.Rating,
                Feedback = dto.Feedback,
                Status = SurveyStatus.Saved,
                CreatedAt = DateTime.UtcNow
            };


            await _surveyCollection.InsertOneAsync(survey);
            return survey;
        }



        public async Task<PaginatedResponseDto<SurveyModel>> GetSurveysAsync(SurveyQueryDto query)
        {
            var validationErrors = SurveyQueryValidator.Validate(query);

            if (validationErrors.Count > 0)
            {
                throw new APIValidationException(
                    validationErrors);
            }


            var filter = BuildSurveyFilter(query);


            //TotalRecords
            var totalRecords = await _surveyCollection.CountDocumentsAsync(filter);


            //Sorting
            var sortBy = query.SortBy?.Trim().ToLower();

            var sortOrder = query.SortOrder?.Trim().ToLower();

            var sortDescending = sortOrder == "desc";

            SortDefinition<SurveyModel> sort;

            switch (sortBy) {
                case "username":
                    sort = sortDescending ? Builders<SurveyModel>.Sort.Descending(s => s.Username) : Builders<SurveyModel>.Sort.Ascending(s => s.Username);
                    break;

                case "accountname":
                    sort = sortDescending ? Builders<SurveyModel>.Sort.Descending(s => s.AccountName) : Builders<SurveyModel>.Sort.Ascending(s => s.AccountName);
                    break;

                case "businessname":
                    sort = sortDescending ? Builders<SurveyModel>.Sort.Descending(s => s.BusinessName) : Builders<SurveyModel>.Sort.Ascending(s => s.BusinessName);
                    break;

                case "feedback":
                    sort = sortDescending ? Builders<SurveyModel>.Sort.Descending(s => s.Feedback) : Builders<SurveyModel>.Sort.Ascending(s => s.Feedback);
                    break;

                case "refno":
                    sort = sortDescending ? Builders<SurveyModel>.Sort.Descending(s => s.RefNo) : Builders<SurveyModel>.Sort.Ascending(s => s.RefNo);
                    break;

                case "rating":
                    sort = sortDescending ? Builders<SurveyModel>.Sort.Descending(s => s.Rating) : Builders<SurveyModel>.Sort.Ascending(s => s.Rating);
                    break;

                default:
                    sort = Builders<SurveyModel>.Sort.Ascending(s => s.CreatedAt);
                    break;
            }



            //Pagination

            var skip = (query.PageNumber - 1) * query.PageSize;

            var items = await _surveyCollection
                .Find(filter)
                .Sort(sort)
                .Skip(skip)
                .Limit(query.PageSize)
                .ToListAsync();


            //Total Pages

            var totalPages = (int)Math.Ceiling((double)totalRecords / query.PageSize);


            return new PaginatedResponseDto<SurveyModel>
            {
                Items = items,
                PageNumber = query.PageNumber,
                PageSize = query.PageSize,
                TotalRecords = totalRecords,
                TotalPages = totalPages
            };

        }





        public async Task<byte[]> ExportSurveysAsync(SurveyQueryDto query)
        {
            var validationErrors = SurveyQueryValidator.Validate(query);

            if (validationErrors.Count > 0)
            {
                throw new APIValidationException(
                    validationErrors);
            }


            var filter = BuildSurveyFilter(query);

            // Get all matching records
            var surveys = await _surveyCollection
                .Find(filter)
                .ToListAsync();

            // CSV generation
            using var memoryStream =
                new MemoryStream();

            using var streamWriter =
                new StreamWriter(
                    memoryStream,
                    new UTF8Encoding(true));

            using var csv =
                new CsvWriter(
                    streamWriter,
                    CultureInfo.InvariantCulture);

            csv.WriteRecords(
                surveys.Select(s => new
                {
                    SNo = s.AutoNumber,
                    RefNo = s.RefNo,
                    Username = s.Username,
                    AccountName = s.AccountName,
                    BusinessName = s.BusinessName,
                    Rating = s.Rating,
                    Feedback = s.Feedback
                }));

            await streamWriter.FlushAsync();

            return memoryStream.ToArray();
        }





        public async Task<bool> DeleteSurveyAsync(string id)
        {
            var filter =
                Builders<SurveyModel>.Filter.And(
                    Builders<SurveyModel>.Filter.Eq(
                        s => s.Id,
                        id),

                    Builders<SurveyModel>.Filter.Eq(
                        s => s.Status,
                        SurveyStatus.Saved)
                );

            var update =
                Builders<SurveyModel>.Update
                    .Set(
                        s => s.Status,
                        SurveyStatus.Deleted);

            var result =
                await _surveyCollection.UpdateOneAsync(
                    filter,
                    update);

            return result.ModifiedCount > 0;
        }




        //Update
        public async Task<SurveyModel?> UpdateSurveyAsync(string id, CreateSurveyDto dto)
        {
            var filter = Builders<SurveyModel>.Filter.And(
                Builders<SurveyModel>.Filter.Eq(s => s.Id, id),
                Builders<SurveyModel>.Filter.Eq(s => s.Status, SurveyStatus.Saved)
            );

            var update = Builders<SurveyModel>.Update
                .Set(s => s.Username, dto.Username)
                .Set(s => s.AccountName, dto.AccountName)
                .Set(s => s.BusinessName, dto.BusinessName)
                .Set(s => s.Rating, dto.Rating)
                .Set(s => s.Feedback, dto.Feedback);

            var options = new FindOneAndUpdateOptions<SurveyModel>
            {
                ReturnDocument = ReturnDocument.After // optional: return the updated document
            };

            return await _surveyCollection.FindOneAndUpdateAsync(filter, update, options);
        }







        private FilterDefinition<SurveyModel> BuildSurveyFilter(SurveyQueryDto query)
        {
            var filterBuilder = Builders<SurveyModel>.Filter;

            var filter = filterBuilder.In(s=>s.Status, new[] { SurveyStatus.Saved, SurveyStatus.Deleted });

            // Search
            if (!string.IsNullOrWhiteSpace(query.Search))
            {
                var search = query.Search.Trim();

                var searchFilter =
                    filterBuilder.Or(
                        filterBuilder.Regex(
                            x => x.RefNo,
                            new BsonRegularExpression(
                                search,
                                "i")),

                        filterBuilder.Regex(
                            x => x.Username,
                            new BsonRegularExpression(
                                search,
                                "i")),

                        filterBuilder.Regex(
                            x => x.AccountName,
                            new BsonRegularExpression(
                                search,
                                "i")),

                        filterBuilder.Regex(
                            x => x.BusinessName,
                            new BsonRegularExpression(
                                search,
                                "i")),

                        filterBuilder.Regex(
                            x => x.Feedback,
                            new BsonRegularExpression(
                                search,
                                "i"))
                    );

                filter &= searchFilter;
            }

            // Filters
            if (query.Filters != null &&
                query.Filters.Count > 0)
            {
                foreach (var filterItem in query.Filters)
                {
                    var filterName =
                        filterItem.Key.Trim().ToLower();

                    var filterValue =
                        filterItem.Value?.Trim();

                    if (string.IsNullOrWhiteSpace(
                        filterValue))
                    {
                        continue;
                    }

                    switch (filterName)
                    {
                        case "rating":

                            if (int.TryParse(
                                filterValue,
                                out var rating))
                            {
                                filter &= filterBuilder.Eq(
                                    s => s.Rating,
                                    rating);
                            }

                            break;

                        case "status":

                            if (int.TryParse(
                                filterValue,
                                out var statusValue) &&
                                Enum.IsDefined(
                                    typeof(SurveyStatus),
                                    statusValue))
                            {
                                filter &= filterBuilder.Eq(
                                    s => s.Status,
                                    (SurveyStatus)statusValue);
                            }

                            break;
                    }
                }
            }

            return filter;
        }
    }
}
