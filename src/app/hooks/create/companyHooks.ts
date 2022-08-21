import { gql, useMutation, useQuery } from "@apollo/client";

import { CreateCustomerData, CreateCustomerInput, CreateVendorData, CreateVendorInput, InviteUserData, InviteUserInput } from "../types/company/createCompanyTypes";


const INVITE_USER = gql`
  mutation inviteUser($email: String, $userId: String) {
    inviteUser(email: $email, userId: $userId)
  }
`;

export const useInviteUser = () => {
  const [
    inviteUser,
    {
      error: inviteUserError,
      loading: inviteUserLoading,
      data: inviteUserData,
    },
  ] = useMutation<InviteUserData, InviteUserInput>(INVITE_USER);

  return {
    inviteUser,
    inviteUserData,
    inviteUserError,
    inviteUserLoading,
  };
};

const CREATE_VENDOR = gql`
  mutation createVendor($data: CreateVendorInput) {
    createVendor(data: $data)
  }
`;

const CREATE_CUSTOMER = gql`
  mutation createCustomer($data: CreateCustomerInput) {
    createCustomer(data: $data)
  }
`;

/**
 *
 * @returns createCompany, createCompanyLoading, createCompanyError, createCompanySuccess
 */
export const useCreateCompany = (isVendor: boolean) => {
  const [
    createCompany,
    {
      loading: createCompanyLoading,
      error: createCompanyError,
      data: createCompanyData,
    },
  ] = useMutation<CreateVendorData | CreateCustomerData, CreateVendorInput | CreateCustomerInput>(isVendor ? CREATE_VENDOR : CREATE_CUSTOMER);
  return {
    createCompany,
    createCompanyLoading,
    createCompanyError,
    createCompanyData,
  };
};
