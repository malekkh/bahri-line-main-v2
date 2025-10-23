/**
 * API Routes TypeScript Types
 * Type definitions for API endpoints
 */

import { User, CreateUserDto, UpdateUserDto, UsersResponse } from '@/types/user.types';
import { ContactDetailsFormData, RegistrationFormData } from '@/schemas/auth.schema';

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
}

