import {
    DefaultButton,
    Icon,
    mergeStyleSets,
} from "@fluentui/react";

import {
    useFormikContext,
} from "formik";

import type {
    PracticeDataRequestValues,
} from "../../types/practice";


interface ReviewStepProps {
    onEditStep: (
        step: number
    ) => void;
}


const styles = mergeStyleSets({

    container: {
        maxWidth: 1000,
    },

    heading: {
        fontSize: 18,
        fontWeight: 600,
        color: "#323130",
        marginBottom: 4,
    },

    description: {
        fontSize: 13,
        color: "#605e5c",
        marginBottom: 20,
    },

    section: {
        border: "1px solid #edebe9",
        borderRadius: 8,
        marginBottom: 16,
        overflow: "hidden",
        backgroundColor: "#ffffff",
    },

    sectionHeader: {
        display: "flex",
        alignItems: "center",
        padding: "12px 16px",
        backgroundColor: "#f8f8f8",
        borderBottom: "1px solid #edebe9",
    },

    sectionIcon: {
        fontSize: 17,
        marginRight: 9,
        color: "#d83b01",
    },

    sectionTitle: {
        fontSize: 14,
        fontWeight: 600,
        color: "#323130",
        flex: 1,
    },

    content: {
        padding: 16,
    },

    grid: {
        display: "grid",
        gridTemplateColumns:
            "repeat(2, minmax(0, 1fr))",
        gap: "14px 28px",
    },

    field: {
        minWidth: 0,
    },

    label: {
        fontSize: 11,
        color: "#605e5c",
        marginBottom: 3,
    },

    value: {
        fontSize: 13,
        color: "#323130",
        wordBreak: "break-word",
    },

    fileList: {
        display: "grid",
        gridTemplateColumns:
            "repeat(2, minmax(0, 1fr))",
        gap: 10,
    },

    fileItem: {
        display: "flex",
        alignItems: "center",
        padding: 10,
        border: "1px solid #edebe9",
        borderRadius: 5,
        backgroundColor: "#faf9f8",
    },

    fileIcon: {
        fontSize: 16,
        color: "#107c10",
        marginRight: 8,
    },

    fileName: {
        fontSize: 12,
        color: "#323130",
        overflow: "hidden",
        textOverflow: "ellipsis",
        whiteSpace: "nowrap",
    },

    emptyValue: {
        color: "#a19f9d",
        fontStyle: "italic",
    },

});


const ReviewStep = ({
    onEditStep,
}: ReviewStepProps) => {

    const {
        values,
    } =
        useFormikContext<
            PracticeDataRequestValues
        >();


    const renderValue = (
        value: string
    ) => {

        if (!value.trim()) {
            return (
                <span
                    className={
                        styles.emptyValue
                    }
                >
                    Not provided
                </span>
            );
        }

        return value;
    };


    const renderFile = (
        file: File | null
    ) => {

        if (!file) {
            return (
                <span
                    className={
                        styles.emptyValue
                    }
                >
                    Not uploaded
                </span>
            );
        }


        const fileSize =
            file.size < 1024 * 1024
                ? `${(
                    file.size / 1024
                ).toFixed(1)} KB`
                : `${(
                    file.size /
                    (1024 * 1024)
                ).toFixed(1)} MB`;


        return (
            <div
                className={
                    styles.fileItem
                }
            >

                <Icon
                    iconName="Completed"
                    className={
                        styles.fileIcon
                    }
                />

                <div
                    style={{
                        minWidth: 0,
                    }}
                >

                    <div
                        className={
                            styles.fileName
                        }
                        title={file.name}
                    >
                        {file.name}
                    </div>

                    <div
                        style={{
                            fontSize: 11,
                            color: "#605e5c",
                            marginTop: 2,
                        }}
                    >
                        {fileSize}
                    </div>

                </div>

            </div>
        );
    };


    return (
        <div
            className={
                styles.container
            }
        >

            <div
                className={
                    styles.heading
                }
            >
                Review & Submit
            </div>

            <div
                className={
                    styles.description
                }
            >
                Review all the information
                provided before submitting the
                practice onboarding request.
            </div>


            {/* Practice Information */}

            <div
                className={
                    styles.section
                }
            >

                <div
                    className={
                        styles.sectionHeader
                    }
                >

                    <Icon
                        iconName="ContactInfo"
                        className={
                            styles.sectionIcon
                        }
                    />

                    <span
                        className={
                            styles.sectionTitle
                        }
                    >
                        Practice Information
                    </span>

                    <DefaultButton
                        text="Edit"
                        iconProps={{
                            iconName: "Edit",
                        }}
                        onClick={() =>
                            onEditStep(1)
                        }
                    />

                </div>


                <div
                    className={
                        styles.content
                    }
                >

                    <div
                        className={
                            styles.grid
                        }
                    >

                        <div
                            className={
                                styles.field
                            }
                        >
                            <div
                                className={
                                    styles.label
                                }
                            >
                                Practice Name
                            </div>

                            <div
                                className={
                                    styles.value
                                }
                            >
                                {renderValue(
                                    values.practiceName
                                )}
                            </div>
                        </div>


                        <div
                            className={
                                styles.field
                            }
                        >
                            <div
                                className={
                                    styles.label
                                }
                            >
                                Website
                            </div>

                            <div
                                className={
                                    styles.value
                                }
                            >
                                {renderValue(
                                    values.website
                                )}
                            </div>
                        </div>


                        <div
                            className={
                                styles.field
                            }
                        >
                            <div
                                className={
                                    styles.label
                                }
                            >
                                Phone Number
                            </div>

                            <div
                                className={
                                    styles.value
                                }
                            >
                                {renderValue(
                                    values.phoneNumber
                                )}
                            </div>
                        </div>


                        <div
                            className={
                                styles.field
                            }
                        >
                            <div
                                className={
                                    styles.label
                                }
                            >
                                Public Email
                            </div>

                            <div
                                className={
                                    styles.value
                                }
                            >
                                {renderValue(
                                    values.publicEmail
                                )}
                            </div>
                        </div>


                        <div
                            className={
                                styles.field
                            }
                        >
                            <div
                                className={
                                    styles.label
                                }
                            >
                                Proposed URL
                            </div>

                            <div
                                className={
                                    styles.value
                                }
                            >
                                {renderValue(
                                    values.proposedUrl
                                )}
                            </div>
                        </div>

                    </div>


                    <div
                        style={{
                            marginTop: 18,
                        }}
                    >

                        <div
                            className={
                                styles.label
                            }
                        >
                            Branding Files
                        </div>

                        <div
                            className={
                                styles.fileList
                            }
                        >

                            {renderFile(
                                values.logo
                            )}

                            {renderFile(
                                values.favicon
                            )}

                        </div>

                    </div>

                </div>

            </div>


            {/* Invoice */}

            <div
                className={
                    styles.section
                }
            >

                <div
                    className={
                        styles.sectionHeader
                    }
                >

                    <Icon
                        iconName="PDF"
                        className={
                            styles.sectionIcon
                        }
                    />

                    <span
                        className={
                            styles.sectionTitle
                        }
                    >
                        Invoice Sample
                    </span>

                    <DefaultButton
                        text="Edit"
                        iconProps={{
                            iconName: "Edit",
                        }}
                        onClick={() =>
                            onEditStep(2)
                        }
                    />

                </div>


                <div
                    className={
                        styles.content
                    }
                >

                    <div
                        className={
                            styles.fileList
                        }
                    >

                        {renderFile(
                            values.invoice.header
                        )}

                        {renderFile(
                            values.invoice.footer
                        )}

                    </div>

                </div>

            </div>


            {/* Contact Person */}

            <div
                className={
                    styles.section
                }
            >

                <div
                    className={
                        styles.sectionHeader
                    }
                >

                    <Icon
                        iconName="People"
                        className={
                            styles.sectionIcon
                        }
                    />

                    <span
                        className={
                            styles.sectionTitle
                        }
                    >
                        Contact Person
                    </span>

                    <DefaultButton
                        text="Edit"
                        iconProps={{
                            iconName: "Edit",
                        }}
                        onClick={() =>
                            onEditStep(3)
                        }
                    />

                </div>


                <div
                    className={
                        styles.content
                    }
                >

                    <div
                        className={
                            styles.grid
                        }
                    >

                        <div
                            className={
                                styles.field
                            }
                        >

                            <div
                                className={
                                    styles.label
                                }
                            >
                                Name
                            </div>

                            <div
                                className={
                                    styles.value
                                }
                            >
                                {renderValue(
                                    values.contactPerson
                                        .name
                                )}
                            </div>

                        </div>


                        <div
                            className={
                                styles.field
                            }
                        >

                            <div
                                className={
                                    styles.label
                                }
                            >
                                Email
                            </div>

                            <div
                                className={
                                    styles.value
                                }
                            >
                                {renderValue(
                                    values.contactPerson
                                        .email
                                )}
                            </div>

                        </div>


                        <div
                            className={
                                styles.field
                            }
                        >

                            <div
                                className={
                                    styles.label
                                }
                            >
                                Phone Number
                            </div>

                            <div
                                className={
                                    styles.value
                                }
                            >
                                {renderValue(
                                    values.contactPerson
                                        .phoneNumber
                                )}
                            </div>

                        </div>

                    </div>

                </div>

            </div>


            {/* Data Conversion */}

            <div
                className={
                    styles.section
                }
            >

                <div
                    className={
                        styles.sectionHeader
                    }
                >

                    <Icon
                        iconName="ExcelDocument"
                        className={
                            styles.sectionIcon
                        }
                    />

                    <span
                        className={
                            styles.sectionTitle
                        }
                    >
                        Data Conversion
                    </span>

                    <DefaultButton
                        text="Edit"
                        iconProps={{
                            iconName: "Edit",
                        }}
                        onClick={() =>
                            onEditStep(4)
                        }
                    />

                </div>


                <div
                    className={
                        styles.content
                    }
                >

                    <div
                        className={
                            styles.fileList
                        }
                    >

                        {renderFile(
                            values.dataConversion
                                .businesses
                        )}

                        {renderFile(
                            values.dataConversion
                                .contacts
                        )}

                        {renderFile(
                            values.dataConversion
                                .invoices
                        )}

                        {renderFile(
                            values.dataConversion
                                .creditNotes
                        )}

                        {renderFile(
                            values.dataConversion
                                .receipts
                        )}

                        {renderFile(
                            values.dataConversion
                                .subscriptionAndDD
                        )}

                        {renderFile(
                            values.dataConversion
                                .tasks
                        )}

                        {renderFile(
                            values.dataConversion
                                .users
                        )}

                    </div>

                </div>

            </div>

        </div>
    );
};


export default ReviewStep;