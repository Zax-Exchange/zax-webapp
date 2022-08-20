import { gql, useLazyQuery, useQuery } from "@apollo/client";
import { GetVendorDetailData } from "../types/company/getCompanyTypes";
import { GetVendorProjectData, GetVendorProjectsData } from "../types/project/getProjectTypes";
import { VendorProject } from "../types/project/projectTypes";

const GET_VENDOR_DETAIL = gql`
  query getVendorDetail($companyId: String) {
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

export const useGetVendorDetail = () => {
  const [
    getVendorDetail,
    {
      error: getVendorDetailError,
      loading: getVendorDetailLoading,
      data: getVendorDetailData,
    },
  ] = useLazyQuery<GetVendorDetailData>(GET_VENDOR_DETAIL);

  return {
    getVendorDetail,
    getVendorDetailData,
    getVendorDetailError,
    getVendorDetailLoading,
  };
};

const GET_VENDOR_PROJECT = gql`
  query getVendorProject($data: GetProjectInput) {
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

export const useGetVendorProject = (userId: string, projectId: string) => {
  const {
    data: getVendorProjectData,
    loading: getVendorProjectLoading,
    error: getVendorProjectError,
    refetch: getVendorProjectRefetch,
  } = useQuery<GetVendorProjectData, { data: { userId: string; projectId: string }}>(GET_VENDOR_PROJECT, {
    variables: {
      data: {
        userId,
        projectId,
      },
    },
  });

  return {
    getVendorProjectData,
    getVendorProjectError,
    getVendorProjectLoading,
    getVendorProjectRefetch,
  };
};

export const GET_VENDOR_PROJECTS = gql`
  query getVendorProjects($userId: String) {
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

export const useGetVendorProjects = (userId: string, skip: boolean) => {
  const {
    error: getVendorProjectsError,
    loading: getVendorProjectsLoading,
    data: getVendorProjectsData,
    refetch: getVendorProjectsRefetch,
  } = useQuery<GetVendorProjectsData, { userId: string }>(GET_VENDOR_PROJECTS, {
    variables: {
      userId,
    },
    fetchPolicy: "cache-and-network",
    skip,
  });

  return {
    getVendorProjectsData,
    getVendorProjectsError,
    getVendorProjectsLoading,
    getVendorProjectsRefetch,
  };
};