import { gql } from "@apollo/client";

const GET_PROJECT_USERS = gql`
  query getProjectUsers($data: GetProjectUsersInput!) {
    getProjectUsers(data: $data) {
      userId
      name
      email
      permission
    } 
  }
`;


const GET_PROJECT_DETAIL = gql`
  query getProjectDetail($data: GetProjectDetailInput!) {
    getProjectDetail(data: $data) {
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
      }
      createdAt
      updatedAt
    }
  }
`;

const SEARCH_CUSTOMER_PROJECTS = gql`
  query searchCustomerProjects($data: SearchCustomerProjectInput!) {
    searchCustomerProjects(data: $data) {
      name
      companyName
      products
      id
      companyId
      deliveryDate
      deliveryAddress
      budget
      createdAt
    }
  }
`;