import { gql } from "@apollo/client";

const CREATE_STRIPE_CUSTOMER_IN_STRIPE = gql`
  mutation createStripeCustomerInStripe($data: CreateStripeCustomerInStripeInput!) {
    createStripeCustomerInStripe(data: $data) {
      subscriptionId
      clientSecret
      customerId
    }
  }
`;