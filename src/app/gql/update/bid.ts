import { gql } from "@apollo/client";

const UPDATE_PROJECT_BID_PERMISSION = gql`
  mutation updateProjectBidPermissions($data: UpdateProjectBidPermissionsInput) {
    updateProjectBidPermissions(data: $data)
  }
`;