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
      companyName
      companyId
      name
      deliveryDate
      deliveryAddress
      targetPrice
      orderQuantities
      status
      components {
        id
        projectId
        name
        designs {
          designId
          filename
          url
        }
        componentSpec {
          id
          productName
          boxStyle
          style
          dimension
          productName
          dimension
          thickness
          flute
          color
          manufacturingProcess
          material
          materialSource
          postProcess
          finish
          outsideMaterial
          outsideMaterialSource
          outsidePostProcess
          outsideFinish
          outsideColor
          insideMaterial
          insideMaterialSource
          insidePostProcess
          insideFinish
          insideColor
        }
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
      category
      products
      id
      companyId
      deliveryDate
      deliveryAddress
      targetPrice
      orderQuantities
      createdAt
    }
  }
`;