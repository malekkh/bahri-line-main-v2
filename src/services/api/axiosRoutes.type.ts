/**
 * API Routes TypeScript Types
 * Type definitions for API endpoints
 */

import { User, CreateUserDto, UpdateUserDto, UsersResponse } from '@/types/user.types';
import { ContactDetailsFormData, RegistrationFormData } from '@/schemas/auth.schema';
import { ContactDetails, PatchPayload, PatchResponse } from '@/types/contact.types';
import { QuotationRequestsResponse } from '@/types/quotation.types';

// Prefilled Contact Data Types
export interface PrefilledContactData {
  firstname: string;
  lastname: string;
  emailaddress1: string;
  mobilephone: string;
  telephone1: string;
  address1_line1: string;
  address1_city: string;
  address1_country: string;
  address1_stateorprovince: string;
  address1_fax: string;
  contactid: string;
  jobTitle: string;
  birthdate: string;
  adx_invitationid: string;
  ntw_createdbyinvitationid: string;
  accountInfo: object;
  account_primary_contact: any[];
  adx_expirydate: string;
  statuscode: number;
}

export interface ValidateInvitationResponse {
  success: boolean;
  status: number;
  invitationStatusCode: number;
  accountStatusCode: number;
  message: string;
  contact: PrefilledContactData;
}

export interface CRCompanyInfo {
  "@odata.etag": string;
  accountid: string;
  name: string;
}

export interface CheckCRResponse {
  value: CRCompanyInfo[];
}

export interface Territory {
  label: string;
  value: string;
}

export interface TerritoriesResponse {
  success: boolean;
  territories: Territory[];
}

export interface Country {
  name: string;
  countryid: string;
}

export interface CountriesResponse {
  success: boolean;
  countries: Country[];
}

export interface Voyage {
  id: string;
  voyageNo: string;
  voyageStatus: {
    value: number;
    label: string;
  };
  etd: {
    raw: string;
    formatted: string;
  };
  eta: {
    raw: string;
    formatted: string;
  };
  status: {
    value: number;
    label: string;
  };
  vessel: {
    id: string;
    name: string;
  };
  service: {
    name: string;
    startingPort: {
      id: string;
      name: string;
    };
    dischargePort?: {
      id: string;
      name: string;
    };
  };
}

export interface VoyageRoute {
  id: string;
  port: {
    id: string;
    name: string;
  };
  eta: {
    raw: string;
    formatted: string;
  };
  status: {
    value: number;
    label: string;
  };
  seqNumber: number;
}

// Vessel Schedule API Types
export interface VesselScheduleApiTypes {
  listVoyages: {
    params?: {
      page?: number;
      limit?: number;
      sortBy?: string;
      sortOrder?: 'asc' | 'desc';
    };
    response: Voyage[];
  };
  getVoyageRoutes: {
    body: {
      voyageid: string;
    };
    response: VoyageRoute[];
  };
}

// Quotation Requests API Types
export interface QuotationRequest {
    opportunityid: string;
    name: string;
    requestId?: string; // Add requestId field for the actual ID
    totalamount?: number | string; // Allow both number and string
    totalamountFormatted?: string; // Add formatted total amount for display
    displayTotal?: string; // Add display total for UI
    loadingPort: string;
    status: string;
    statusCode: number;
    dischargePort: string;
    unitWeight?: string;
    unitMeasure?: string;
    effectivefrom?: string;
    effectiveTo?: string;
    etd?: string;
    voyage?: string;
    eta?: string;
    requestedShipmentDate: string;
    TargetedVessel: string;
    products: any[];
    quotenumber?: string;
    discountamount?: number;
    shipmentType?: string;
    ntw_bookingreference?: string;
    ntw_linertermsoptions?: string;
    paymenttermscode?: string;
    ntw_movementtypeexport?: string;
    ntw_shippingtermscode?: string;
    ntw_movementtypeimport?: string;
    requestdeliveryby?: string;
    voyagestatus? : string;
    ntw_ispricingaccepted?: boolean;
    discountpercentage?: number;
    totaltax?: number;
    ntw_commissionpercentage?: number;
    validFrom?: Date | string;
    validTo?: Date | string;
  
}
// Contact/Profile API Types
export interface ContactApiTypes {
  getContactDetails: {
    response: ContactDetails;
  };
  updateContactAccount: {
    body: PatchPayload;
    response: PatchResponse;
  };
}

// Users API Types
export interface GetUsersParams {
  page?: number;
  limit?: number;
}

export interface SearchUsersParams {
  q: string;
}

export interface UsersApiTypes {
  getAll: {
    params: GetUsersParams;
    response: UsersResponse;
  };
  getById: {
    params: { id: number };
    response: User;
  };
  create: {
    body: CreateUserDto;
    response: User;
  };
  update: {
    params: { id: number };
    body: UpdateUserDto;
    response: User;
  };
  patch: {
    params: { id: number };
    body: Partial<UpdateUserDto>;
    response: User;
  };
  delete: {
    params: { id: number };
    response: void;
  };
  search: {
    params: SearchUsersParams;
    response: User[];
  };
  getCurrentUser: {
    response: User;
  };
}

// Auth API Types
export interface AuthApiTypes {
  login: {
    body: { email: string; encryptedPassword: string };
    response: { success: boolean; message: string };
  };
  register: {
    body: RegistrationFormData;
    response: { success: boolean; message: string };
  };
  logout: {
    response: { success: boolean; message: string };
  };
  refreshToken: {
    response: { token: string };
  };
  checkSession: {
    response: { sessionActive: boolean };
  };
  forgotPassword: {
    body: { email: string };
    response: { success: boolean; message: string };
  };
  resetPassword: {
    body: { token: string; password: string };
    response: { success: boolean; message: string };
  };
  getCurrentUser: {
    response: User;
  };
  validateInvitation: {
    params: { code: string };
    response: ValidateInvitationResponse;
  };
  updateContact: {
    body: {
      contactId: string;
      contactDetails: {
        firstname: string;
        lastname: string;
        jobtitle: string;
        emailaddress1: string;
        telephone1: string;
        mobilephone: string;
        fax?: string;
        address1_city: string;
        address1_stateorprovince: string;
        address1_country: string;
        ntw_portalnewpassword: string;
      };
    };
    response: { success: boolean; updated: boolean };
  };
  checkCR: {
    params: { crNumber: string };
    response: CheckCRResponse;
  };
  getTerritories: {
    response: TerritoriesResponse;
  };
  getCountries: {
    response: CountriesResponse;
  };
}

// Quotation Requests API Types
export interface QuotationRequestApiTypes {
  getAll: {
    response: QuotationRequestsResponse;
  };
}

