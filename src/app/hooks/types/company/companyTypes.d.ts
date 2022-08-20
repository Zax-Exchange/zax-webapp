import * as enums from "../common/enums";

/** gql general types for company */
export interface CompanyPlanData {
  name: string;
  tier: enums.PlanTier;
  price: number;
  billingFrequency: enums.BillingFrequency;
  memberSince: string;
  subscriptionStartDate: string;
  subscriptionEndDate: string;
  trialStartDate?: string | null;
  trialEndDate?: string | null;
}

export interface CompanyDetail {
  id: string;
  name: string;
  phone: string;
  country: string;
  isActive: boolean;
  isVerified: boolean;
  logo?: string;
  companyUrl?: string;
  fax?: string;
}

export interface VendorDetail extends CompanyDetail {
  leadTime: number;
  locations: string[];
  moq: string;
  materials: string[];
}

export interface CustomerDetail extends CompanyDetail {

}



