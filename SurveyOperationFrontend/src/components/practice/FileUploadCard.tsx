import {
    DefaultButton,
    Icon,
    mergeStyleSets,
} from "@fluentui/react";

import React, {
    useState,
} from "react";


const MAX_FILE_SIZE =
    10 * 1024 * 1024;


const styles = mergeStyleSets({

    card: {
        border: "1px solid #edebe9",
        borderRadius: 6,
        padding: 16,
        backgroundColor: "#faf9f8",
    },

    header: {
        display: "flex",
        alignItems: "center",
        marginBottom: 10,
    },

    icon: {
        fontSize: 20,
        color: "#d83b01",
        marginRight: 10,
    },

    title: {
        fontSize: 14,
        fontWeight: 600,
        color: "#323130",
    },

    description: {
        fontSize: 12,
        color: "#605e5c",
        marginBottom: 12,
    },

    fileName: {
        marginTop: 8,
        fontSize: 12,
        color: "#107c10",
        wordBreak: "break-word",
    },

    error: {
        color: "#a4262c",
        fontSize: 12,
        marginTop: 6,
    },

});


interface FileUploadCardProps {

    label: string;

    description?: string;

    value: File | null;

    accept?: string;

    iconName?: string;

    error?: string;

    onChange: (
        file: File | null
    ) => void;
}


const FileUploadCard = ({
    label,
    description,
    value,
    accept,
    iconName = "Upload",
    error,
    onChange,
}: FileUploadCardProps) => {

    const [fileError, setFileError] =
        useState<string>("");


    const inputId =
        `file-upload-${label
            .toLowerCase()
            .replace(
                /[^a-z0-9]+/g,
                "-"
            )}`;


    const getAcceptedExtensions = () => {

        if (!accept) {
            return [];
        }

        return accept
            .split(",")
            .map(
                extension =>
                    extension
                        .trim()
                        .toLowerCase()
            );
    };


    const handleFileChange = (
        event:
            React.ChangeEvent<HTMLInputElement>
    ) => {

        const file =
            event.currentTarget.files?.[0]
            ?? null;


        setFileError("");


        if (!file) {
            return;
        }


        // File size validation

        if (
            file.size >
            MAX_FILE_SIZE
        ) {

            setFileError(
                "File size must be 10 MB or less."
            );

            event.currentTarget.value =
                "";

            onChange(null);

            return;
        }


        // File extension validation

        const acceptedExtensions =
            getAcceptedExtensions();


        if (
            acceptedExtensions.length > 0
        ) {

            const fileExtension =
                "." +
                file.name
                    .split(".")
                    .pop()
                    ?.toLowerCase();


            if (
                !acceptedExtensions.includes(
                    fileExtension
                )
            ) {

                setFileError(
                    `Invalid file type. Allowed: ${acceptedExtensions.join(
                        ", "
                    )}`
                );

                event.currentTarget.value =
                    "";

                onChange(null);

                return;
            }
        }


        onChange(file);
    };


    return (
        <div
            className={
                styles.card
            }
        >

            <div
                className={
                    styles.header
                }
            >

                <Icon
                    iconName={iconName}
                    className={
                        styles.icon
                    }
                />

                <span
                    className={
                        styles.title
                    }
                >
                    {label}
                </span>

            </div>


            {description && (
                <div
                    className={
                        styles.description
                    }
                >
                    {description}
                </div>
            )}


            <DefaultButton
                text="Choose file"
                iconProps={{
                    iconName: "Upload",
                }}
                onClick={() =>
                    document
                        .getElementById(
                            inputId
                        )
                        ?.click()
                }
            />


            <input
                id={inputId}
                type="file"
                accept={accept}
                style={{
                    display: "none",
                }}
                onChange={
                    handleFileChange
                }
            />


            {value && !fileError && (
                <div
                    className={
                        styles.fileName
                    }
                >
                    ✓ {value.name}
                </div>
            )}


            {fileError && (
                <div
                    className={
                        styles.error
                    }
                >
                    {fileError}
                </div>
            )}


            {!fileError && error && (
                <div
                    className={
                        styles.error
                    }
                >
                    {error}
                </div>
            )}

        </div>
    );
};


export default FileUploadCard;