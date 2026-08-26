import {
    Dropdown,
    Stack,
    Text,
    type IDropdownOption,
} from "@fluentui/react";

interface SurveyPaginationProps {
    pageNumber: number;
    pageSize: number;
    totalRecords: number;
    totalPages: number;
    pageNumbers: number[];
    pageSizeOptions: IDropdownOption[];

    onPageSizeChange: (
        event: React.FormEvent<HTMLDivElement>,
        option?: IDropdownOption
    ) => void;

    onPageChange: (
        page: number
    ) => void;
}

const SurveyPagination = ({
    pageNumber,
    pageSize,
    totalRecords,
    totalPages,
    pageNumbers,
    pageSizeOptions,
    onPageSizeChange,
    onPageChange,
}: SurveyPaginationProps) => {

    const firstRecord =
        totalRecords === 0
            ? 0
            : (pageNumber - 1) * pageSize + 1;

    const lastRecord =
        Math.min(
            pageNumber * pageSize,
            totalRecords
        );

    return (
        <div
            style={{
                height: 52,
                borderTop: "1px solid #edebe9",
                display: "flex",
                alignItems: "center",
                padding: "0 10px",
                boxSizing: "border-box",
            }}
        >
            <Stack
                horizontal
                verticalAlign="center"
                tokens={{ childrenGap: 6 }}
            >
                <Text
                    styles={{
                        root: {
                            color: "#605e5c",
                            fontSize: 12,
                        },
                    }}
                >
                    Show
                </Text>

                <Dropdown
                    selectedKey={pageSize}
                    options={pageSizeOptions}
                    onChange={onPageSizeChange}
                    styles={{
                        root: {
                            width: 65,
                        },

                        dropdown: {
                            minWidth: 65,
                        },
                    }}
                />

                <Text
                    styles={{
                        root: {
                            color: "#605e5c",
                            fontSize: 12,
                        },
                    }}
                >
                    items
                </Text>
            </Stack>


            <div
                style={{
                    marginLeft: "auto",
                    display: "flex",
                    alignItems: "center",
                    gap: 4,
                }}
            >
                <Text
                    style={pageNumberStyle}
                    onClick={() =>
                        pageNumber > 1 &&
                        onPageChange(1)
                    }
                >
                    {"|<"}
                </Text>


                <Text
                    style={pageNumberStyle}
                    onClick={() =>
                        pageNumber > 1 &&
                        onPageChange(
                            pageNumber - 1
                        )
                    }
                >
                    {"<"}
                </Text>


                {pageNumbers.map((page) => (
                    <Text
                        key={page}
                        style={{
                            ...pageNumberStyle,
                            ...(page === pageNumber
                                ? activePageStyle
                                : {}),
                        }}
                        onClick={() =>
                            onPageChange(page)
                        }
                    >
                        {page}
                    </Text>
                ))}


                <Text
                    style={pageNumberStyle}
                    onClick={() =>
                        pageNumber < totalPages &&
                        onPageChange(
                            pageNumber + 1
                        )
                    }
                >
                    {">"}
                </Text>


                <Text
                    style={pageNumberStyle}
                    onClick={() =>
                        pageNumber < totalPages &&
                        onPageChange(totalPages)
                    }
                >
                    {">|"}
                </Text>


                <Text
                    styles={{
                        root: {
                            marginLeft: 10,
                            color: "#605e5c",
                            fontSize: 12,
                        },
                    }}
                >
                    {firstRecord} - {lastRecord} of{" "}
                    {totalRecords}
                </Text>
            </div>
        </div>
    );
};


const pageNumberStyle: React.CSSProperties = {
    minWidth: 28,
    textAlign: "center",
    padding: "4px 6px",
    cursor: "pointer",
    fontSize: 12,
};


const activePageStyle: React.CSSProperties = {
    color: "#d83b01",
    fontWeight: 600,
    borderBottom: "2px solid #d83b01",
};


export default SurveyPagination;