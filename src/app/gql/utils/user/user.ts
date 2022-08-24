import { gql } from "@apollo/client";

const CHECK_USER_EMAIL = gql`
  query checkUserEmail($email: String!) {
    checkUserEmail(email: $email)
  }
`;

const USER_LOGIN = gql`
  query login($data: UserLoginInput!) {
    login(data: $data) {
      id
      companyId
      isVendor
      isAdmin
      name
      email
      token
      notificationToken
      chatToken
    }
  }
`;

const INVITE_USER = gql`
  mutation inviteUser($email: String!, $userId: String!) {
    inviteUser(email: $email, userId: $userId)
  }
`;