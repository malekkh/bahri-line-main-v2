// src/services/createLead.ts
import api from "./api/axiosSetup";

export interface LeadPayload {
  firstname?: string;
  lastname?: string;
  websiteurl?: string;
  jobtitle?: string;
  emailaddress1?: string;
  address1_city?: string;
  address1_country?: string;
  "ntw_Country@odata.bind"?: string;
  companyname?: string | null;
  mobilephone?: string;
  telephone1?: string;
  description?: string;
  subject?: string;
  leadsourcecode?: number;
}

export async function createLead(formData: LeadPayload) {
  return api.post("/leads/create-lead", formData);
}
