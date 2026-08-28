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

import FileUploadCard
    from "./FileUploadCard";


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

    templateSection: {
        border: "1px solid #edebe9",
        borderRadius: 6,
        padding: 16,
        marginBottom: 24,
        backgroundColor: "#f8f8f8",
    },

    templateHeader: {
        display: "flex",
        alignItems: "center",
        marginBottom: 6,
    },

    templateIcon: {
        fontSize: 18,
        color: "#d83b01",
        marginRight: 8,
    },

    templateTitle: {
        fontSize: 14,
        fontWeight: 600,
        color: "#323130",
    },

    templateDescription: {
        fontSize: 12,
        color: "#605e5c",
        marginBottom: 12,
    },

    uploadGrid: {
        display: "grid",
        gridTemplateColumns:
            "repeat(2, minmax(0, 1fr))",
        gap: 16,
    },

});


const DataConversionStep = () => {

    const {
        values,
        errors,
        touched,
        setFieldValue,
        setFieldTouched,
    } =
        useFormikContext<
            PracticeDataRequestValues
        >();


    const handleFileChange = (
        field: string,
        file: File | null
    ) => {

        setFieldValue(
            field,
            file
        );

        setFieldTouched(
            field,
            true,
            false
        );
    };

    const downloadTemplate = (
        fileName: string
    ) => {

        const link =
            document.createElement("a");

        link.href =
            `/templates/${fileName}`;

        link.download =
            fileName;

        document.body.appendChild(link);

        link.click();

        document.body.removeChild(link);
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
                Data Conversion
            </div>


            <div
                className={
                    styles.description
                }
            >
                Upload the required sample
                data files for the practice.
                These files will be used for
                the data conversion process.
            </div>


            {/* Templates */}

            <div
                className={
                    styles.templateSection
                }
            >

                <div
                    className={
                        styles.templateHeader
                    }
                >

                    <Icon
                        iconName="ExcelDocument"
                        className={
                            styles.templateIcon
                        }
                    />

                    <span
                        className={
                            styles.templateTitle
                        }
                    >
                        Data Conversion Templates
                    </span>

                </div>


                <div
                    className={
                        styles.templateDescription
                    }
                >
                    Download the required
                    templates before preparing
                    the sample data files.
                </div>


                <div
                    style={{
                        display: "flex",
                        gap: 8,
                        flexWrap: "wrap",
                    }}
                >

                    <DefaultButton
                        text="Download Business Template"
                        iconProps={{
                            iconName:
                                "ExcelDocument",
                        }}
                        onClick={() => {
                            downloadTemplate("AO - Businesses.xlsx")
                        }}
                    />

                    <DefaultButton
                        text="Download Contact Template"
                        iconProps={{
                            iconName:
                                "ExcelDocument",
                        }}
                        onClick={() => {
                            downloadTemplate("AO - Contacts.xlsx")
                        }}
                    />

                </div>

            </div>


            {/* Uploads */}

            <div
                className={
                    styles.uploadGrid
                }
            >

                <FileUploadCard
                    label="Businesses"
                    description="Upload the businesses sample file."
                    value={
                        values.dataConversion
                            .businesses
                    }
                    accept=".csv,.xls,.xlsx"
                    iconName="ExcelDocument"
                    error={
                        touched.dataConversion
                            ?.businesses
                            ? errors.dataConversion
                                ?.businesses
                            : undefined
                    }
                    onChange={(file) =>
                        handleFileChange(
                            "dataConversion.businesses",
                            file
                        )
                    }
                />


                <FileUploadCard
                    label="Contacts"
                    description="Upload the contacts sample file."
                    value={
                        values.dataConversion
                            .contacts
                    }
                    accept=".csv,.xls,.xlsx"
                    iconName="ExcelDocument"
                    error={
                        touched.dataConversion
                            ?.contacts
                            ? errors.dataConversion
                                ?.contacts
                            : undefined
                    }
                    onChange={(file) =>
                        handleFileChange(
                            "dataConversion.contacts",
                            file
                        )
                    }
                />


                <FileUploadCard
                    label="Invoices"
                    description="Upload the invoices sample file."
                    value={
                        values.dataConversion
                            .invoices
                    }
                    accept=".csv,.xls,.xlsx"
                    iconName="ExcelDocument"
                    error={
                        touched.dataConversion
                            ?.invoices
                            ? errors.dataConversion
                                ?.invoices
                            : undefined
                    }
                    onChange={(file) =>
                        handleFileChange(
                            "dataConversion.invoices",
                            file
                        )
                    }
                />


                <FileUploadCard
                    label="Credit Notes"
                    description="Upload the credit notes sample file."
                    value={
                        values.dataConversion
                            .creditNotes
                    }
                    accept=".csv,.xls,.xlsx"
                    iconName="ExcelDocument"
                    error={
                        touched.dataConversion
                            ?.creditNotes
                            ? errors.dataConversion
                                ?.creditNotes
                            : undefined
                    }
                    onChange={(file) =>
                        handleFileChange(
                            "dataConversion.creditNotes",
                            file
                        )
                    }
                />


                <FileUploadCard
                    label="Receipts"
                    description="Upload the receipts sample file."
                    value={
                        values.dataConversion
                            .receipts
                    }
                    accept=".csv,.xls,.xlsx"
                    iconName="ExcelDocument"
                    error={
                        touched.dataConversion
                            ?.receipts
                            ? errors.dataConversion
                                ?.receipts
                            : undefined
                    }
                    onChange={(file) =>
                        handleFileChange(
                            "dataConversion.receipts",
                            file
                        )
                    }
                />


                <FileUploadCard
                    label="Subscription & DD"
                    description="Upload the subscription and DD sample file."
                    value={
                        values.dataConversion
                            .subscriptionAndDD
                    }
                    accept=".csv,.xls,.xlsx"
                    iconName="ExcelDocument"
                    error={
                        touched.dataConversion
                            ?.subscriptionAndDD
                            ? errors.dataConversion
                                ?.subscriptionAndDD
                            : undefined
                    }
                    onChange={(file) =>
                        handleFileChange(
                            "dataConversion.subscriptionAndDD",
                            file
                        )
                    }
                />


                <FileUploadCard
                    label="Tasks"
                    description="Upload the tasks sample file."
                    value={
                        values.dataConversion
                            .tasks
                    }
                    accept=".csv,.xls,.xlsx"
                    iconName="ExcelDocument"
                    error={
                        touched.dataConversion
                            ?.tasks
                            ? errors.dataConversion
                                ?.tasks
                            : undefined
                    }
                    onChange={(file) =>
                        handleFileChange(
                            "dataConversion.tasks",
                            file
                        )
                    }
                />


                <FileUploadCard
                    label="Users"
                    description="Upload the users sample file."
                    value={
                        values.dataConversion
                            .users
                    }
                    accept=".csv,.xls,.xlsx"
                    iconName="ExcelDocument"
                    error={
                        touched.dataConversion
                            ?.users
                            ? errors.dataConversion
                                ?.users
                            : undefined
                    }
                    onChange={(file) =>
                        handleFileChange(
                            "dataConversion.users",
                            file
                        )
                    }
                />

            </div>

        </div>
    );
};


export default DataConversionStep;