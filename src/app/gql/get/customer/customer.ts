import { gql } from "@apollo/client";

const GET_CUSTOMER_PROJECT = gql`
  query getCustomerProject($data: GetCustomerProjectInput!) {
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
  query GetCustomerProjects($data: GetCustomerProjectsInput!) {
    getCustomerProjects(data: $data) {
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
  query getEditableCustomerDetail($data: GetEditableCustomerDetailInput!) {
    getEditableCustomerDetail(data: $data) {
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