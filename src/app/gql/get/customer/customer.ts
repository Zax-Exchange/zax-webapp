import { gql } from "@apollo/client";

const GET_CUSTOMER_PROJECT = gql`
  query getCustomerProject($data: GetProjectInput!) {
    getCustomerProject(data: $data) {
      id
      userId
      companyId
      name
      deliveryDate
      deliveryAddress
      design {
        fileName
        url
      }
      budget
      status
      permission
      createdAt
      updatedAt
      components {
        id
        projectId
        name
        materials
        dimension
        postProcess
      }

      bids {
        id
        userId
        companyId
        components {
          id
          projectBidId
          projectComponentId
          quantityPrices {
            quantity
            price
          }
        }
        createdAt
        updatedAt
      }
    }
  }
`;

const GET_CUSTOMER_PROJECTS = gql`
  query GetCustomerProjects($userId: String!) {
    getCustomerProjects(userId: $userId) {
      id
      userId
      companyId
      name
      deliveryDate
      deliveryAddress
      design {
        fileName
        url
      }
      budget
      status
      permission
      createdAt
      updatedAt
      components {
        id
        projectId
        name
        materials
        dimension
        postProcess
      }

      bids {
        id
        userId
        companyId
        components {
          id
          projectBidId
          projectComponentId
          quantityPrices {
            quantity
            price
          }
        }
        createdAt
        updatedAt
      }
    }
  }
`;

const GET_EDITABLE_CUSTOMER_DETAIL = gql`
  query getEditableCustomerDetail($companyId: String!) {
    getEditableCustomerDetail(companyId: $companyId) {
        name
        contactEmail
        phone
        logo
        country
        companyUrl
        fax
    }
  }
`