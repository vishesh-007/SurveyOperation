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


const styles = mergeStyleSets({

    container: {
        maxWidth: 700,
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
        marginBottom: 22,
    },

    field: {
        marginBottom: 18,
    },

});


const ContactPersonStep = () => {

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
                Contact Person
            </div>


            <div
                className={
                    styles.description
                }
            >
                Provide the primary contact
                details for the practice.
            </div>


            {/* Contact Person Name */}

            <div
                className={
                    styles.field
                }
            >

                <TextField
                    label="Contact Person Name"
                    required
                    value={
                        values.contactPerson.name
                    }
                    onChange={(
                        _event,
                        value
                    ) => {

                        setFieldValue(
                            "contactPerson.name",
                            value ?? ""
                        );

                    }}
                    onBlur={() =>
                        setFieldTouched(
                            "contactPerson.name",
                            true
                        )
                    }
                    errorMessage={
                        touched.contactPerson
                            ?.name
                            ? errors.contactPerson
                                ?.name
                            : undefined
                    }
                />

            </div>


            {/* Email */}

            <div
                className={
                    styles.field
                }
            >

                <TextField
                    label="Email"
                    required
                    type="email"
                    value={
                        values.contactPerson.email
                    }
                    onChange={(
                        _event,
                        value
                    ) => {

                        setFieldValue(
                            "contactPerson.email",
                            value ?? ""
                        );

                    }}
                    onBlur={() =>
                        setFieldTouched(
                            "contactPerson.email",
                            true
                        )
                    }
                    errorMessage={
                        touched.contactPerson
                            ?.email
                            ? errors.contactPerson
                                ?.email
                            : undefined
                    }
                />

            </div>


            {/* Phone Number */}

            <div
                className={
                    styles.field
                }
            >

                <TextField
                    label="Phone Number"
                    required
                    value={
                        values.contactPerson
                            .phoneNumber
                    }
                    onChange={(
                        _event,
                        value
                    ) => {

                        setFieldValue(
                            "contactPerson.phoneNumber",
                            value ?? ""
                        );

                    }}
                    onBlur={() =>
                        setFieldTouched(
                            "contactPerson.phoneNumber",
                            true
                        )
                    }
                    errorMessage={
                        touched.contactPerson
                            ?.phoneNumber
                            ? errors.contactPerson
                                ?.phoneNumber
                            : undefined
                    }
                />

            </div>

        </div>
    );
};


export default ContactPersonStep;