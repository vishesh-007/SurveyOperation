import {
    Icon,
    mergeStyleSets,
    Text,
} from "@fluentui/react";

const styles = mergeStyleSets({
    container: {
        display: "flex",
        alignItems: "center",
        width: "100%",
        padding: "20px 24px",
        boxSizing: "border-box",
        borderBottom: "1px solid #edebe9",
        backgroundColor: "#ffffff",
    },

    step: {
        display: "flex",
        alignItems: "center",
        flexShrink: 0,
    },

    clickableStep: {
        cursor: "pointer",

        selectors: {
            ":hover .stepCircle": {
                transform: "scale(1.05)",
            },
        },
    },

    stepCircle: {
        transition: "transform 0.1s ease",
    },

    circle: {
        width: 32,
        height: 32,
        borderRadius: "50%",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        fontSize: 13,
        fontWeight: 600,
        boxSizing: "border-box",
    },

    activeCircle: {
        backgroundColor: "#d83b01",
        color: "#ffffff",
    },

    completedCircle: {
        backgroundColor: "#107c10",
        color: "#ffffff",
    },

    upcomingCircle: {
        backgroundColor: "#edebe9",
        color: "#605e5c",
    },

    label: {
        marginLeft: 8,
        fontSize: 13,
        fontWeight: 600,
    },

    activeLabel: {
        color: "#323130",
    },

    inactiveLabel: {
        color: "#605e5c",
    },

    connector: {
        flex: 1,
        height: 1,
        backgroundColor: "#d2d0ce",
        margin: "0 12px",
        minWidth: 20,
    },
});

interface StepIndicatorProps {
    currentStep: number;
    onStepClick: (step: number) => void
}

const steps = [
    "Practice",
    "Invoice",
    "Contact",
    "Data Conversion",
    "Review",
];

const StepIndicator = ({
    currentStep,
    onStepClick
}: StepIndicatorProps) => {
    return (
        <div className={styles.container}>
            {steps.map((label, index) => {
                const stepNumber = index + 1;

                const isActive =
                    stepNumber === currentStep;

                const isCompleted =
                    stepNumber < currentStep;

                const canNavigate = isCompleted || isActive;

                return (
                    <div
                        className={`${styles.step} ${canNavigate
                            ? styles.clickableStep
                            : ""
                            }`}
                        key={label}
                        onClick={() => {
                            if (canNavigate) {
                                onStepClick(stepNumber);
                            }
                        }}
                    >
                        <div
                            className={`${styles.circle} ${styles.stepCircle
                                } ${isActive
                                    ? styles.activeCircle
                                    : isCompleted
                                        ? styles.completedCircle
                                        : styles.upcomingCircle
                                }`}
                        >
                            {isCompleted ? (
                                <Icon
                                    iconName="CheckMark"
                                />
                            ) : (
                                stepNumber
                            )}
                        </div>

                        <Text
                            className={`${styles.label} ${isActive
                                ? styles.activeLabel
                                : styles.inactiveLabel
                                }`}
                        >
                            {label}
                        </Text>

                        {stepNumber <
                            steps.length && (
                                <div
                                    className={
                                        styles.connector
                                    }
                                />
                            )}
                    </div>
                );
            })}
        </div>
    );
};

export default StepIndicator;