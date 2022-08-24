import { gql } from "@apollo/client";

const GET_VENDOR_DETAIL = gql`
  query getVendorDetail($companyId: String!) {
    getVendorDetail(companyId: $companyId) {
      id
      name
      phone
      logo
      country
      isActive
      companyUrl
      fax
      isVerified
      locations
      materials
      moq
      leadTime
    }
  }
`;

const GET_VENDOR_PROJECT = gql`
  query getVendorProject($data: GetProjectInput!) {
    getVendorProject(data: $data) {
      id
      userId
      customerName
      companyId
      name
      deliveryDate
      deliveryAddress
      budget
      status
      design {
        fileName
        url
      }
      components {
        id
        projectId
        name
        materials
        dimension
        postProcess
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
        }
        createdAt
        updatedAt
      }
      createdAt
      updatedAt
      
    }
  }
`;

const GET_VENDOR_PROJECTS = gql`
  query getVendorProjects($userId: String!) {
    getVendorProjects(userId: $userId) {
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
        }
        createdAt
        updatedAt
      }
      components {
        id
        name
        materials
        dimension
        postProcess
      }
      id
      userId
      companyId
      customerName
      name
      deliveryDate
      deliveryAddress
      budget
      design {
        fileName
        url
      }
      status
      permission
      createdAt
      updatedAt
    }
  }
`;

const SEARCH_VENDORS = gql`
  query searchVendorCompanies($searchInput: SearchCompanyInput!) {
    searchVendorCompanies(searchInput: $searchInput) {
      id
      name
      logo
      country
      isVerified
      locations
      materials
      moq
      leadTime
    }
  }
`;