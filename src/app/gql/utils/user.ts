import { gql } from "@apollo/client";

const CHECK_USER_EMAIL = gql`
  query checkUserEmail($email: String) {
    checkUserEmail(email: $email)
  }
`;