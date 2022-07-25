
import { gql, useQuery, useMutation } from "@apollo/client";

const CREATE_COMPANY = gql`
  mutation createCompany($data: CreateCompanyInput) {
    createCompany(data: $data) 
  }
`;

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
export const useCreateCompany = () => {
  const [createCompany, {loading: createCompanyLoading, error: createCompanyError, data: createCompanySuccess}] = useMutation(CREATE_COMPANY);
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
  const {error: getAllPlansError, loading: getAllPlansLoading, data: getAllPlansData} = useQuery(GET_ALL_PLANS);

  return {
    getAllPlansData,
    getAllPlansError,
    getAllPlansLoading
  }
}