import { gql } from "@apollo/client";

const CREATE_CUSTOMER = gql`
  mutation createCustomer($data: CreateCustomerInput!) {
    createCustomer(data: $data)
  }
`;

const CREATE_CUSTOMER_SUBSCRIPTION = gql`
  mutation createCustomerSubscription(
    $priceId: String!
    $stripeCustomerId: String!
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