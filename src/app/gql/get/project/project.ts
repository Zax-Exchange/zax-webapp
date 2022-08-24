import { gql } from "@apollo/client";

const GET_PROJECT_USERS = gql`
  query getProjectUsers($projectId: String!) {
    getProjectUsers(projectId: $projectId) {
      userId
      name
      email
      permission
    } 
  }
`;


const GET_PROJECT_DETAIL = gql`
  query getProjectDetail($projectId: String!) {
    getProjectDetail(projectId: $projectId) {
      id
      userId
      companyId
      name
      deliveryDate
      deliveryAddress
      budget
      design {
        fileName
        url
      }
      status
      components {
        id
        projectId
        name
        materials
        dimension
        postProcess
      }
      createdAt
      updatedAt
    }
  }
`;

const SEARCH_PROJECTS = gql`
  query searchProjects($searchInput: SearchProjectInput!) {
    searchCustomerProjects(searchInput: $searchInput) {
      name
      companyName
      materials
      id
      companyId
      deliveryDate
      deliveryAddress
      budget
      createdAt
    }
  }
`;