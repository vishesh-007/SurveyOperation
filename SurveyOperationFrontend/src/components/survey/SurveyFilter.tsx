import {
    Callout,
    ComboBox,
    DefaultButton,
    PrimaryButton,
    type IComboBoxOption,
    mergeStyleSets,
    type IComboBox,
} from "@fluentui/react";
import React from "react";

const styles = mergeStyleSets({
    callout: {
        width: 250,
        padding: 12,
    },

    title: {
        fontSize: 15,
        fontWeight: 600,
        color: "#323130",
        marginBottom: 16,
    },

    field: {
        marginBottom: 14,
    },

    label: {
        display: "block",
        fontSize: 12,
        fontWeight: 600,
        color: "#323130",
        marginBottom: 5,
    },

    required: {
        color: "#a4262c",
    },

    actions: {
        display: "flex",
        justifyContent: "flex-end",
        gap: 8,
        marginTop: 6,
    },
});

export interface SurveyFilterValue {
    key: string;
    value: string;
}

interface SurveyFilterProps {
    target: HTMLElement | null;

    onDismiss: () => void;

    onApply: (
        filter: SurveyFilterValue
    ) => void;

    onRemove: (
        key: string
    ) => void;
}

const criteriaOptions: IComboBoxOption[] = [
    {
        key: "rating",
        text: "Rating",
    },
    {
        key: "status",
        text: "Status",
    },
];

const ratingOptions: IComboBoxOption[] = [
    {
        key: "1",
        text: "1",
    },
    {
        key: "2",
        text: "2",
    },
    {
        key: "3",
        text: "3",
    },
    {
        key: "4",
        text: "4",
    },
    {
        key: "5",
        text: "5",
    },
];

const statusOptions: IComboBoxOption[] = [
    {
        key: "all",
        text: "All",
    },
    {
        key: "1",
        text: "Active",
    },
    {
        key: "2",
        text: "Deleted",
    },
];


const SurveyFilter = ({
    target,
    onDismiss,
    onApply,
    onRemove,
}: SurveyFilterProps) => {
    const [selectedCriteria, setSelectedCriteria] =
        React.useState<string>("");

    const [selectedValue, setSelectedValue] =
        React.useState<string>("");

    const handleCriteriaChange = (
        _event: React.FormEvent<IComboBox>,
        option?: IComboBoxOption
    ) => {
        if (!option) {
            return;
        }

        setSelectedCriteria(option.key as string);

        
        setSelectedValue("");
    };

    const handleValueChange = (
        _event: React.FormEvent<IComboBox>,
        option?: IComboBoxOption,
        _index?: number,
        value?: string
    ) => {
        if (option) {
            setSelectedValue(option.key as string);
            return;
        }

        if (value !== undefined) {
            setSelectedValue(value);
        }
    };

    const handleApply = () => {
        if (
            !selectedCriteria ||
            !selectedValue.trim()
        ) {
            return;
        }

       
        if (
            selectedCriteria === "status" &&
            selectedValue === "all"
        ) {
            onRemove("status");
            onDismiss();
            return;
        }

        onApply({
            key: selectedCriteria,
            value: selectedValue.trim(),
        });

        onDismiss();
    };

    if (!target) {
        return null;
    }

    return (
        <Callout
            target={target}
            onDismiss={onDismiss}
            setInitialFocus
            directionalHint={12}
            isBeakVisible={false}
            className={styles.callout}
        >
            <div className={styles.title}>
                Add filter
            </div>

            <div className={styles.field}>
                <label className={styles.label}>
                    Criteria{" "}
                    <span className={styles.required}>
                        *
                    </span>
                </label>

                <ComboBox
                    placeholder="Select"
                    options={criteriaOptions}
                    selectedKey={
                        selectedCriteria || undefined
                    }
                    onChange={handleCriteriaChange}
                    useComboBoxAsMenuWidth
                />
            </div>

            <div className={styles.field}>
                <label className={styles.label}>
                    Value{" "}
                    <span className={styles.required}>
                        *
                    </span>
                </label>

                <ComboBox
                    placeholder="Select"
                    options={
                        selectedCriteria === "rating"
                            ? ratingOptions
                            : selectedCriteria === "status"
                                ? statusOptions
                                : []
                    }
                    selectedKey={
                        selectedValue || undefined
                    }
                    onChange={handleValueChange}
                    allowFreeform={
                        selectedCriteria !== "status"
                    }
                    autoComplete="on"
                    disabled={!selectedCriteria}
                    useComboBoxAsMenuWidth
                />
            </div>

            <div className={styles.actions}>
                <DefaultButton
                    text="Cancel"
                    onClick={onDismiss}
                />

                <PrimaryButton
                    text="Apply"
                    onClick={handleApply}
                    disabled={
                        !selectedCriteria ||
                        !selectedValue.trim()
                    }
                />
            </div>
        </Callout>
    );
};

export default SurveyFilter;