/**
 * Contract Types
 * Type definitions for contracts feature
 */

export interface OptionSet<T extends number | string = number> {
  value: T;
  label: string | null;
}

export interface Contract {
  contractId: string;
  contractNumber?: string;
  name?: string;
  accountName?: string;
  status?: OptionSet;
  effectiveFrom?: string;
  effectiveTo?: string;
  totalAmount?: number;
  createdOn?: string;
}

export interface ContractDocument {
  id: string;
  name: string;
  url?: string;
  contentType?: string;
}

export interface ContractDetail extends Contract {
  description?: string;
  contactName?: string;
  contactEmail?: string;
  contactPhone?: string;
  documents?: ContractDocument[];
}

export interface ContractListResponse {
  success?: boolean;
  contracts?: Contract[];
  data?: Contract[];
  message?: string;
}

export interface ContractDetailResponse {
  success?: boolean;
  contract?: ContractDetail;
  message?: string;
}

export interface UpdateContractStatusPayload {
  contractId: string;
  status: string;
}

export interface UpdateContractStatusResponse {
  success?: boolean;
  message?: string;
  status?: string | OptionSet;
}

