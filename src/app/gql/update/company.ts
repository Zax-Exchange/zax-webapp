import { gql } from "@apollo/client";

const UPDATE_COMPANY_PLAN_SUBSCRIPTION_INFO = gql`
  mutation updateCompanyPlanSubscriptionInfo($subscriptionId: String) {
    updateCompanyPlanSubscriptionInfo(subscriptionId: $subscriptionId)
  }
`;

const UPDATE_COMPANY_STATUS = gql`
  mutation updateCompanyStatus($companyId: String, $isActive: Boolean) {
    updateCompanyStatus(companyId: $companyId, isActive: $isActive)
  }
`;