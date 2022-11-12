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

const DELETE_PENDING_JOIN_REQUEST = gql`
  mutation deletePendingJoinRequest($data: DeletePendingJoinRequestInput!) {
    deletePendingJoinRequest(data: $data)
  }
`