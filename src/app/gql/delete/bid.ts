import { gql } from "@apollo/client";

const DELETE_PROJECT_BID_PERMISSION = gql`
  mutation deleteProjectBidPermissions($data: DeleteProjectBidPermissionsInput) {
    deleteProjectBidPermissions(data: $data)
  }
`;