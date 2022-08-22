import { gql } from "@apollo/client";

const UPDATE_USER_PASSWORD = gql`
  mutation updateUserPassword($data: UpdateUserPasswordInput!) {
    updateUserPassword(data: $data)
  }
`;