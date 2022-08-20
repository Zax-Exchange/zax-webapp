import { CompanyPlanData } from "./companyTypes";

// for useGetCompanyPlan hook
export interface GetCompanyPlanInput {
  companyId: string
}
// for useGetCompanyPlan hook
export interface GetCompanyPlanData {
  getCompanyPlanWithCompanyId: CompanyPlanData
}

// for useGetCompanyDetail hook
export interface GetCompanyDetailData {
  getCompanyDetail: VendorDetail | CustomerDetail;
}

// for useGetVendorDetail hook
export interface GetVendorDetailData {
  getVendorDetail: VendorDetail;
}

// for useGetCustomerDetail hook
export interface GetCustomerDetail {
  getCustomerDetail: CustomerDetail;
}

// for useGetAllCompanyUsers hook
export interface GetAllCompanyUsersInput {
  companyId: string;
}

export interface CompanyUser {
  id: string;
  email: string;
  name: string;
}

// for useGetAllCompanyUsers hook
export interface GetAllCompanyUsersData {
  getAllUsersWithinCompany: CompanyUser[]
}

