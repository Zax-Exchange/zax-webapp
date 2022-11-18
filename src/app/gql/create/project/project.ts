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

const CREATE_PROJECT_COMPONENTS = gql`
  mutation createProjectComponents($data: [CreateProjectComponentInput!]!) {
    createProjectComponents(data: $data)
  }
`