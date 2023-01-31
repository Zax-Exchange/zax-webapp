import { gql } from "@apollo/client";
import { FILE_FRAGMENT } from "../../utils/common/file";

export const PROJECT_COMPONENT_FRAGMENT = gql`
${FILE_FRAGMENT}
  fragment ProjectComponentFragment on ProjectComponent {
    id
        projectId
        name
        designs {
          ...FileFragment
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
          numberOfPages
          postProcess {
            postProcessName
            isInside
            printingMethod
            numberOfColors {
              c
              t
            }
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
`

export const PROJECT_FRAGMENT = gql`
  fragment ProjectFragment on ProjectInterface {
      id
      userId
      companyId
      companyName
      name
      category
      totalWeight
      deliveryDate
      deliveryAddress
      targetPrice
      orderQuantities
      status
      createdAt
      updatedAt
  }
`

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

const GET_PROJECT_COMPONENT_CHANGELOG = gql`
  query getProjectComponentChangelog($data: GetProjectComponentChangelogInput!) {
    getProjectComponentChangelog(data: $data) {
      projectComponentId
      changedAt
      changes {
        projectComponentSpecId
        propertyName
        oldValue
        newValue
      }
    }
  }
`

const GET_PROJECT_DETAIL = gql`
  ${PROJECT_FRAGMENT}
  ${PROJECT_COMPONENT_FRAGMENT}
  query getProjectDetail($data: GetProjectDetailInput!) {
    getProjectDetail(data: $data) {
      ...ProjectFragment
      country
      guestEmail
      components {
        ...ProjectComponentFragment
      }
      
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