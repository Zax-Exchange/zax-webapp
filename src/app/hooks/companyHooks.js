import { gql, useLazyQuery, useMutation, useQuery } from "@apollo/client";
import { useContext } from "react";
import { AuthContext } from "../../context/AuthContext";

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
  ] = useMutation(INVITE_USER);

  return {
    inviteUser,
    inviteUserData,
    inviteUserError,
    inviteUserLoading,
  };
};

const GET_COMPANY_DETAIL = gql`
  query getCompanyDetail($companyId: String) {
    getCompanyDetail(companyId: $companyId) {
      id
      name
      contactEmail
      logo
      phone
      fax
      country
      isActive
      isVendor
      isVerified
      companyUrl

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
    refetch: getCompanyDetailRefetch,
  } = useQuery(GET_COMPANY_DETAIL, {
    variables: {
      companyId: user.companyId,
    },
  });

  return {
    getCompanyDetailRefetch,
    getCompanyDetailError,
    getCompanyDetailData,
    getCompanyDetailLoading,
  };
};

const UPDATE_VENDOR_DATA = gql`
  mutation updateVendor($data: UpdateVendorInput) {
    updateVendor(data: $data)
  }
`;

export const useUpdateVendorData = () => {
  const [
    updateVendorData,
    {
      error: updateVendorDataError,
      loading: updateVendorDataLoading,
      data: updateVendorDataData,
    },
  ] = useMutation(UPDATE_VENDOR_DATA);

  return {
    updateVendorData,
    updateVendorDataError,
    updateVendorDataLoading,
    updateVendorDataData,
  };
};

const UPDATE_CUSTOMER_DATA = gql`
  mutation updateCustomer($data: UpdateCustomerInput) {
    updateCustomer(data: $data)
  }
`;

export const useUpdateCustomerData = () => {
  const [
    updateCustomerData,
    {
      error: updateCustomerDataError,
      loading: updateCustomerDataLoading,
      data: updateCustomerDataData,
    },
  ] = useMutation(UPDATE_CUSTOMER_DATA);

  return {
    updateCustomerData,
    updateCustomerDataError,
    updateCustomerDataLoading,
    updateCustomerDataData,
  };
};

const GET_VENDOR_DETAIL = gql`
  query getVendorDetail($companyId: String) {
    getVendorDetail(companyId: $companyId) {
      id
      name
      phone
      logo
      country
      isActive
      companyUrl
      fax
      isVerified
      locations
      materials
      moq
      leadTime
    }
  }
`;

export const useGetVendorDetail = () => {
  const [
    getVendorDetail,
    {
      error: getVendorDetailError,
      loading: getVendorDetailLoading,
      data: getVendorDetailData,
    },
  ] = useLazyQuery(GET_VENDOR_DETAIL);

  return {
    getVendorDetail,
    getVendorDetailData,
    getVendorDetailError,
    getVendorDetailLoading,
  };
};

const UPDATE_COMPANY_PLAN_SUBSCRIPTION_INFO = gql`
  mutation updateCompanyPlanSubscriptionInfo($subscriptionId: String) {
    updateCompanyPlanSubscriptionInfo(subscriptionId: $subscriptionId)
  }
`;

export const useUpdateCompanyPlanSubscriptionInfo = () => {
  const [
    updateCompanyPlanSubscriptionInfo,
    {
      data: updateCompanyPlanSubscriptionInfoData,
      error: updateCompanyPlanSubscriptionInfoError,
      loading: updateCompanyPlanSubscriptionInfoLoading,
    },
  ] = useMutation(UPDATE_COMPANY_PLAN_SUBSCRIPTION_INFO);

  return {
    updateCompanyPlanSubscriptionInfo,
    updateCompanyPlanSubscriptionInfoData,
    updateCompanyPlanSubscriptionInfoError,
    updateCompanyPlanSubscriptionInfoLoading,
  };
};

const UPDATE_COMPANY_STATUS = gql`
  mutation updateCompanyStatus($companyId: String, $isActive: Boolean) {
    updateCompanyStatus(companyId: $companyId, isActive: $isActive)
  }
`;

export const useUpdateCompanyStatus = () => {
  const [
    updateCompanyStatus,
    {
      data: updateCompanyStatusData,
      loading: updateCompanyStatusLoading,
      error: updateCompanyStatusError,
    },
  ] = useMutation(UPDATE_COMPANY_STATUS);

  return {
    updateCompanyStatus,
    updateCompanyStatusData,
    updateCompanyStatusLoading,
    updateCompanyStatusError,
  };
};
