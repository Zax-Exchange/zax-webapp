import { gql } from "@apollo/client";

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
${PROJECT_BID_COMPONENT_FRAGMENT}
  query getProjectBid($data: GetProjectBidInput!) {
    getProjectBid(data: $data) {
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
      createdAt
      updatedAt
    }
  }
`