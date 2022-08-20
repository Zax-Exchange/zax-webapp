import { VendorOverview } from "../company/companyTypes";

// for useSearchVendor hook
export interface SearchVendorInput {
    userInput: string;
    locations?: string[];
    moq?: number;
    leadTime?: number;
  }

export interface SearchVendorsData {
    searchVendorCompanies: VendorOverview[] | []
}