import { gql } from "@apollo/client";

const GET_CUSTOMER_PROJECT = gql`
  query getCustomerProject($data: GetCustomerProjectInput!) {
    getCustomerProject(data: $data) {
      id
      userId
      companyId
      name
      category
      totalWeight
      deliveryDate
      deliveryAddress
      design {
        fileName
        url
      }
      targetPrice
      orderQuantities
      status
      permission
      createdAt
      updatedAt
      components {
        id
        projectId
        name
        componentSpec {
          id
          productName
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

      bids {
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
  }
`;

const GET_CUSTOMER_PROJECTS = gql`
  query GetCustomerProjects($data: GetCustomerProjectsInput!) {
    getCustomerProjects(data: $data) {
      id
      userId
      name
      deliveryDate
      deliveryAddress
      targetPrice
      orderQuantities
      status
      permission
      createdAt
      updatedAt
  }
  }
`;

const GET_CUSTOMER_DETAIL = gql`
  query getCustomerDetail($data: GetCustomerDetailInput!) {
    getCustomerDetail(data: $data) {
        id
        name
        contactEmail
        logo
        country
        phone
        fax
        isVerified
        isActive
        companyUrl
    }
  }
`