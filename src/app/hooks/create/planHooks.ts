import { gql, useMutation } from "@apollo/client";
import { CreateCustomerSubscriptionData, CreateCustomerSubscriptionInput, CreateStripeCustomerData, CreateStripeCustomerInput, CreateVendorSubscriptionData, CreateVendorSubscriptionInput } from "../types/plan/createPlanTypes";

const CREATE_STRIPE_CUSTOMER = gql`
  mutation createStripeCustomer($email: String) {
    createStripeCustomer(email: $email)
  }
`;

export const useCreateStripeCustomer = () => {
  const [
    createStripeCustomer,
    {
      data: createStripeCustomerData,
      loading: createStripeCustomerLoading,
      error: createStripeCustomerError,
    },
  ] = useMutation<CreateStripeCustomerData, CreateStripeCustomerInput>(CREATE_STRIPE_CUSTOMER);

  return {
    createStripeCustomer,
    createStripeCustomerLoading,
    createStripeCustomerError,
    createStripeCustomerData,
  };
};

const CREATE_CUSTOMER_SUBSCRIPTION = gql`
  mutation createCustomerSubscription(
    $priceId: String
    $stripeCustomerId: String
  ) {
    createCustomerSubscription(
      priceId: $priceId
      stripeCustomerId: $stripeCustomerId
    ) {
      clientSecret
      subscriptionId
    }
  }
`;

const CREATE_VENDOR_SUBSCRIPTION = gql`
  mutation createVendorSubscription($data: CreateVendorSubscriptionInput) {
    createVendorSubscription(data: $data) {
      clientSecret
      subscriptionId
    }
  }
`;

export const useCreateSubscription = (isVendor: boolean) => {
  const [
    createSubscription,
    {
      data: createSubscriptionData,
      loading: createSubscriptionLoading,
      error: createSubscriptionError,
    },
  ] = useMutation<CreateCustomerSubscriptionData | CreateVendorSubscriptionData, CreateCustomerSubscriptionInput | CreateVendorSubscriptionInput>(
    isVendor ? CREATE_VENDOR_SUBSCRIPTION : CREATE_CUSTOMER_SUBSCRIPTION
  );

  return {
    createSubscription,
    createSubscriptionLoading,
    createSubscriptionError,
    createSubscriptionData,
  };
};