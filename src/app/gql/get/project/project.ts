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

const GET_PROJECT_CHANGELOG = gql`
  query getProjectChangelog($data: GetProjectChangelogInput!) {
    getProjectChangelog(data: $data) {
      projectId
      changedAt
      changes {
        propertyName
        oldValue
        newValue
      }
    }
  }
`

const GET_PROJECT_DETAIL = gql`
  query getProjectDetail($data: GetProjectDetailInput!) {
    getProjectDetail(data: $data) {
      id
      userId
      companyName
      companyId
      name
      category
      totalWeight
      deliveryDate
      deliveryAddress
      targetPrice
      orderQuantities
      comments
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