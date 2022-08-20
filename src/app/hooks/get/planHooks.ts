import { gql, useQuery } from "@apollo/client";
import { GetAllPlans } from "../types/plan/getPlanTypes";

const GET_ALL_PLANS = gql`
  query getAllPlans($isVendor: Boolean) {
    getAllPlans(isVendor: $isVendor) {
      id
      isVendor
      companySize
      tier
      pricings {
        monthly {
          price
          priceId
        }
        annual {
          price
          priceId
        }
        perUser {
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
export const useGetAllPlans = (isVendor: boolean) => {
  const {
    error: getAllPlansError,
    loading: getAllPlansLoading,
    data: getAllPlansData,
    refetch: getAllPlansRefetch,
  } = useQuery<GetAllPlans>(GET_ALL_PLANS, {
    variables: {
      isVendor,
    },
  });

  return {
    getAllPlansData,
    getAllPlansError,
    getAllPlansLoading,
    getAllPlansRefetch,
  };
};
