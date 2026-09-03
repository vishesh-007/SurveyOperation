import {
    TextField,
    mergeStyleSets,
} from "@fluentui/react";

import {
    useFormikContext,
} from "formik";

import type {
    PracticeDataRequestValues,
} from "../../types/practice";
import FileUploadCard from "./FileUploadCard";

const styles = mergeStyleSets({
    section: {
        maxWidth: 1000,
        margin: "0 auto",
    },

    heading: {
        fontSize: 20,
        fontWeight: 600,
        color: "#323130",
        marginBottom: 4,
    },

    description: {
        fontSize: 13,
        color: "#605e5c",
        marginBottom: 24,
    },

    grid: {
        display: "grid",
        gridTemplateColumns:
            "repeat(2, minmax(0, 1fr))",
        gap: "20px 24px",
    },

    fullWidth: {
        gridColumn: "1 / -1",
    },

    error: {
        color: "#a4262c",
        fontSize: 12,
        marginTop: 4,
    },
});

const PracticeInformationStep = () => {

    const {
        values,
        setFieldValue,
        setFieldTouched,
        errors,
        touched,
    } =
        useFormikContext<PracticeDataRequestValues>();



    return (
        <div className={styles.section}>

            <div className={styles.heading}>
                Practice Information
            </div>

            <div className={styles.description}>
                Tell us about the practice you are
                onboarding.
            </div>

            <div className={styles.grid}>

                <TextField
                    label="Practice Name"
                    required
                    value={values.practiceName}
                    onChange={(
                        _event,
                        value
                    ) => {
                        setFieldValue(
                            "practiceName",
                            value ?? ""
                        );
                    }}
                    onBlur={() =>
                        setFieldTouched(
                            "practiceName",
                            true
                        )
                    }
                    errorMessage={
                        touched.practiceName
                            ? errors.practiceName
                            : undefined
                    }
                />

                <TextField
                    label="Website"
                    value={values.website}
                    placeholder="https://example.com"
                    onChange={(
                        _event,
                        value
                    ) => {
                        setFieldValue(
                            "website",
                            value ?? ""
                        );
                    }}
                    onBlur={() =>
                        setFieldTouched(
                            "website",
                            true
                        )
                    }
                    errorMessage={
                        touched.website
                            ? errors.website
                            : undefined
                    }
                />

                <TextField
                    label="Phone Number"
                    required
                    value={values.phoneNumber}
                    onChange={(
                        _event,
                        value
                    ) => {
                        setFieldValue(
                            "phoneNumber",
                            value ?? ""
                        );
                    }}
                    onBlur={() =>
                        setFieldTouched(
                            "phoneNumber",
                            true
                        )
                    }
                    errorMessage={
                        touched.phoneNumber
                            ? errors.phoneNumber
                            : undefined
                    }
                />

                <TextField
                    label="Public Email (No Reply)"
                    required
                    value={values.publicEmail}
                    placeholder="noreply@example.com"
                    onChange={(
                        _event,
                        value
                    ) => {
                        setFieldValue(
                            "publicEmail",
                            value ?? ""
                        );
                    }}
                    onBlur={() =>
                        setFieldTouched(
                            "publicEmail",
                            true
                        )
                    }
                    errorMessage={
                        touched.publicEmail
                            ? errors.publicEmail
                            : undefined
                    }
                />

                <TextField
                    label="Proposed URL"
                    required
                    placeholder="test.actingoffice.com"
                    value={values.proposedUrl}
                    onChange={(
                        _event,
                        value
                    ) => {
                        setFieldValue(
                            "proposedUrl",
                            value ?? ""
                        );
                    }}
                    onBlur={() =>
                        setFieldTouched(
                            "proposedUrl",
                            true
                        )
                    }
                    errorMessage={
                        touched.proposedUrl
                            ? errors.proposedUrl
                            : undefined
                    }
                />

            </div>

            <div
                style={{
                    marginTop: 28,
                }}
            >
                <div
                    style={{
                        fontSize: 16,
                        fontWeight: 600,
                        color: "#323130",
                        marginBottom: 4,
                    }}
                >
                    Branding
                </div>

                <div
                    style={{
                        fontSize: 13,
                        color: "#605e5c",
                        marginBottom: 14,
                    }}
                >
                    Upload the practice logo and
                    favicon.
                </div>

                <div style={{
                    display: "grid",
                    gridTemplateColumns:
                        "repeat(2, minmax(0, 1fr))",
                    gap: 16,
                }}>

                    {/* Logo */}
                    <FileUploadCard
                        label="Logo"
                        description="Upload the practice logo."
                        value={values.logo}
                        accept=".png,.jpg,.jpeg,.svg"
                        iconName="Picture"
                        error={
                            touched.logo
                                ? errors.logo
                                : undefined
                        }
                        onChange={(file) => {
                            setFieldValue(
                                "logo",
                                file
                            );

                            setFieldTouched(
                                "logo",
                                true,
                                false
                            );
                        }}
                    />

                    {/* Favicon */}
                    <FileUploadCard
                        label="Favicon"
                        description="Upload the practice favicon."
                        value={values.favicon}
                        accept=".png,.ico,.svg"
                        iconName="Globe"
                        error={
                            touched.favicon
                                ? errors.favicon
                                : undefined
                        }
                        onChange={(file) => {
                            setFieldValue(
                                "favicon",
                                file
                            );

                            setFieldTouched(
                                "favicon",
                                true,
                                false
                            );
                        }}
                    />

                </div>
            </div>

        </div>
    );
};

export default PracticeInformationStep;