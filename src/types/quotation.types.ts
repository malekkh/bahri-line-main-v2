import { QuotationRequest } from "@/services/api/axiosRoutes.type";

export interface QuotationRequestsResponse {
      success: boolean;
      opportunities: QuotationRequest[];
   
  }