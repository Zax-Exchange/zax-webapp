import { gql } from "@apollo/client";

const UPDATE_COMPANY_PLAN_SUBSCRIPTION_INFO = gql`
  mutation updateCompanyPlanSubscriptionInfo($data: UpdateCompanyPlanSubscriptionInfoInput!) {
    updateCompanyPlanSubscriptionInfo(data: $data)
  }
`;

const UPDATE_COMPANY_STATUS = gql`
  mutation updateCompanyStatus($data: UpdateCompanyStatusInput!) {
    updateCompanyStatus(data: $data)
  }
`;