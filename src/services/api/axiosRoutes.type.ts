/**
 * API Routes TypeScript Types
 * Type definitions for API endpoints
 */

import { User, CreateUserDto, UpdateUserDto, UsersResponse } from '@/types/user.types';
import { ContactDetailsFormData, RegistrationFormData } from '@/schemas/auth.schema';
import { ContactDetails, PatchPayload, PatchResponse } from '@/types/contact.types';
import { QuotationRequestsResponse } from '@/types/quotation.types';
import {
  OfferedQuote,
  OfferedQuoteFull,
  QuoteProduct,
  GetOfferedQuotesResult,
  GetQuoteDetailsResult,
  UpdateQuotePricingAcceptancePayload,
  UpdateQuotePricingAcceptanceResponse,
  UpdateOfferedQuoteShipmentPayload,
  UpdateOfferedQuoteShipmentResponse,
} from '@/types/offered-quotation.types';

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

export interface Port {
  ntw_portid: string;
  ntw_name: string;
}

export interface PortsResponse {
  success: boolean;
  ports?: Port[];
  data?: Port[];
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
    quoteId?: string;
    requestId: string;
    quoteNumber?: string;
    name: string;
    status: string;
    statusCode: number;
    loadingPort: string;
    dischargePort: string;
    requestedShipmentDate: string;
    requestShipmentDate?: string;
    totalamount: number;
    totalamountFormatted?: string;
    totalAmount?: number;
    effectiveFrom?: string;
    effectiveTo?: string;
    createdOn?: string;
    requestdeliveryby?: string | null;
    products?: Array<{
        opportunityproductid: string;
        name: string;
        description: string;
        cbm: number;
        length: number;
        width: number;
        height: number;
        weight: number;
        cargotype: string;
        cargosubtype: string;
        dimensionUnit: string;
        weightUnit: string;
        ev: string;
        tracked: string;
        towable: string;
        hazardous: string;
        quantity: number;
        price: number;
        priceFormatted: string;
        charges: Array<{
            amount: number;
            amountFormatted: string;
            price: number;
            priceFormatted: string;
            chargeType: string;
            priceType: string;
            percentage: number;
        }>;
    }>;
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
    body: { requestId: string; newPassword: string };
    response: { success: boolean; message: string };
  };
  confirmEmail: {
    body: { requestId: string };
    response: { success: boolean; message: string };
  };
  checkContactExistence: {
    params: { email: string };
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
  getPorts: {
    response: Port[] | PortsResponse;
  };
}

// Quotation Requests API Types
export interface QuotationRequestApiTypes {
  getAll: {
    response: { opportunities: QuotationRequest[] } | QuotationRequest[] | QuotationRequestsResponse;
  };
}

// Offered Quotations API Types
export interface OfferedQuotationApiTypes {
  getAll: {
    response: OfferedQuote[] | GetOfferedQuotesResult;
  };
  getById: {
    params: { id: string };
    response: GetQuoteDetailsResult;
  };
  updatePricingAcceptance: {
    body: UpdateQuotePricingAcceptancePayload;
    response: UpdateQuotePricingAcceptanceResponse;
  };
  updateShipment: {
    params: { id: string };
    body: UpdateOfferedQuoteShipmentPayload;
    response: UpdateOfferedQuoteShipmentResponse;
  };
}

