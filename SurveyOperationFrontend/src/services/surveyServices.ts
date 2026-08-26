import type {
    APIResponse,
    CreateSurveyDto,
    PaginatedResponseDto,
    Survey,
    SurveyQueryDto,
} from "../types/survey";
import axiosInstance from "./axiosService";


export const createSurvey = async (
    survey: CreateSurveyDto
): Promise<APIResponse<Survey>> => {
    const response =
        await axiosInstance.post<APIResponse<Survey>>(
            "/Survey/create",
            survey
        );

    return response.data;
};



export const getSurveys = async (
    query: SurveyQueryDto
): Promise<
    APIResponse<PaginatedResponseDto<Survey>>
> => {
    const response =
        await axiosInstance.get<
            APIResponse<PaginatedResponseDto<Survey>>
        >("/Survey", {
            params: {
                pageNumber: query.pageNumber,
                pageSize: query.pageSize,
                search: query.search,
                sortBy: query.sortBy,
                sortOrder: query.sortOrder,

                ...(query.filters
                    ? Object.fromEntries(
                        Object.entries(query.filters).map(
                            ([key, value]) => [
                                `filters[${key}]`,
                                value,
                            ]
                        )
                    )
                    : {}),
            },
        });

    return response.data;
};


//export csv
export const exportSurveys = async (
  query: SurveyQueryDto
): Promise<Blob> => {
  const response =
    await axiosInstance.get<Blob>(
      "/Survey/export",
      {
        params: {
          search: query.search,
          sortBy: query.sortBy,
          sortOrder: query.sortOrder,

          ...(query.filters
            ? Object.fromEntries(
                Object.entries(
                  query.filters
                ).map(
                  ([key, value]) => [
                    `filters[${key}]`,
                    value,
                  ]
                )
              )
            : {}),
        },

        responseType: "blob",
      }
    );

  return response.data;
};




//Delete
export const deleteSurvey = async (
  id: string
): Promise<APIResponse<null>> => {
  const response =
    await axiosInstance.delete<APIResponse<null>>(
      `/Survey/${id}`
    );

  return response.data;
};



//Update 
export const updateSurvey = async (
    id: string,
    data: CreateSurveyDto
): Promise<APIResponse<Survey>> => {
    const response = await axiosInstance.put<APIResponse<Survey>>(
        `/Survey/${id}`,
        data
    );

    return response.data;
};