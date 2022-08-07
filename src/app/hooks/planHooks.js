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

/**
 * Gets company plan details
 * @param {string} companyId 
 * @returns 
 */
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
};

const GET_ALL_PLANS = gql`
  query getAllPlans($isVendor: Boolean) {
    getAllPlans(isVendor: $isVendor) {
      id
      isVendor
      planTier
      name
      licensedUsers
      features
      pricings {
        monthly {
          price
          priceId
        }
        annual {
          price
          priceId
        }
        additionalLicense {
          price 
          priceId
        }
      }
    }
  }
`;

/**
 * Gets all customer/vendor plan details
 * @param {boolean} isVendor 
 * @returns 
 */
export const useGetAllPlans = (isVendor) => {
  const {error: getAllPlansError, loading: getAllPlansLoading, data: getAllPlansData, refetch: getAllPlansRefetch} = useQuery(GET_ALL_PLANS, {
    variables: {
      isVendor
    }
  });

  return {
    getAllPlansData,
    getAllPlansError,
    getAllPlansLoading,
    getAllPlansRefetch
  }
}