import { CompanyDetail } from "../company/companyTypes";

export interface VendorDetail extends CompanyDetail {
    leadTime: number;
    locations: string[];
    moq: string;
    materials: string[];
  }