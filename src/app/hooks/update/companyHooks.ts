import { gql, useMutation } from "@apollo/client";

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
  ] = useMutation<{updateCompanyPlanSubscriptionInfo: boolean}>(UPDATE_COMPANY_PLAN_SUBSCRIPTION_INFO);

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