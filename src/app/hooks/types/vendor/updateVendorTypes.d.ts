import { UpdateCompanyInputData } from "../company/updateCompanyTypes";

export interface UpdateVendorInput {
  id: string;
  data: UpdateVendorInputData;
}

export interface UpdateVendorInputData extends UpdateCompanyInputData {
  leadTime?: number;
  moq?: string;
  locations?: string[];
  materials?: string[];
}