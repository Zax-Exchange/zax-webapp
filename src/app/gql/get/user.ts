import { gql } from "@apollo/client";

const GET_USER = gql`
  query getUserWithUserId($userId: String, $paranoid: Boolean) {
    getUserWithUserId(userId: $userId) {
      id
      name
      email
      companyId
      isActive
    }
  }
`;