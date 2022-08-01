import { gql, useMutation, useQuery } from "@apollo/client";

const CREATE_PROJECT = gql`
  mutation createProject($data: CreateProjectInput) {
    createProject(data: $data)
  }
`;

export const useCreateProject = () => {
  const [createProjectMutation, {error: createProjectError, loading: createProjectLoading, data: createProjectData}] = useMutation(CREATE_PROJECT);
  return {
    createProjectMutation,
    createProjectLoading,
    createProjectError,
    createProjectData
  }
}


const DELETE_PROJECT = gql`
  mutation deleteProject($projectId: String) {
    deleteProject(projectId: $projectId)
  }
`;

export const useDeleteProject = () => {
  const [deleteProject, {error: deleteProjectError, loading: deleteProjectLoading, data: deleteProjectData}] = useMutation(DELETE_PROJECT);

  return {
    deleteProject,
    deleteProjectData,
    deleteProjectError,
    deleteProjectLoading
  }
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
          createdAt
        }
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
      name
      deliveryDate
      deliveryCountry
      deliveryCity
      budget
      design
      status
      permission
      createdAt
    }
  }
`;

export const useGetVendorProjects = (userId, skip) => {
  const {error: getVendorProjectsError, loading: getVendorProjectsLoading, data: getVendorProjectsData, refetch: getVendorProjectsRefetch}  = useQuery(GET_VENDOR_PROJECTS, {
    variables: {
      userId,
    },
    fetchPolicy: "cache-and-network",
    skip
  })

  return {
    getVendorProjectsData,
    getVendorProjectsError,
    getVendorProjectsLoading,
    getVendorProjectsRefetch
  }
}

export const GET_CUSTOMER_PROJECTS = gql`
  query GetCustomerProjects($userId: String) {
    getCustomerProjects(userId: $userId) {
      id
      userId
      companyId
      name
      deliveryDate
      deliveryCountry
      deliveryCity
      design
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

export const useGetCustomerProjects = (userId, skip) => {
  const {error: getCustomerProjectsError, loading: getCustomerProjectsLoading, data: getCustomerProjectsData, refetch: getCustomerProjectsRefetch} = useQuery(GET_CUSTOMER_PROJECTS, {
    variables: {
      userId,
    },
    fetchPolicy: "cache-and-network",
    skip
  })

  return {
    getCustomerProjectsData,
    getCustomerProjectsError,
    getCustomerProjectsLoading,
    getCustomerProjectsRefetch
  }
}

const GET_USER = gql`
  query getUserWithUserId($userId: String, $paranoid: Boolean) {
    getUserWithUserId(userId: $userId) {
      id
      name
      email
      companyId
      isActive
    }
  }
`;

export const useUserData = (userId, paranoid=true) => {
  return useQuery(GET_USER, {
    variables: {
      userId
    }
  });
};