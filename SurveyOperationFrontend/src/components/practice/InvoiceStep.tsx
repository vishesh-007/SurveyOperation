import {
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
        maxWidth: 900,
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

    uploadGrid: {
        display: "grid",
        gridTemplateColumns:
            "repeat(2, minmax(0, 1fr))",
        gap: 16,
    },

});


const InvoiceStep = () => {

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
                Invoice Sample
            </div>

            <div
                className={
                    styles.description
                }
            >
                Upload a sample invoice
                containing the header and
                footer used by the practice.
            </div>


            <div
                className={
                    styles.uploadGrid
                }
            >

                <FileUploadCard
                    label="Invoice Header"
                    description="Upload the invoice header sample."
                    value={
                        values.invoice.header
                    }
                    accept=".pdf"
                    iconName="PDF"
                    error={
                        touched.invoice?.header
                            ? errors.invoice?.header
                            : undefined
                    }
                    onChange={(file) => {

                        setFieldValue(
                            "invoice.header",
                            file
                        );

                        setFieldTouched(
                            "invoice.header",
                            true,
                            false
                        );

                    }}
                />


                <FileUploadCard
                    label="Invoice Footer"
                    description="Upload the invoice footer sample."
                    value={
                        values.invoice.footer
                    }
                    accept=".pdf"
                    iconName="PDF"
                    error={
                        touched.invoice?.footer
                            ? errors.invoice?.footer
                            : undefined
                    }
                    onChange={(file) => {

                        setFieldValue(
                            "invoice.footer",
                            file
                        );

                        setFieldTouched(
                            "invoice.footer",
                            true,
                            false
                        );

                    }}
                />

            </div>

        </div>
    );
};


export default InvoiceStep;