import { gql } from "@apollo/client";

const DELETE_PROJECT_BID_PERMISSION = gql`
  mutation deleteProjectBidPermissions($data: DeleteProjectBidPermissionsInput!) {
    deleteProjectBidPermissions(data: $data)
  }
`;

const DELETE_BID_REMARK = gql`
  mutation deleteBidRemark($data: DeleteBidRemarkInput!) {
    deleteBidRemark(data: $data)
  }
`