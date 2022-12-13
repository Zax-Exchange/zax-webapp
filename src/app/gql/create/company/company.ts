import { gql } from "@apollo/client";

const CREATE_STRIPE_CUSTOMER_IN_STRIPE_FOR_CUSTOMER = gql`
  mutation createStripeCustomerInStripeForCustomer($data: CreateStripeCustomerInStripeForCustomerInput!) {
    createStripeCustomerInStripeForCustomer(data: $data) {
      subscriptionId
      clientSecret
      customerId
    }
  }
`;

const CREATE_STRIPE_CUSTOMER_IN_STRIPE_FOR_VENDOR = gql`
  mutation createStripeCustomerInStripeForVendor($data: CreateStripeCustomerInStripeForVendorInput!) {
    createStripeCustomerInStripeForVendor(data: $data) {
      subscriptionId
      clientSecret
      customerId
    }
  }
`;