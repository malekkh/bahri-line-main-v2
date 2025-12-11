/**
 * API Responses
 * All API response handlers for the entire application
 */

import type { AxiosResponse } from 'axios';
import type { User, UsersResponse } from '@/types/user.types';
import type { ValidateInvitationResponse, CheckCRResponse, Voyage, VoyageRoute, QuotationRequest } from '@/services/api/axiosRoutes.type';
import type { VoyagesResponse } from '@/types/voyage.types';
import type { QuotationRequestsResponse } from '@/types/quotation.types';
import type { ContactDetails, PatchResponse } from '@/types/contact.types';
import type {
  OfferedQuote,
  GetOfferedQuotesResult,
  GetQuoteDetailsResult,
  UpdateQuotePricingAcceptanceResponse,
  UpdateOfferedQuoteShipmentResponse,
} from '@/types/offered-quotation.types';
import type {
  Contract,
  ContractDetail,
  ContractListResponse,
  ContractDetailResponse,
  UpdateContractStatusResponse,
} from '@/types/contract.types';

// ============================================================================
// USERS RESPONSES
// ============================================================================

export const usersResponses = {
  /**
   * Process get all users response
   */
  processGetAll: (response: AxiosResponse<UsersResponse>): UsersResponse => {
    return response.data;
  },

  /**
   * Process single user response
   */
  processUser: (response: AxiosResponse<User>): User => {
    return response.data;
  },

  /**
   * Process user list response
   */
  processUserList: (response: AxiosResponse<User[]>): User[] => {
    return response.data;
  },

  /**
   * Process delete response
   */
  processDelete: (response: AxiosResponse<void>): void => {
    // No processing needed for void response
  },
};

// ============================================================================
// AUTH RESPONSES
// ============================================================================

export const authResponses = {
  /**
   * Process login response
   */
  processLogin: (
    response: AxiosResponse<{ success: boolean; message: string }>
  ): { success: boolean; message: string } => {
    return response.data;
  },

  /**
   * Process register response
   */
  processRegister: (
    response: AxiosResponse<{ token: string; user: User }>
  ): { token: string; user: User } => {
    return response.data;
  },

  /**
   * Process logout response
   */
  processLogout: (response: AxiosResponse<{ message: string }>): { message: string } => {
    return response.data;
  },

  /**
   * Process current user response
   */
  processCurrentUser: (response: AxiosResponse<User>): User => {
    return response.data;
  },

  /**
   * Process message response (forgot/reset password)
   */
  processMessage: (response: AxiosResponse<{ success: boolean; message: string }>): { success: boolean; message: string } => {
    return response.data;
  },

  /**
   * Process confirm email response
   */
  processConfirmEmail: (response: AxiosResponse<{ success: boolean; message: string }>): { success: boolean; message: string } => {
    return response.data;
  },

  /**
   * Process check contact existence response
   */
  processCheckContactExistence: (response: AxiosResponse<{ success: boolean; message: string }>): { success: boolean; message: string } => {
    return response.data;
  },

  /**
   * Process invitation validation response
   */
  processInvitationValidation: (response: AxiosResponse<ValidateInvitationResponse>): ValidateInvitationResponse => {
    return response.data;
  },

  /**
   * Process CR validation response
   */
  processCRValidation: (response: AxiosResponse<CheckCRResponse>): CheckCRResponse => {
    return response.data;
  },
};

// ============================================================================
// VESSEL SCHEDULE RESPONSES
// ============================================================================

export const vesselScheduleResponses = {
  /**
   * Process list voyages response
   */
  processListVoyages: (response: AxiosResponse<Voyage[]>, page: number = 1, limit: number = 10): VoyagesResponse => {
    const voyages = response.data;
    const total = voyages.length;
    const totalPages = Math.ceil(total / limit);

    return {
      voyages,
      total,
      page,
      limit,
      totalPages,
    };
  },
  /**
   * Process voyage routes response
   */
  processVoyageRoutes: (response: AxiosResponse<VoyageRoute[]>): VoyageRoute[] => {
    return response.data;
  },
};

// ============================================================================
// QUOTATION REQUESTS RESPONSES
// ============================================================================

// (Response handlers can be added here if needed)

// ============================================================================
// OFFERED QUOTATIONS RESPONSES
// ============================================================================

export const offeredQuotationsResponses = {
  /**
   * Process get all offered quotations response
   */
  processGetAll: (response: AxiosResponse<OfferedQuote[] | GetOfferedQuotesResult>): OfferedQuote[] => {
    // Handle both array response and wrapped response
    if (Array.isArray(response.data)) {
      return response.data;
    }
    return (response.data as GetOfferedQuotesResult).quotes || [];
  },

  /**
   * Process get quote details response
   */
  processGetDetails: (response: AxiosResponse<GetQuoteDetailsResult>): GetQuoteDetailsResult => {
    return response.data;
  },

  /**
   * Process update pricing acceptance response
   */
  processUpdatePricingAcceptance: (
    response: AxiosResponse<UpdateQuotePricingAcceptanceResponse>
  ): UpdateQuotePricingAcceptanceResponse => {
    return response.data;
  },

  /**
   * Process update shipment response
   */
  processUpdateShipment: (
    response: AxiosResponse<UpdateOfferedQuoteShipmentResponse>
  ): UpdateOfferedQuoteShipmentResponse => {
    return response.data;
  },
};

// ============================================================================
// CONTACT/PROFILE RESPONSES
// ============================================================================

export const contactResponses = {
  /**
   * Process get contact details response
   */
  processContactDetails: (response: AxiosResponse<ContactDetails>): ContactDetails => {
    return response.data;
  },

  /**
   * Process update contact account response
   */
  processUpdateContactAccount: (response: AxiosResponse<PatchResponse>): PatchResponse => {
    return response.data;
  },
};

// ============================================================================
// ADD MORE FEATURE RESPONSES BELOW
// ============================================================================

// ============================================================================
// CONTRACTS RESPONSES
// ============================================================================

export const contractsResponses = {
  /**
   * Process contracts list response
   */
  processList: (response: AxiosResponse<Contract[] | ContractListResponse>): Contract[] => {
    const data = response.data;
    if (Array.isArray(data)) {
      return data;
    }
    if (data?.contracts && Array.isArray(data.contracts)) {
      return data.contracts;
    }
    if (data?.data && Array.isArray(data.data)) {
      return data.data;
    }
    return [];
  },

  /**
   * Process contract details response
   */
  processDetail: (
    response: AxiosResponse<ContractDetail | ContractDetailResponse>
  ): ContractDetail | null => {
    const data = response.data;
    if ('contract' in (data as ContractDetailResponse)) {
      return (data as ContractDetailResponse).contract || null;
    }
    return (data as ContractDetail) || null;
  },

  /**
   * Process update status response
   */
  processUpdateStatus: (
    response: AxiosResponse<UpdateContractStatusResponse>
  ): UpdateContractStatusResponse => {
    return response.data;
  },
};

// Example: Products Responses
// export const productsResponses = {
//   processList: (response: AxiosResponse<Product[]>) => response.data,
//   processProduct: (response: AxiosResponse<Product>) => response.data,
// };

