export interface CompanySignupData {
  name: string;
  contactEmail: string;
  logo: string | null;
  phone: string;
  fax: string;
  country: string;
  isActive: boolean;
  isVendor: boolean;
  isVerified: boolean;
  companyUrl: string;
  planId: string;
  userEmail: string;
}