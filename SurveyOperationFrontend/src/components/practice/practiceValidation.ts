import * as Yup from "yup";


export const practiceInformationSchema =
    Yup.object({
        practiceName: Yup.string()
            .trim()
            .required(
                "Practice name is required."
            ),

        logo: Yup.mixed<File>()
            .required(
                "Practice logo is required."
            ),

        favicon: Yup.mixed<File>()
            .required(
                "Practice favicon is required."
            ),

        website: Yup.string()
            .trim()
            .url(
                "Enter a valid website URL."
            ),

        phoneNumber: Yup.string()
            .trim()
            .required(
                "Phone number is required."
            ),

        publicEmail: Yup.string()
            .trim()
            .email(
                "Enter a valid email address."
            )
            .required(
                "Public email is required."
            ),

        proposedUrl: Yup.string()
            .trim()
            .required(
                "Proposed URL is required."
            ),
    });


export const invoiceSchema =
    Yup.object({
        invoice: Yup.object({
            header: Yup.mixed<File>()
                .required(
                    "Invoice header is required."
                ),

            footer: Yup.mixed<File>()
                .required(
                    "Invoice footer is required."
                ),
        }),
    });


export const contactPersonSchema =
    Yup.object({
        contactPerson: Yup.object({
            name: Yup.string()
                .trim()
                .required(
                    "Contact person name is required."
                ),

            email: Yup.string()
                .trim()
                .email(
                    "Enter a valid email address."
                )
                .required(
                    "Contact email is required."
                ),

            phoneNumber: Yup.string()
                .trim()
                .required(
                    "Contact phone number is required."
                ),
        }),
    });


export const dataConversionSchema =
    Yup.object({
        dataConversion: Yup.object({
            businesses: Yup.mixed<File>()
                .required(
                    "Businesses file is required."
                ),

            contacts: Yup.mixed<File>()
                .required(
                    "Contacts file is required."
                ),

            invoices: Yup.mixed<File>()
                .required(
                    "Invoices file is required."
                ),

            creditNotes: Yup.mixed<File>()
                .required(
                    "Credit Notes file is required."
                ),

            receipts: Yup.mixed<File>()
                .required(
                    "Receipts file is required."
                ),

            subscriptionAndDD:
                Yup.mixed<File>()
                    .required(
                        "Subscription & DD file is required."
                    ),

            tasks: Yup.mixed<File>()
                .required(
                    "Tasks file is required."
                ),

            users: Yup.mixed<File>()
                .required(
                    "Users file is required."
                ),
        }),
    });