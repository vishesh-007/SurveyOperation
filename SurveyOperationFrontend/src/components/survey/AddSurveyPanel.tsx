import { useEffect, useState } from "react";
import type { CreateSurveyDto, Survey } from "../../types/survey";

import {
    DefaultButton,
    Panel,
    PanelType,
    PrimaryButton,
    Rating,
    RatingSize,
    TextField,
    mergeStyleSets,
} from "@fluentui/react";

const styles = mergeStyleSets({
    form: {
        paddingTop: 8,
    },

    field: {
        marginBottom: 18,
    },

    footer: {
        display: "flex",
        justifyContent: "flex-end",
        gap: 8,
    },
});


const ratingStyles = {
    ratingStar: {
        color: "#f7b500",
    },

    ratingStarBack: {
        color: "#d2d0ce",
    },

    ratingStarFront: {
        color: "#f7b500",
    },

    ratingButton: {
        color: "#f7b500",

        selectors: {
            ":hover": {
                color: "#f7b500",
            },

            ":focus": {
                color: "#f7b500",
            },
        },
    },
};

interface AddSurveyPanelProps {
    isOpen: boolean;

    editingSurvey: Survey | null;

    onDismiss: () => void;

    onSave: (
        data: CreateSurveyDto
    ) => Promise<void>;
}

const AddSurveyPanel = ({
    isOpen,
    editingSurvey,
    onDismiss,
    onSave,
}: AddSurveyPanelProps) => {
    const [username, setUsername] =
        useState<string>("");

    const [accountName, setAccountName] =
        useState<string>("");

    const [businessName, setBusinessName] =
        useState<string>("");

    const [rating, setRating] =
        useState<number>(0);

    const [feedback, setFeedback] =
        useState<string>("");

    const [showValidation, setShowValidation] =
        useState<boolean>(false);


    useEffect(() => {
        if (editingSurvey) {
            setUsername(
                editingSurvey.username
            );

            setAccountName(
                editingSurvey.accountName
            );

            setBusinessName(
                editingSurvey.businessName
            );

            setRating(
                editingSurvey.rating
            );

            setFeedback(
                editingSurvey.feedback
            );

            setShowValidation(false);
        } else {
            resetForm();
        }
    }, [editingSurvey]);


    const handleSave = async () => {
        setShowValidation(true);

        if (
            !username.trim() ||
            !accountName.trim() ||
            !businessName.trim() ||
            rating === 0
        ) {
            return;
        }

        const surveyData: CreateSurveyDto = {
            username: username.trim(),
            accountName: accountName.trim(),
            businessName: businessName.trim(),
            rating,
            feedback: feedback.trim(),
        };

        await onSave(surveyData);

        resetForm();
    };

    const handleDismiss = () => {
        resetForm();
        onDismiss();
    };

    const resetForm = () => {
        setUsername("");
        setAccountName("");
        setBusinessName("");
        setRating(0);
        setFeedback("");
        setShowValidation(false);
    };

    return (
        <Panel
            isOpen={isOpen}
            onDismiss={handleDismiss}
            type={PanelType.medium}
            headerText={
                editingSurvey
                    ? "Edit survey"
                    : "Add survey"
            }
            closeButtonAriaLabel="Close"
            isFooterAtBottom
            onRenderFooterContent={() => (
                <div className={styles.footer}>
                    <DefaultButton
                        text="Cancel"
                        onClick={handleDismiss}
                    />

                    <PrimaryButton
                        text={
                            editingSurvey
                                ? "Update"
                                : "Save"
                        }
                        onClick={handleSave}
                    />
                </div>
            )}
        >
            <div className={styles.form}>
                <div className={styles.field}>
                    <TextField
                        label="Username"
                        required
                        value={username}
                        onChange={(_event, newValue) =>
                            setUsername(newValue ?? "")
                        }
                        errorMessage={
                            showValidation &&
                                !username.trim()
                                ? "Username is required."
                                : undefined
                        }
                    />
                </div>

                <div className={styles.field}>
                    <TextField
                        label="Account name"
                        required
                        value={accountName}
                        onChange={(_event, newValue) =>
                            setAccountName(newValue ?? "")
                        }
                        errorMessage={
                            showValidation &&
                                !accountName.trim()
                                ? "Account name is required."
                                : undefined
                        }
                    />
                </div>

                <div className={styles.field}>
                    <TextField
                        label="Business name"
                        required
                        value={businessName}
                        onChange={(_event, newValue) =>
                            setBusinessName(newValue ?? "")
                        }
                        errorMessage={
                            showValidation &&
                                !businessName.trim()
                                ? "Business name is required."
                                : undefined
                        }
                    />
                </div>


                <div className={styles.field}>
                    <label
                        style={{
                            display: "block",
                            fontSize: 14,
                            fontWeight: 600,
                            marginBottom: 6,
                        }}
                    >
                        Rating <span style={{ color: "#a4262c" }}>*</span>
                    </label>

                    <Rating
                        max={5}
                        size={RatingSize.Large}
                        allowZeroStars
                        rating={rating}
                        onChange={(
                            _event,
                            newRating
                        ) => {
                            setRating(newRating ?? 0);
                        }}
                        styles={ratingStyles}
                    />

                    {showValidation &&
                        rating === 0 && (
                            <div
                                style={{
                                    color: "#a4262c",
                                    fontSize: 12,
                                    marginTop: 4,
                                }}
                            >
                                Rating is required.
                            </div>
                        )}
                </div>


                <div className={styles.field}>
                    <TextField
                        label="Feedback"
                        value={feedback}
                        onChange={(_event, newValue) =>
                            setFeedback(newValue ?? "")
                        }
                        multiline
                        rows={5}
                        resizable={false}
                    />
                </div>
            </div>
        </Panel>
    );
};

export default AddSurveyPanel;