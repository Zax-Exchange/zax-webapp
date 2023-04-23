import { gql } from "@apollo/client";

const CHECK_COMPANY_NAME = gql`
  query checkCompanyName($data: CheckCompanyNameInput!) {
    checkCompanyName(data: $data)
  }
`;

const GET_ALL_PENDING_JOIN_REQUESTS = gql`
  query getAllPendingJoinRequests($data: GetAllPendingJoinRequestsInput!) {
    getAllPendingJoinRequests(data: $data)
  }
`

const DELETE_PENDING_JOIN_REQUESTS = gql`
  mutation deletePendingJoinRequests($data: [DeletePendingJoinRequestInput!]!) {
    deletePendingJoinRequests(data: $data)
  }
`

const SEND_VENDOR_SIGNUP_INVITATION = gql`
  mutation sendVendorSignupInvitation($data: SendVendorSignupInvitationInput!) {
    sendVendorSignupInvitation(data: $data)
  }
`