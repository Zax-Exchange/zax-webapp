import { gql, useLazyQuery, useMutation, useQuery } from "@apollo/client";
import { useContext } from "react";
import { AuthContext } from "../../context/AuthContext";

const INVITE_USER = gql`
  mutation inviteUser($email: String, $userId: String) {
    inviteUser(email: $email, userId: $userId)
  }
`;

export const useInviteUser = () => {
  const [inviteUser, { error: inviteUserError, loading: inviteUserLoading, data: inviteUserData }] = useMutation(INVITE_USER);

  return {
    inviteUser,
    inviteUserData,
    inviteUserError,
    inviteUserLoading
  }
}


const GET_COMPANY_DETAIL= gql`
  query getCompanyDetail($companyId: String) {
    getCompanyDetail(companyId: $companyId) {
      id
      name
      logo
      phone
      fax
      country
      isActive
      isVendor
      isVerified
      companyUrl
      creditCardNumber
      creditCardExp
      creditCardCvv

      locations
      materials
      moq
      leadTime
    }
  }
`;

export const useGetCompanyDetail = () => {
  const { user } = useContext(AuthContext);

  const { 
    error: getCompanyDetailError, 
    loading: getCompanyDetailLoading, 
    data: getCompanyDetailData, 
    refetch: getCompanyDetailRefetch 
  } = useQuery(GET_COMPANY_DETAIL, {
    variables: {
      companyId: user.companyId
    }
  });

  return {
    getCompanyDetailRefetch,
    getCompanyDetailError,
    getCompanyDetailData,
    getCompanyDetailLoading
  }
}

const UPDATE_VENDOR_DATA = gql`
  mutation updateVendor($data: UpdateVendorInput) {
    updateVendor(data: $data)
  }
`;

export const useUpdateVendorData = () => {
  const [updateVendorData, { error: updateVendorDataError, loading: updateVendorDataLoading, data: updateVendorDataData }] = useMutation(UPDATE_VENDOR_DATA);

  return {
    updateVendorData,
    updateVendorDataError,
    updateVendorDataLoading,
    updateVendorDataData
  }
};

const UPDATE_CUSTOMER_DATA = gql`
  mutation updateCustomer($data: UpdateCustomerInput) {
    updateCustomer(data: $data)
  }
`;

export const useUpdateCustomerData = () => {
  const [updateCustomerData, { error: updateCustomerDataError, loading: updateCustomerDataLoading, data: updateCustomerDataData }] = useMutation(UPDATE_CUSTOMER_DATA);

  return {
    updateCustomerData,
    updateCustomerDataError,
    updateCustomerDataLoading,
    updateCustomerDataData
  }
};