import { gql } from "@apollo/client";

const CHECK_USER_EMAIL = gql`
  query checkUserEmail($data: CheckUserEmailInput!) {
    checkUserEmail(data: $data)
  }
`;

const USER_LOGIN = gql`
  query login($data: UserLoginInput!) {
    login(data: $data) {
      id
      companyId
      isVendor
      power
      name
      email
      token
      chatToken
    }
  }
`;

const INVITE_USERS = gql`
  mutation inviteUsers($data: [InviteUserInput!]!) {
    inviteUsers(data: $data)
  }
`;

const REQUEST_TO_JOIN_COMPANY = gql`
  mutation requestToJoin($data: RequestToJoinInput!) {
    requestToJoin(data: $data)
  }
`

const SEND_FORGOT_PASSWORD_LINK = gql`
  mutation sendPasswordResetLink($data: SendPasswordResetLinkInput!) {
    sendPasswordResetLink(data: $data)
  }
`

const RESET_PASSWORD = gql`
  mutation resetPassword($data: ResetPasswordInput!) {
    resetPassword(data: $data)
  }
`

const CHECK_JWT_SIGNUP_TOKEN = gql`
  query checkSignupJwtToken($data: CheckSignupJwtTokenInput!) {
    checkSignupJwtToken(data: $data)
  }
`