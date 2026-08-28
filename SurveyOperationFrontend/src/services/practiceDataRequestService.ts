import axios from "axios";
import type {
    PracticeDataRequestValues,
} from "../types/practice";
import axiosInstance from "./axiosService";

export const createPracticeDataRequest = async (
    values: PracticeDataRequestValues
) => {

    const formData = new FormData();


    // -------------------------
    // Practice Information
    // -------------------------

    formData.append(
        "PracticeName",
        values.practiceName
    );

    formData.append(
        "Website",
        values.website
    );

    formData.append(
        "PhoneNumber",
        values.phoneNumber
    );

    formData.append(
        "PublicEmail",
        values.publicEmail
    );

    formData.append(
        "ProposedUrl",
        values.proposedUrl
    );


    // -------------------------
    // Branding
    // -------------------------

    if (values.logo) {
        formData.append(
            "Logo",
            values.logo
        );
    }

    if (values.favicon) {
        formData.append(
            "Favicon",
            values.favicon
        );
    }


    // -------------------------
    // Invoice
    // -------------------------

    if (values.invoice.header) {
        formData.append(
            "Invoice.Header",
            values.invoice.header
        );
    }

    if (values.invoice.footer) {
        formData.append(
            "Invoice.Footer",
            values.invoice.footer
        );
    }


    // -------------------------
    // Contact Person
    // -------------------------

    formData.append(
        "ContactPerson.Name",
        values.contactPerson.name
    );

    formData.append(
        "ContactPerson.Email",
        values.contactPerson.email
    );

    formData.append(
        "ContactPerson.PhoneNumber",
        values.contactPerson.phoneNumber
    );


    // -------------------------
    // Data Conversion
    // -------------------------

    if (values.dataConversion.businesses) {
        formData.append(
            "DataConversion.Businesses",
            values.dataConversion.businesses
        );
    }

    if (values.dataConversion.contacts) {
        formData.append(
            "DataConversion.Contacts",
            values.dataConversion.contacts
        );
    }

    if (values.dataConversion.invoices) {
        formData.append(
            "DataConversion.Invoices",
            values.dataConversion.invoices
        );
    }

    if (values.dataConversion.creditNotes) {
        formData.append(
            "DataConversion.CreditNotes",
            values.dataConversion.creditNotes
        );
    }

    if (values.dataConversion.receipts) {
        formData.append(
            "DataConversion.Receipts",
            values.dataConversion.receipts
        );
    }

    if (values.dataConversion.subscriptionAndDD) {
        formData.append(
            "DataConversion.SubscriptionAndDD",
            values.dataConversion.subscriptionAndDD
        );
    }

    if (values.dataConversion.tasks) {
        formData.append(
            "DataConversion.Tasks",
            values.dataConversion.tasks
        );
    }

    if (values.dataConversion.users) {
        formData.append(
            "DataConversion.Users",
            values.dataConversion.users
        );
    }


    const response = await axiosInstance.post(
        "/PracticeDataRequest",
        formData,
        {
            headers: {
                "Content-Type" : "multipart/form-data"
            }
        }
    );


    return response.data;
};