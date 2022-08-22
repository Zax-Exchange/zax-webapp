import { gql } from "@apollo/client";

const INVITE_USER = gql`
  mutation inviteUser($email: String!, $userId: String!) {
    inviteUser(email: $email, userId: $userId)
  }
`;

