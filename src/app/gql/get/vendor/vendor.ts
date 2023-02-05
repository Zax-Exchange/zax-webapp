import { gql } from "@apollo/client";
import { FILE_FRAGMENT } from "../../utils/common/file";
import { PERMISSIONED_PROJECT_BID_FRAGMENT, PROJECT_BID_COMPONENT_FRAGMENT, PROJECT_BID_FRAGMENT } from "../bid/bid";
import {PROJECT_COMPONENT_FRAGMENT} from "../project/project"
import {PROJECT_FRAGMENT} from "../project/project"

const GET_VENDOR_DETAIL = gql`
  query getVendorDetail($data: GetVendorDetailInput!) {
    getVendorDetail(data: $data) {
      id
      name
      contactEmail
      phone
      logo
      country
      isActive
      companyUrl
      fax
      isVerified
      locations
      productsAndMoq {
        product
        moq
      }
      leadTime
    }
  }
`;

const GET_VENDOR_PROJECT = gql`
${PROJECT_FRAGMENT}
${PROJECT_COMPONENT_FRAGMENT}
${PERMISSIONED_PROJECT_BID_FRAGMENT}
  query getVendorProject($data: GetVendorProjectInput!) {
    getVendorProject(data: $data) {
      ...ProjectFragment
      components {
       ...ProjectComponentFragment
      }
      bidInfo {
        ...PermissionedProjectBidFragment
      }
    }
  }
`;

const GET_VENDOR_PROJECTS = gql`
  query getVendorProjects($data: GetVendorProjectsInput!) {
    getVendorProjects(data: $data) {
      id
      userId
      bidId
      bidStatus
      companyName
      name
      deliveryDate
      deliveryAddress
      targetPrice
      orderQuantities
      status
      totalWeight
      category
      permission
      createdAt
      updatedAt
    }
  }
`;

const GET_VENDOR_GUEST_PROJECTS = gql`
query getVendorGuestProjects($data: GetVendorGuestProjectsInput!) {
    getVendorGuestProjects(data: $data) {
      id
      name
      deliveryDate
      deliveryAddress
      targetPrice
      orderQuantities
      status
      totalWeight
      category
      permission
      guestEmail
      createdAt
      updatedAt
    }
  }
`

const GET_VENDOR_GUEST_PROJECT = gql`
  ${PROJECT_FRAGMENT}
  ${PROJECT_COMPONENT_FRAGMENT}
  query getVendorGuestProject($data: GetVendorGuestProjectInput!) {
    getVendorGuestProject(data: $data) {
      ...ProjectFragment
      permission
      guestEmail
      components {
       ...ProjectComponentFragment
      }
    }
  }
`
const SEARCH_VENDOR_COMPANIES = gql`
  query searchVendorCompanies($data: SearchVendorCompanyInput!) {
    searchVendorCompanies(data: $data) {
      vendor {
        id
      name
      contactEmail
      logo
      country
      isVerified
      locations
      products
      leadTime
      }
      highlight {
        products
        name
      }
    }
  }
`;

const GET_VENDOR_POS = gql`
${FILE_FRAGMENT}
  query getVendorPos($data: GetVendorPosInput!) {
    getVendorPos(data: $data) {
      projectInfo {
        projectId
        projectName
      }
      poDetails {
        projectBidId
        customerInfo {
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

const GET_INVOICE = gql`
${FILE_FRAGMENT}
  query getInvoice($data: GetInvoiceInput!) {
    getInvoice(data: $data) {
      ...FileFragment
      status
    }
  }
`

const GET_SEARCH_RPOJECT_DETAIL = gql`
  ${PROJECT_FRAGMENT}
  ${PROJECT_COMPONENT_FRAGMENT}
  query getSearchProjectDetail($data: GetSearchProjectDetailInput!) {
    getSearchProjectDetail(data: $data) {
      ...ProjectFragment
      country
      components {
        ...ProjectComponentFragment
      }
      
    }
  }
`