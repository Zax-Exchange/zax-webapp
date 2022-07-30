
import { gql, useQuery, useMutation } from "@apollo/client";

const CREATE_VENDOR = gql`
  mutation createVendor($data: CreateVendorInput) {
    createVendor(data: $data) 
  }
`;

const CREATE_CUSTOMER = gql`
  mutation createCustomer($data: CreateCustomerInput) {
    createCustomer(data: $data)
  }
`

const GET_ALL_PLANS = gql`
  query getAllPlans {
    getAllPlans {
      id
      name
      price
      licensedUsers
    }
  }
`;

/**
 * 
 * @returns createCompany, createCompanyLoading, createCompanyError, createCompanySuccess
 */
export const useCreateCompany = (isVendor) => {
  const [createCompany, {loading: createCompanyLoading, error: createCompanyError, data: createCompanySuccess}] = useMutation(isVendor ? CREATE_VENDOR : CREATE_CUSTOMER);
  return {
    createCompany,
    createCompanyLoading,
    createCompanyError,
    createCompanySuccess
  }
}
/**
 * 
 * @returns getAllPlansData, getAllPlansError, getAllPlansLoading
 */
export const useGetAllPlans = () => {
  const {error: getAllPlansError, loading: getAllPlansLoading, data: getAllPlansData, refetch: getAllPlansRefetch} = useQuery(GET_ALL_PLANS);

  return {
    getAllPlansData,
    getAllPlansError,
    getAllPlansLoading,
    getAllPlansRefetch
  }
}