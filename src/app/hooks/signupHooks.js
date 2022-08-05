
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
  const [createCompany, {loading: createCompanyLoading, error: createCompanyError, data: createCompanyData}] = useMutation(isVendor ? CREATE_VENDOR : CREATE_CUSTOMER);
  return {
    createCompany,
    createCompanyLoading,
    createCompanyError,
    createCompanyData
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

const CREATE_STRIPE_CUSTOMER = gql`
  mutation createStripeCustomer($email: String) {
    createStripeCustomer(email: $email)
  }
`;

export const useCreateStripeCustomer = () => {
  const [createStripeCustomer, { data: createStripeCustomerData, loading: createStripeCustomerLoading, error: createStripeCustomerError }] = useMutation(CREATE_STRIPE_CUSTOMER);

  return {
    createStripeCustomer,
    createStripeCustomerLoading,
    createStripeCustomerError,
    createStripeCustomerData
  }
}

const CREATE_SUBSCRIPTION = gql`
  mutation createSubscription($priceId: String, $customerId: String) {
    createSubscription(priceId: $priceId, customerId: $customerId) {
      clientSecret
      subscriptionId
    }
  }
`;

export const useCreateSubscription = () => {
  const [createSubscription, { data: createSubscriptionData, loading: createSubscriptionLoading, error: createSubscriptionError }] = useMutation(CREATE_SUBSCRIPTION);

  return {
    createSubscription,
    createSubscriptionLoading,
    createSubscriptionError,
    createSubscriptionData
  }
}