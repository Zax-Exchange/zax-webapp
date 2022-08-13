import { gql, useMutation, useQuery } from "@apollo/client";

const GET_VENDOR_PROJECT = gql`
  query getVendorProject($data: GetVendorProjectInput) {
    getVendorProject(data: $data) {
      id
      userId
      customerName
      companyId
      name
      deliveryDate
      deliveryCountry
      budget
      deliveryCity
      design
      status
      components {
        id
        projectId
        name
        materials
        dimension
        postProcess
      }
      createdAt

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
    }
  }
`;

export const useGetVendorProject = (userId, projectId) => {
  const {
    data: getVendorProjectData,
    loading: getVendorProjectLoading,
    error: getVendorProjectError,
    refetch: getVendorProjectRefetch,
  } = useQuery(GET_VENDOR_PROJECT, {
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
const GET_PROJECT_DETAIL = gql`
  query getProjectDetail($projectId: String) {
    getProjectDetail(projectId: $projectId) {
      id
      userId
      companyId
      name
      deliveryDate
      deliveryCountry
      budget
      deliveryCity
      design
      status
      components {
        id
        projectId
        name
        materials
        dimension
        postProcess
      }
      createdAt
    }
  }
`;

export const useGetProjectDetail = (projectId) => {
  const {
    data: getProjectDetailData,
    loading: getProjectDetailLoading,
    error: getProjectDetailError,
    refetch: getProjectDetailRefetch,
  } = useQuery(GET_PROJECT_DETAIL, {
    variables: {
      projectId,
    },
  });

  return {
    getProjectDetailData,
    getProjectDetailError,
    getProjectDetailLoading,
    getProjectDetailRefetch,
  };
};

const CREATE_PROJECT_BID = gql`
  mutation CreateProjectBid($data: CreateProjectBidInput) {
    createProjectBid(data: $data)
  }
`;

export const useCreateProjectBid = () => {
  const [
    createProjectBid,
    {
      loading: createProjectBidLoading,
      error: createProjectBidError,
      data: createProjectBidData,
    },
  ] = useMutation(CREATE_PROJECT_BID);

  return {
    createProjectBid,
    createProjectBidLoading,
    createProjectBidError,
    createProjectBidData,
  };
};

const CREATE_PROJECT = gql`
  mutation createProject($data: CreateProjectInput) {
    createProject(data: $data)
  }
`;

export const useCreateProject = () => {
  const [
    createProjectMutation,
    {
      error: createProjectError,
      loading: createProjectLoading,
      data: createProjectData,
    },
  ] = useMutation(CREATE_PROJECT);
  return {
    createProjectMutation,
    createProjectLoading,
    createProjectError,
    createProjectData,
  };
};

const DELETE_PROJECT = gql`
  mutation deleteProject($projectId: String) {
    deleteProject(projectId: $projectId)
  }
`;

export const useDeleteProject = () => {
  const [
    deleteProject,
    {
      error: deleteProjectError,
      loading: deleteProjectLoading,
      data: deleteProjectData,
    },
  ] = useMutation(DELETE_PROJECT);

  return {
    deleteProject,
    deleteProjectData,
    deleteProjectError,
    deleteProjectLoading,
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
      customerName
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
  const {
    error: getVendorProjectsError,
    loading: getVendorProjectsLoading,
    data: getVendorProjectsData,
    refetch: getVendorProjectsRefetch,
  } = useQuery(GET_VENDOR_PROJECTS, {
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
  const {
    error: getCustomerProjectsError,
    loading: getCustomerProjectsLoading,
    data: getCustomerProjectsData,
    refetch: getCustomerProjectsRefetch,
  } = useQuery(GET_CUSTOMER_PROJECTS, {
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

export const useUserData = (userId, paranoid = true) => {
  return useQuery(GET_USER, {
    variables: {
      userId,
    },
  });
};
