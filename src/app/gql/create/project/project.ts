import { gql } from "@apollo/client";

const CREATE_PROJECT_BID = gql`
  mutation CreateProjectBid($data: CreateProjectBidInput!) {
    createProjectBid(data: $data)
  }
`;

const CREATE_PROJECT = gql`
  mutation createProject($data: CreateProjectInput!) {
    createProject(data: $data)
  }
`;

const CREATE_GUEST_PROJECT = gql`
mutation createGuestProject($data: CreateGuestProjectInput!) {
    createGuestProject(data: $data)
  }
`

const CREATE_PROJECT_INVITATION = gql`
  mutation createProjectInvitation($data: CreateProjectInvitationInput!) {
    createProjectInvitation(data: $data)
  }
`