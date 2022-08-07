
import { gql, useQuery, useMutation, useLazyQuery } from "@apollo/client";

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

const CHECK_COMPANY_NAME = gql`
  query checkCompanyName($name: String) {
    checkCompanyName(name: $name)
  }
`;

export const useCheckCompanyName = () => {
  const [
    checkCompanyName,
    {
      data: checkCompanyNameData,
      loading: checkCompanyNameLoading,
      error: checkCompanyNameError
    }
  ] = useLazyQuery(CHECK_COMPANY_NAME)

  return {
    checkCompanyName,
    checkCompanyNameData,
    checkCompanyNameLoading,
    checkCompanyNameError
  }
};

const CHECK_USER_EMAIL = gql`
  query checkUserEmail($email: String) {
    checkUserEmail(email: $email)
  }
`;

export const useCheckUserEmail = () => {
  const [
    checkUserEmail,
    {
      data: checkUserEmailData,
      error: checkUserEmailError,
      loading: checkUserEmailLoading
    }
  ] = useLazyQuery(CHECK_USER_EMAIL)

  return {
    checkUserEmail,
    checkUserEmailData,
    checkUserEmailLoading,
    checkUserEmailError
  }
};