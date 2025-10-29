/**
 * Voyage Types
 * Type definitions for vessel schedule data
 */

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

export interface VoyagesResponse {
  voyages: Voyage[];
  total: number;
  page: number;
  limit: number;
  totalPages: number;
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

