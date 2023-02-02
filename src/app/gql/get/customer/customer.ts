import { gql } from "@apollo/client";
import { FILE_FRAGMENT } from "../../utils/common/file";
import { PROJECT_BID_COMPONENT_FRAGMENT, PROJECT_BID_FRAGMENT } from "../bid/bid";
import {PROJECT_COMPONENT_FRAGMENT} from "../project/project"
import {PROJECT_FRAGMENT} from "../project/project"

const GET_CUSTOMER_PROJECT = gql`
  ${PROJECT_FRAGMENT}
  ${PROJECT_COMPONENT_FRAGMENT}
  ${PROJECT_BID_FRAGMENT}
  query getCustomerProject($data: GetCustomerProjectInput!) {
    getCustomerProject(data: $data) {
      ...ProjectFragment
      country
      creationMode
      permission
      visibility
      components {
        ...ProjectComponentFragment
      }

      bids {
        ...ProjectBidFragment
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
      visibility
      totalWeight
      category
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

const GET_CUSTOMER_POS = gql`
${FILE_FRAGMENT}
  query getCustomerPos($data: GetCustomerPosInput!) {
    getCustomerPos(data: $data) {
      projectInfo {
        projectId
        projectName
      }
      poDetails {
        projectBidId
        vendorInfo {
          companyId
          companyName
        }
        poFile {
          ...FileFragment
          status
        }
        invoiceFile {
          ...FileFragment
          status
        }
      }
    }
  }
`

const GET_PURCHASE_ORDER = gql`
  ${FILE_FRAGMENT}
  query getPurchaseOrder($data: GetPurchaseOrderInput!) {
    getPurchaseOrder(data: $data) {
      ...FileFragment
      status
    }
  }
`