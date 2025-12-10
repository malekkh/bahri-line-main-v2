/**
 * Offered Quotation Types
 * Type definitions for offered quotations feature
 */

/**
 * Option Set - numeric value + formatted text for status/state
 */
export interface OptionSet<T extends number = number> {
  value: T;
  label: string | null;
}

/**
 * Opportunity Info
 */
export interface OpportunityInfo {
  id: string | null;
  name: string | null;
}

/**
 * Port Info
 */
export interface PortInfo {
  id: string | null;
  name: string | null;
}

/**
 * Quote Charge
 */
export interface QuoteCharge {
  id: string;
  portName: string;
  price: number;
  total: number;
  opportunityLineId: string;
  amount?: number;
  amountFormatted?: string;
  priceFormatted?: string;
  chargeType?: string;
  priceType?: string;
  percentage?: number;
}

/**
 * Quote Product (quotedetail)
 */
export interface QuoteProduct {
  id: string;
  description: string | null;
  productId: string | null;
  quantity: number;
  pricePerUnit: number;
  lineBaseAmount: number;
  ntw_QuotationRequestLine: {
    opportunityproductid: string | null;
  };
  ntw_quoteCharges?: QuoteCharge[];
  // Additional fields from OpportunityProduct
  opportunityproductid?: string;
  name?: string;
  length?: number | null;
  width?: number | null;
  height?: number | null;
  weight?: number | null;
  cargotype?: string;
  cargosubtype?: string;
  dimensionUnit?: string;
  weightUnit?: string;
  ev?: string;
  tracked?: string;
  towable?: string;
  hazardous?: string;
  containersize?: number;
  price?: number;
  _ntw_opportunityline_value?: string;
  crmLineId?: string;
  opportunityLineId?: string;
  charges?: QuoteCharge[];
}

/**
 * Quote - List view (simplified)
 */
export interface OfferedQuote {
  quoteId: string;
  quoteNumber: string;
  name: string;
  statusCode: OptionSet;
  stateCode: OptionSet;
  opportunity: OpportunityInfo;
  loadingPort: PortInfo;
  dischargeport: PortInfo;
  totalAmount: number;
  effectiveFrom: string; // ISO date
  effectiveTo: string; // ISO date
  createdOn: string; // ISO date-time
  requestdeliveryby: string | null;
  requestShipmentDate: string;
}

/**
 * Quote Full - Details view (extended with all CRM fields)
 */
export interface OfferedQuoteFull {
  [key: string]: any; // All OOB & custom CRM attributes
  quoteId: string;
  quotenumber?: string;
  name: string;
  statusCode: OptionSet;
  stateCode: OptionSet;
  statuscode?: number;
  opportunity: OpportunityInfo;
  _opportunityid_value?: string;
  loadingPort?: PortInfo;
  dischargeport?: PortInfo;
  _ntw_loadingport_value?: string;
  _ntw_dischargeport_value?: string;
  totalAmount?: number;
  totalamount?: number;
  effectiveFrom?: string;
  effectiveTo?: string;
  effectivefrom?: string;
  effectiveto?: string;
  createdOn?: string;
  requestdeliveryby?: string | null;
  requestShipmentDate?: string;
  ntw_requestedshipmentdate?: string;
  ntw_ispricingaccepted?: boolean;
  ntw_etd?: string;
  ntw_eta?: string;
  ntw_voyagecode?: string;
  ntw_Voyage?: any;
  discountamount?: number;
  discountpercentage?: number;
  totaltax?: number;
  ntw_commissionpercentage?: number;
  ntw_bookingreference?: string;
  // Shipping details
  ntw_decidingpartyoption?: string;
  ntw_requestedeta?: string;
  ntw_requestedetd?: string;
  _ntw_requestedvoyage_value?: string;
  // Consignee details
  shipto_city?: string;
  shipto_contactname?: string;
  shipto_country?: string;
  shipto_name?: string;
  shipto_telephone?: string;
  shipto_stateorprovince?: string;
  shipto_line1?: string;
  shipto_line2?: string;
  shipto_line3?: string;
  shipto_postalcode?: string;
  ntw_forwarder?: string;
  ntw_notify?: string;
  ntw_invoiceparty?: string;
  // Formatted display values
  "_ntw_dischargeport_value@OData.Community.Display.V1.FormattedValue"?: string;
  "_ntw_loadingport_value@OData.Community.Display.V1.FormattedValue"?: string;
  "ntw_shipmenttype@OData.Community.Display.V1.FormattedValue"?: string;
  "ntw_linertermsoptions@OData.Community.Display.V1.FormattedValue"?: string;
  "paymenttermscode@OData.Community.Display.V1.FormattedValue"?: string;
  "ntw_movementtypeexport@OData.Community.Display.V1.FormattedValue"?: string;
  "ntw_shippingtermscode@OData.Community.Display.V1.FormattedValue"?: string;
  "ntw_movementtypeimport@OData.Community.Display.V1.FormattedValue"?: string;
  "ntw_voyagestatus@OData.Community.Display.V1.FormattedValue"?: string;
}

/**
 * Get Offered Quotes Result
 */
export interface GetOfferedQuotesResult {
  success: boolean;
  quotes: OfferedQuote[];
  message?: string;
}

/**
 * Get Quote Details Result
 */
export interface GetQuoteDetailsResult {
  success: boolean;
  quote?: OfferedQuoteFull;
  products?: QuoteProduct[];
  message?: string;
}

/**
 * Update Quote Pricing Acceptance Payload
 */
export interface UpdateQuotePricingAcceptancePayload {
  quoteId: string;
  ntw_ispricingaccepted: boolean;
}

/**
 * Update Quote Pricing Acceptance Response
 */
export interface UpdateQuotePricingAcceptanceResponse {
  message: string;
  success?: boolean;
}

/**
 * Update Offered Quote Shipment Payload
 */
export interface UpdateOfferedQuoteShipmentPayload {
  quoteId: string;
  [key: string]: any; // Dynamic fields for shipment details
}

/**
 * Update Offered Quote Shipment Response
 */
export interface UpdateOfferedQuoteShipmentResponse {
  success: boolean;
  message?: string;
}


