export interface PracticeContact {
    name: string;
    email: string;
    phoneNumber: string;
}

export interface InvoiceFiles {
    header: File | null;
    footer: File | null;
}

export interface DataConversionFiles {
    businesses: File | null;
    contacts: File | null;
    invoices: File | null;
    creditNotes: File | null;
    receipts: File | null;
    subscriptionAndDD: File | null;
    tasks: File | null;
    users: File | null;
}

export interface PracticeDataRequestValues {
    practiceName: string;

    logo: File | null;
    favicon: File | null;

    website: string;
    phoneNumber: string;

    invoice: InvoiceFiles;

    publicEmail: string;
    proposedUrl: string;

    contactPerson: PracticeContact;

    dataConversion: DataConversionFiles;
}