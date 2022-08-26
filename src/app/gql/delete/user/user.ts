import { gql } from "@apollo/client";

const DEACTIVATE_USER = gql`
  mutation deactivateUser($data: DeactivateUserInput!) {
    deactivateUser(data: $data)
  }
`;