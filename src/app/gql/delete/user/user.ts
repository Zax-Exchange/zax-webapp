import { gql } from "@apollo/client";

const DEACTIVATE_USER = gql`
  mutation deactivateCustomerUser($data: DeactivateUserInput!) {
    deactivateCustomerUser(data: $data)
  }
`;