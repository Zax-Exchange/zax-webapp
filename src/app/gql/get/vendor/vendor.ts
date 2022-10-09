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
      products
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
      companyName
      companyId
      name
      category
      totalWeight
      deliveryDate
      deliveryAddress
      targetPrice
      orderQuantities
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
          dimension
          boxStyle
          style
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
