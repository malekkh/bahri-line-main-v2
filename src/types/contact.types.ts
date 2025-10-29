/**
 * Contact Types
 * Type definitions for contact and account details
 */

export interface ContactDetails {
  contact: {
    id: string;
    firstName: string;
    lastName: string;
    phone: string;
    whatsAppNumber: string;
    email: string;
    jobTitle: string;
    birthDate: string | null;
    customerTypeCode: number | null;
    customerTypeLabel: string;
    street: string;
    city: string;
    state: string;
    zipCode: string;
    parentAccountId: string | null;
    imageBase64: string | null;
    country: string;
  };
  account: {
    id: string;
    parentAccount: string;
    accountNumber: string;
    creditonhold: boolean;
    name: string;
    customerTypeCode: number | null;
    customerTypeLabel: string;
    businessTypeCode: number | null;
    businessTypeLabel: string;
    bahriNetting: boolean | null;
    transactionCurrencyId: string | null;
    paymentTermsId: string | null;
    creditlimit: number | null;
    taxRegistrationNo: string;
    websiteUrl: string;
    crNumber: string;
    bahriBankName: string;
    bahriBeneficiaryName: string;
    bankCity: string;
    bankCountry: string;
    bankStateProvince: string;
    bankStreet: string;
    bankContactName: string;
    bankContactNumber: string;
    bankZipPostalCode: string;
    bahriSWIFT: string;
    bahriIBAN: string;
    allowCreditApps: boolean;
    territory: string;
    country: string;
    state: string;
    zipCode: string;
    phone: string;
    street: string;
  } | null;
}

export interface GetContactDetailsResponse {
  success?: boolean;
  data: ContactDetails;
}

export interface PatchPayload {
  contact?: Partial<Omit<ContactDetails['contact'], 'id'>> & {
    imageBase64?: string;
  };
  account?: Partial<Omit<NonNullable<ContactDetails['account']>, 'id'>>;
}

export interface PatchResponse {
  contact: {
    id: string;
    [key: string]: any;
  };
  account: NonNullable<ContactDetails['account']> | string;
}

