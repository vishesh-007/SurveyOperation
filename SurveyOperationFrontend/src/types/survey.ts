export const SurveyStatus = {
  Undefined: 0,
  Saved: 1,
  Deleted: 2,
} as const;

export type SurveyStatus =
  (typeof SurveyStatus)[keyof typeof SurveyStatus];

export interface Survey {
    id: string;
    autoNumber: number;
    refNo: string;
    username: string;
    accountName: string;
    businessName: string;
    rating: number;
    feedback: string;
    status: SurveyStatus;
    createdAt: string;
}

export interface CreateSurveyDto {
    username: string;
    accountName: string;
    businessName: string;
    rating: number;
    feedback: string;
}

export interface PaginatedResponseDto<T> {
    items: T[];

    pageNumber: number;

    pageSize: number;

    totalRecords: number;

    totalPages: number;

    hasPreviousPage: boolean;

    hasNextPage: boolean;
}

export interface APIResponse<T> {
    success: boolean;

    message: string;

    data: T | null;

    errors: string[] | null;
}

export interface SurveyQueryDto {
    pageNumber: number;

    pageSize: number;

    search?: string;

    filters?: Record<string, string>;

    sortBy?: string;

    sortOrder?: string;
}