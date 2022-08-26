import { gql } from "@apollo/client";

const GET_USER = gql`
  query getUser($data: GetUserInput!) {
    getUser(data: $data) {
      id
      name
      email
      companyId
      isActive
    }
  }
`;