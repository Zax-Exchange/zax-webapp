import { gql } from "@apollo/client";

const GET_CUSTOMER_PROJECT = gql`
  query getCustomerProject($data: GetCustomerProjectInput!) {
    getCustomerProject(data: $data) {
      id
      userId
      companyId
      creationMode
      name
      category
      totalWeight
      deliveryDate
      deliveryAddress
      targetPrice
      orderQuantities
      comments
      status
      permission
      createdAt
      updatedAt
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
          dimension {
            x
            y
            z
          }
          boxStyle
          style
          includeArtworkInQuote
          purpose
          shape
          thickness
          flute
          color
          manufacturingProcess
          material
          materialSource
          postProcess {
            postProcessName
            isInside
            printingMethod
            numberOfColors
            color
            estimatedArea {
              x
              y
            }
            fontSize
          }
          finish
          outsideMaterial
          outsideMaterialSource
        
          outsideFinish
          outsideColor
          insideMaterial
          insideMaterialSource
        
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
          samplingFee
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