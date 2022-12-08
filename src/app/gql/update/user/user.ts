import { gql } from "@apollo/client";

const UPDATE_USER_PASSWORD = gql`
  mutation updateUserPassword($data: UpdateUserPasswordInput!) {
    updateUserPassword(data: $data)
  }
`;

const UPDATE_USER_POWER = gql`
  mutation updateUserPower($data: [UpdateUserPowerInput!]!) {
    updateUserPower(data: $data)
  }
`