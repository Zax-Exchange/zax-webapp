import { gql } from "@apollo/client";

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
  query getProjectBid($data: GetProjectBidInput!) {
    getProjectBid(data: $data) {
      id
      userId
      companyId
      projectId
      comments
      components {
        id
        projectBidId
        projectComponentId
        quantityPrices {
          quantity
          price
        }
      }
      status
      createdAt
      updatedAt
    }
  }
`