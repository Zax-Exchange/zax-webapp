import { gql } from "@apollo/client";

const GET_PROJECT_BID_USERS = gql`
  query getProjectBidUsers($projectBidId: String) {
    getProjectBidUsers(projectBidId: $projectBidId) {
      userId
      name
      email
      permission
    } 
  }
`;