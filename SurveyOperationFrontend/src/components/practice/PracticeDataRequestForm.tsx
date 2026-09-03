import {
    DefaultButton,
    PrimaryButton,
    mergeStyleSets,
} from "@fluentui/react";

import {
    Form,
    Formik,
} from "formik";

import * as Yup from "yup";

import {
    useState,
} from "react";

import type {
    PracticeDataRequestValues,
} from "../../types/practice";

import StepIndicator
    from "./StepIndicator";

import PracticeInformationStep
    from "./PracticeInformationStep";

import {
    practiceInformationSchema,
    invoiceSchema,
    contactPersonSchema,
    dataConversionSchema,
} from "./practiceValidation";
import InvoiceStep from "./InvoiceStep";
import ContactPersonStep from "./ContactPersonStep";
import DataConversionStep from "./DataConversionStep";
import ReviewStep from "./ReviewStep";
import { createPracticeDataRequest } from "../../services/practiceDataRequestService";


const styles = mergeStyleSets({
    container: {
        height: "100%",
        display: "flex",
        flexDirection: "column",
        backgroundColor: "#ffffff",
    },

    header: {
        padding: "20px 24px 10px",
    },

    title: {
        fontSize: 24,
        fontWeight: 600,
        color: "#323130",
    },

    subtitle: {
        fontSize: 13,
        color: "#605e5c",
        marginTop: 4,
    },

    content: {
        flex: 1,
        overflowY: "auto",
        padding: "24px",
        boxSizing: "border-box",
    },

    footer: {
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
        padding: "14px 24px",
        borderTop: "1px solid #edebe9",
        backgroundColor: "#ffffff",
    },

    rightActions: {
        display: "flex",
        gap: 8,
    },
});


const initialValues: PracticeDataRequestValues = {
    practiceName: "",

    logo: null,
    favicon: null,

    website: "",
    phoneNumber: "",

    invoice: {
        header: null,
        footer: null,
    },

    publicEmail: "",
    proposedUrl: "",

    contactPerson: {
        name: "",
        email: "",
        phoneNumber: "",
    },

    dataConversion: {
        businesses: null,
        contacts: null,
        invoices: null,
        creditNotes: null,
        receipts: null,
        subscriptionAndDD: null,
        tasks: null,
        users: null,
    },
};


const PracticeDataRequestForm = () => {

    const [currentStep, setCurrentStep] = useState<number>(1);

    const [isSubmitting, setIsSubmitting] = useState(false);


    const handleSubmit = async (
        values: PracticeDataRequestValues
    ) => {

        try {

            setIsSubmitting(true);

            const response =
                await createPracticeDataRequest(
                    values
                );

            console.log(
                "Practice Data Request created:",
                response
            );

        } catch (error) {

            console.error(
                "Practice Data Request failed:",
                error
            );

        } finally {

            setIsSubmitting(false);

        }
    };


    const validateCurrentStep = async (
        currentStep: number,
        values: PracticeDataRequestValues,
        setFieldTouched: (
            field: string,
            touched?: boolean,
            shouldValidate?: boolean
        ) => void,
        setFieldError: (
            field: string,
            message: string
        ) => void
    ) => {

        let schema;

        switch (currentStep) {
            case 1:
                schema = practiceInformationSchema;
                break;

            case 2:
                schema = invoiceSchema;
                break;

            case 3:
                schema = contactPersonSchema;
                break;

            case 4:
                schema = dataConversionSchema;
                break;

            default:
                return true;
        }

        try {

            await schema.validate(
                values,
                {
                    abortEarly: false,
                }
            );

            return true;

        } catch (error) {

            if (
                error instanceof Yup.ValidationError
            ) {

                error.inner.forEach(
                    (validationError) => {

                        const field =
                            validationError.path;

                        if (!field) {
                            return;
                        }

                        // Mark field as touched
                        // WITHOUT triggering another validation
                        setFieldTouched(
                            field,
                            true,
                            false
                        );

                        // Set the Yup error
                        setFieldError(
                            field,
                            validationError.message
                        );
                    }
                );
            }

            return false;
        }
    };


    const handleNext = async (
        values: PracticeDataRequestValues,
        setFieldTouched: (
            field: string,
            touched?: boolean,
            shouldValidate?: boolean
        ) => void,
        setFieldError: (
            field: string,
            message: string
        ) => void
    ) => {

        const isValid =
            await validateCurrentStep(
                currentStep,
                values,
                setFieldTouched,
                setFieldError
            );

        if (!isValid) {
            return;
        }

        setCurrentStep(
            (step) =>
                Math.min(5, step + 1)
        );
    };


    return (
        <Formik
            initialValues={initialValues}
            onSubmit={handleSubmit}
        >

            {({
                values,
                submitForm,
                setFieldTouched,
                setFieldError,
            }) => (

                <Form
                    className={styles.container}
                >

                    <div
                        className={styles.header}
                    >

                        <div
                            className={styles.title}
                        >
                            Practice Data Request
                        </div>

                        <div
                            className={styles.subtitle}
                        >
                            Complete the onboarding
                            information for the new
                            practice.
                        </div>

                    </div>


                    <StepIndicator currentStep={currentStep} onStepClick={setCurrentStep} />


                    <div
                        className={styles.content}
                    >

                        {currentStep === 1 && (
                            <PracticeInformationStep />
                        )}


                        {currentStep === 2 && (
                            <div>
                                <InvoiceStep />
                            </div>
                        )}


                        {currentStep === 3 && (
                            <div>
                                <ContactPersonStep />
                            </div>
                        )}


                        {currentStep === 4 && (
                            <div>
                                <DataConversionStep />
                            </div>
                        )}


                        {currentStep === 5 && (
                            <div>
                                <ReviewStep onEditStep={setCurrentStep} />
                            </div>
                        )}

                    </div>


                    <div
                        className={styles.footer}
                    >

                        <DefaultButton
                            text="Back"
                            disabled={
                                currentStep === 1
                            }
                            onClick={() =>
                                setCurrentStep(
                                    (step) =>
                                        Math.max(
                                            1,
                                            step - 1
                                        )
                                )
                            }
                        />


                        <div
                            className={
                                styles.rightActions
                            }
                        >

                            {currentStep < 5 ? (

                                <PrimaryButton
                                    text="Next"
                                    onClick={() =>
                                        handleNext(
                                            values,
                                            setFieldTouched,
                                            setFieldError
                                        )
                                    }
                                    disabled={isSubmitting}
                                />

                            ) : (

                                <PrimaryButton
                                    text={
                                        isSubmitting
                                            ? "Submitting..."
                                            : "Submit"
                                    }
                                    onClick={submitForm}
                                    disabled={isSubmitting}
                                />

                            )}

                        </div>

                    </div>

                </Form>
            )}

        </Formik>
    );
};


export default PracticeDataRequestForm;