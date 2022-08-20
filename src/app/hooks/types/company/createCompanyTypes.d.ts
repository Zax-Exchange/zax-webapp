// for useInviteUser hook
export interface InviteUserData {
  inviteUser: boolean
}
// for useInviteUser hook
export interface InviteUserInput {
  email: string;
  userId: string;
}

export interface CreateCompany {
  name: string;
  contactEmail: string;
  phone: string;
  country: string;
  isActive: boolean;
  isVendor: boolean;
  isVerified: boolean;
  planId: string;
  userEmail: string;
  logo?: string;
  companyUrl?: string;
  fax?: string;
}


export interface CreateVendor extends CreateCompany {
  leadTime: number;
  locations: string[];
  moq: string;
  materials: string[];
}

export interface CreateCustomer extends CreateCompany {

}

// for useCreateCompany hook
export interface CreateVendorInput {
  data: CreateVendor
}

// for useCreateCompany hook
export interface CreateCustomerInput {
  data: CreateCustomer
}

// for useCreateCompany hook
export interface CreateVendorData {
  createVendor: boolean
}
// for useCreateCompany hook
export interface CreateCustomerData {
  createCustomer: boolean
}