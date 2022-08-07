import { gql, useQuery } from "@apollo/client";

const GET_COMPANY_PLAN = gql`
  query getCompanyPlanWithCompanyId($companyId: String) {
    getCompanyPlanWithCompanyId(companyId: $companyId) {
      name
      tier
      price
      billingFrequency
      licensedUsers
      remainingQuota
      memberSince
      subscriptionStartDate
      subscriptionEndDate
      trialStartDate
      trialEndDate
    }
  }
`

export const useGetCompanyPlan = (companyId) => {
  const {
    data: getCompanyPlanData,
    error: getCompanyPlanError,
    loading: getCompanyPlanLoading
  } = useQuery(GET_COMPANY_PLAN, {
    variables: {
      companyId
    }
  });

  return {
    getCompanyPlanData,
    getCompanyPlanError,
    getCompanyPlanLoading
  }
}