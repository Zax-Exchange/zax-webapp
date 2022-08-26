import { gql } from "@apollo/client";

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
      materials
      moq
      leadTime
    }
  }
`;

const GET_VENDOR_PROJECT = gql`
  query getVendorProject($data: GetVendorProjectInput!) {
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
  query getVendorProjects($data: GetVendorProjectsInput!) {
    getVendorProjects(data: $data) {
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

const SEARCH_VENDOR_COMPANIES = gql`
  query searchVendorCompanies($data: SearchVendorCompanyInput!) {
    searchVendorCompanies(data: $data) {
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