import {
    DetailsList,
    DetailsListLayoutMode,
    IconButton,
    SelectionMode,
    type IColumn,
    type IDetailsRowProps,
    DetailsRow,
} from "@fluentui/react";

import type { Survey } from "../../types/survey";

interface SurveyTableProps {
    surveys: Survey[];
    pageNumber: number;
    pageSize:number;
    onEdit: (survey: Survey) => void;
    onDelete: (survey: Survey) => void;
}

const SurveyTable = ({
    surveys,
    pageNumber,
    pageSize,
    onDelete,
    onEdit,
}: SurveyTableProps) => {

    const columns: IColumn[] = [
        {
            key: "sno",
            name: "S.No.",
            minWidth: 60,
            maxWidth: 70,

            onRender: (_survey: Survey, index?: number) => {
                return (
                    (pageNumber - 1) * pageSize +
                    (index ?? 0) +
                    1
                );
            },
        },

        {
            key: "refNo",
            name: "Ref No",
            fieldName: "refNo",
            minWidth: 90,
            maxWidth: 110,
            isResizable: true,
        },

        {
            key: "username",
            name: "Username",
            fieldName: "username",
            minWidth: 120,
            maxWidth: 160,
            isResizable: true,
        },

        {
            key: "accountName",
            name: "Account name",
            fieldName: "accountName",
            minWidth: 140,
            maxWidth: 190,
            isResizable: true,
        },

        {
            key: "businessName",
            name: "Business name",
            fieldName: "businessName",
            minWidth: 150,
            maxWidth: 200,
            isResizable: true,
        },

        {
            key: "rating",
            name: "Rating",
            fieldName: "rating",
            minWidth: 90,
            maxWidth: 110,
        },

        {
            key: "feedback",
            name: "Feedback",
            fieldName: "feedback",
            minWidth: 200,
            isResizable: true,
        },

        {
            key: "actions",
            name: "Actions",
            minWidth: 80,
            maxWidth: 80,

            onRender: (survey: Survey) => {
                const isDeleted =
                    survey.status === 2;

                return (
                    <div
                        style={{
                            display: "flex",
                            alignItems: "center",
                            gap: 2,
                        }}
                    >
                        <IconButton
                            iconProps={{
                                iconName: "Edit",
                            }}
                            title={
                                isDeleted
                                    ? "Deleted survey"
                                    : "Edit survey"
                            }
                            ariaLabel={
                                isDeleted
                                    ? "Deleted survey"
                                    : "Edit survey"
                            }
                            disabled={isDeleted}
                            onClick={() => {
                                if (!isDeleted) {
                                    onEdit(survey);
                                }
                            }}
                        />

                        <IconButton
                            iconProps={{
                                iconName: "Delete",
                            }}
                            title={
                                isDeleted
                                    ? "Deleted survey"
                                    : "Delete survey"
                            }
                            ariaLabel={
                                isDeleted
                                    ? "Deleted survey"
                                    : "Delete survey"
                            }
                            disabled={isDeleted}
                            onClick={() => {
                                if (!isDeleted) {
                                    onDelete(survey);
                                }
                            }}
                        />
                    </div>
                );
            },
        },
    ];

    const onRenderRow = (
        props?: IDetailsRowProps
    ) => {
        if (!props) {
            return null;
        }

        const survey =
            props.item as Survey;

        const isDeleted =
            survey.status === 2;

        return (
            <DetailsRow
                {...props}
                styles={{
                    root: {
                        backgroundColor:
                            isDeleted
                                ? "#f3f2f1"
                                : "#ffffff",

                        color:
                            isDeleted
                                ? "#a19f9d"
                                : "#323130",

                        cursor:
                            isDeleted
                                ? "default"
                                : "default",

                        selectors: {
                            ":hover": {
                                backgroundColor:
                                    isDeleted
                                        ? "#f3f2f1"
                                        : "#f5f5f5",
                            },
                        },
                    },
                }}
            />
        );
    };

    return (
        <DetailsList
            items={surveys}
            columns={columns}
            layoutMode={
                DetailsListLayoutMode.justified
            }
            selectionMode={SelectionMode.none}
            compact
            onRenderRow={onRenderRow}
        />
    );
};

export default SurveyTable;