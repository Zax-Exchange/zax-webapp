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
