import { gql } from "@apollo/client";
import { PROJECT_BID_COMPONENT_FRAGMENT } from "../bid/bid";
import {PROJECT_COMPONENT_FRAGMENT} from "../project/project"
import {PROJECT_FRAGMENT} from "../project/project"

const GET_CUSTOMER_PROJECT = gql`
  ${PROJECT_FRAGMENT}
  ${PROJECT_COMPONENT_FRAGMENT}
  ${PROJECT_BID_COMPONENT_FRAGMENT}
  query getCustomerProject($data: GetCustomerProjectInput!) {
    getCustomerProject(data: $data) {
      ...ProjectFragment
      creationMode
      permission
      components {
        ...ProjectComponentFragment
      }

      bids {
        id
        userId
        companyId
        projectId
        components {
          ...ProjectBidComponentFragment
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