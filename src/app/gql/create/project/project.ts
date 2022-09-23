import { gql } from "@apollo/client";

const CREATE_PROJECT_BID = gql`
  mutation CreateProjectBid($data: CreateProjectBidInput!) {
    createProjectBid(data: $data)
  }
`;

const CREATE_PROJECT = gql`
  mutation createProject($data: CreateProjectInput!) {
    createProject(data: $data)
  }
`;

const UPLOAD_PROJECT_DESIGN = gql`
  mutation uploadProjectDesign($file: Upload!) {
    uploadProjectDesign(file: $file) {
      filename
      designId
      url
    }
  }
`;