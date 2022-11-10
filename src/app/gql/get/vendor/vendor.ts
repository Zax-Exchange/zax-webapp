import { gql } from "@apollo/client";
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
      products
      moq
      leadTime
    }
  }
`;

const GET_VENDOR_PROJECT = gql`
${PROJECT_FRAGMENT}
${PROJECT_COMPONENT_FRAGMENT}
  query getVendorProject($data: GetVendorProjectInput!) {
    getVendorProject(data: $data) {
      ...ProjectFragment
      components {
       ...ProjectComponentFragment
      }
      bidInfo {
        id
        companyId
        permission
        components {
          projectComponentId
          quantityPrices {
            quantity
            price
          }
          samplingFee
          toolingFee
        }
        createdAt
        updatedAt
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

const SEARCH_VENDOR_COMPANIES = gql`
  query searchVendorCompanies($data: SearchVendorCompanyInput!) {
    searchVendorCompanies(data: $data) {
      id
      name
      contactEmail
      logo
      country
      isVerified
      locations
      products
      moq
      leadTime
    }
  }
`;
