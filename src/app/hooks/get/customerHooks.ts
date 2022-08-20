import { gql, useQuery } from "@apollo/client";
import { GetCustomerProjectData, GetCustomerProjectInput, GetCustomerProjectsData, GetCustomerProjectsInput } from "../types/project/getProjectTypes";

const GET_CUSTOMER_PROJECT = gql`
  query getCustomerProject($data: GetProjectInput) {
    getCustomerProject(data: $data) {
      id
      userId
      companyId
      name
      deliveryDate
      deliveryAddress
      design {
        fileName
        url
      }
      budget
      status
      permission
      createdAt
      updatedAt
      components {
        id
        projectId
        name
        materials
        dimension
        postProcess
      }

      bids {
        id
        userId
        companyId
        components {
          id
          projectBidId
          projectComponentId
          quantityPrices {
            quantity
            price
          }
        }
        createdAt
        updatedAt
      }
    }
  }
`;

export const useGetCustomerProject = ({ userId, projectId }: { userId: string, projectId: string}) => {
  const {
    error: getCustomerProjectError,
    loading: getCustomerProjectLoading,
    data: getCustomerProjectData,
    refetch: getCustomerProjectRefetch,
  } = useQuery<GetCustomerProjectData, GetCustomerProjectInput>(GET_CUSTOMER_PROJECT, {
    variables: {
      data: {
        userId,
        projectId,
      },
    },
    fetchPolicy: "cache-first",
  });

  return {
    getCustomerProjectData,
    getCustomerProjectError,
    getCustomerProjectLoading,
    getCustomerProjectRefetch,
  };
};


export const GET_CUSTOMER_PROJECTS = gql`
  query GetCustomerProjects($userId: String) {
    getCustomerProjects(userId: $userId) {
      id
      userId
      companyId
      name
      deliveryDate
      deliveryAddress
      design {
        fileName
        url
      }
      budget
      status
      permission
      createdAt
      updatedAt
      components {
        id
        projectId
        name
        materials
        dimension
        postProcess
      }

      bids {
        id
        userId
        companyId
        components {
          id
          projectBidId
          projectComponentId
          quantityPrices {
            quantity
            price
          }
        }
        createdAt
        updatedAt
      }
    }
  }
`;

export const useGetCustomerProjects = (userId: string, skip: boolean) => {
  const {
    error: getCustomerProjectsError,
    loading: getCustomerProjectsLoading,
    data: getCustomerProjectsData,
    refetch: getCustomerProjectsRefetch,
  } = useQuery<GetCustomerProjectsData, GetCustomerProjectsInput>(GET_CUSTOMER_PROJECTS, {
    variables: {
      userId,
    },
    fetchPolicy: "cache-and-network",
    skip,
  });

  return {
    getCustomerProjectsData,
    getCustomerProjectsError,
    getCustomerProjectsLoading,
    getCustomerProjectsRefetch,
  };
};