import { gql } from "@apollo/client";

const CREATE_USER = gql`
  mutation createUser($data: CreateUserInput!) {
    createUser(data: $data) {
      id
      companyId
      isVendor
      isAdmin
      isActive
      name
      email
      token
      notificationToken
      chatToken
    }
  }
`;