import { gql } from "@apollo/client";
import { FILE_FRAGMENT } from "../../utils/common/file";

export const PROJECT_BID_COMPONENT_FRAGMENT = gql`
  fragment ProjectBidComponentFragment on ProjectBidComponent {
    id
    projectBidId
    projectComponentId
    samplingFee
    toolingFee
    quantityPrices {
      quantity
      price
    }
  }`

export const PROJECT_BID_FRAGMENT = gql`
${PROJECT_BID_COMPONENT_FRAGMENT}
${FILE_FRAGMENT}
  fragment ProjectBidFragment on ProjectBid {
    id
      userId
      companyId
      projectId
      components {
        ...ProjectBidComponentFragment
      }
      status
      remarkFile {
        ...FileFragment
      }
      createdAt
      updatedAt
  }
`

export const PERMISSIONED_PROJECT_BID_FRAGMENT = gql`
${PROJECT_BID_COMPONENT_FRAGMENT}
  fragment PermissionedProjectBidFragment on PermissionedProjectBid {
    id
      userId
      companyId
      projectId
      components {
        ...ProjectBidComponentFragment
      }
      status
      remarkFile {
        fileId
        filename
        url
      }
      permission
      createdAt
      updatedAt
  }
`
const GET_PROJECT_BID_USERS = gql`
  query getProjectBidUsers($data: GetProjectBidUsersInput!) {
    getProjectBidUsers(data: $data) {
      userId
      name
      email
      permission
    } 
  }
`;

const GET_PROJECT_BID = gql`
${PROJECT_BID_FRAGMENT}
  query getProjectBid($data: GetProjectBidInput!) {
    getProjectBid(data: $data) {
      ...ProjectBidFragment
    }
  }
`

const GET_PROJECT_BIDS_FOR_PO = gql`
  query getProjectBidsForPo($data: GetProjectBidsForPoInput!) {
    getProjectBidsForPo(data: $data) {
      projectBidId
      companyId
      companyName
    }
  }
`