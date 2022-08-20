import { CompanySize } from "../common/enums";

export interface PlanData {
  id: string;
  isVendor: boolean;
  companySize?: CompanySize;
  tier: string; 
  pricings: Pricings;
}
