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