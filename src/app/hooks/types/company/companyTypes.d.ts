import * as enums from "../common/enums";

export interface Company {
  id: string;
  name: string;
  phone: string;
  country: string;
  isActive: boolean;
  isVerified: boolean;
  isVendor: boolean;
  planId: string;
  logo?: string;
  companyUrl?: string;
  fax?: string;
}

export interface Vendor extends Company{
  leadTime: number;
  locations: string[];
  moq: string;
  materials: string[];
}

export interface Customer extends Company {
  
}


// company for public view, for search
export interface CompanyOverview {
  id: string;
  name: string;
  logo?: string;
  country: string;
  isVerified: boolean;
}

export interface VendorOverview extends CompanyOverview {
  leadTime: number;
  locations: string[];
  materials: string[];
  moq: string;
}

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



export interface CustomerDetail extends CompanyDetail {

}



