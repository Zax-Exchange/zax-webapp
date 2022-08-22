import { gql } from "@apollo/client";

const DEACTIVATE_USER = gql`
  mutation deactivateUser($email: String!) {
    deactivateUser(email: $email)
  }
`;