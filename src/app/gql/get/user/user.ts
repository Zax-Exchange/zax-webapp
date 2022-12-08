import { gql } from "@apollo/client";
export const USER_FRAGMENT = gql`
  fragment UserFragment on UserInterface {
      id
      name
      email
      companyId
      isVendor
      power
  }
`

const GET_USER = gql`
${USER_FRAGMENT}
  query getUser($data: GetUserInput!) {
    getUser(data: $data) {
      ...UserFragment
      status
    }
  }
`;