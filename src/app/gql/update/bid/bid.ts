import { gql } from "@apollo/client";

const UPDATE_PROJECT_BID_PERMISSION = gql`
  mutation updateProjectBidPermissions($data: UpdateProjectBidPermissionsInput!) {
    updateProjectBidPermissions(data: $data)
  }
`;

const UPDATE_PROJECT_BID_COMPONENTS = gql`
  mutation updateProjectBidComponents($data: [UpdateProjectBidComponentInput!]!) {
    updateProjectBidComponents(data: $data)
  }
`

const UPDATE_PROJECT_BID = gql`
  mutation updateProjectBid($data: UpdateProjectBidInput!) {
    updateProjectBid(data: $data)
  }
`