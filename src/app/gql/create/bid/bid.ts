import { gql } from "@apollo/client";

const CREATE_PROJECT_BID_COMPONENTS = gql`
  mutation createProjectBidComponents($data: [CreateProjectBidComponentInput!]!) {
    createProjectBidComponents(data: $data)
  }
`;