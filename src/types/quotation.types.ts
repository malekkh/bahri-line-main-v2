import { QuotationRequest } from "@/services/api/axiosRoutes.type";

export interface QuotationRequestsResponse {
    success?: boolean;
    data?: QuotationRequest[];
    quotes?: QuotationRequest[];
    opportunities?: QuotationRequest[];
}