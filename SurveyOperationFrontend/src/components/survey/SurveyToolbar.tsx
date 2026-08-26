import {
    DefaultButton,
    IconButton,
    PrimaryButton,
    SearchBox,
    Stack,
} from "@fluentui/react";
import type { RefObject } from "react";

interface SurveyToolbarProps {
    search: string;
    hasFilters: boolean;
    activeFiltersText: string;

    onAddSurvey: () => void;
    onRefresh: () => void;
    onDownload: () => void;

    onSearchChange: (
        value: string
    ) => void;

    onSearchClear: () => void;

    onAddFilter: () => void;

    onClearFilters: () => void;

    filterButtonRef: RefObject<HTMLDivElement | null>;
}

const SurveyToolbar = ({
    search,
    hasFilters,
    activeFiltersText,
    onAddSurvey,
    onRefresh,
    onDownload,
    onSearchChange,
    onSearchClear,
    onAddFilter,
    onClearFilters,
    filterButtonRef
}: SurveyToolbarProps) => {

    return (
        <Stack
            horizontal
            verticalAlign="center"
            styles={{
                root: {
                    padding: "8px 10px",
                    minHeight: 46,
                    boxSizing: "border-box",
                },
            }}
        >

            <PrimaryButton
                text="Add survey"
                iconProps={{
                    iconName: "Add",
                }}
                onClick={onAddSurvey}
            />


            <DefaultButton
                text="Refresh"
                iconProps={{
                    iconName: "Refresh",
                }}
                styles={{
                    root: {
                        marginLeft: 8,
                    },
                }}
                onClick={onRefresh}
            />


            <DefaultButton
                text="Download"
                iconProps={{
                    iconName: "CloudDownload",
                }}
                styles={{
                    root: {
                        marginLeft: 8,
                    },
                }}
                onClick={onDownload}
            />


            <div
                style={{
                    flexGrow: 1,
                }}
            />


            <SearchBox
                placeholder="Search"
                styles={{
                    root: {
                        width: 180,
                        marginRight: 8,
                    },
                }}
                value={search}
                onChange={(
                    _event,
                    newValue
                ) => {
                    onSearchChange(
                        newValue ?? ""
                    );
                }}
                onClear={onSearchClear}
            />


            <div ref={filterButtonRef}>
                <DefaultButton
                    text="Add filter"
                    iconProps={{
                        iconName: "Filter",
                    }}
                    onClick={onAddFilter}
                />
            </div>


            {hasFilters && (
                <div
                    style={{
                        display: "flex",
                        alignItems: "center",
                        paddingLeft: 10,
                        fontSize: 12,
                        color: "#605e5c",
                    }}
                >
                    <span>
                        Active filters:{" "}
                        {activeFiltersText}
                    </span>

                    <IconButton
                        iconProps={{
                            iconName: "Cancel",
                        }}
                        title="Clear filters"
                        ariaLabel="Clear filters"
                        styles={{
                            root: {
                                width: 24,
                                height: 24,
                                marginLeft: 4,
                            },

                            rootHovered: {
                                color: "#a4262c",
                            },
                        }}
                        onClick={onClearFilters}
                    />
                </div>
            )}
        </Stack>
    );
};

export default SurveyToolbar;