import { gql } from "@apollo/client";

const CREATE_STRIPE_CUSTOMER = gql`
  mutation createStripeCustomer($data: CreateStripeCustomerInput!) {
    createStripeCustomer(data: $data)
  }
`;