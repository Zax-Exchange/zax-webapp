import { gql } from "@apollo/client";

const CREATE_STRIPE_CUSTOMER = gql`
  mutation createStripeCustomer($email: String!) {
    createStripeCustomer(email: $email)
  }
`;