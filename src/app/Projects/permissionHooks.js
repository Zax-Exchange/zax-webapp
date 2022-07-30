import { gql, useLazyQuery, useMutation, useQuery } from "@apollo/client";

const GET_PROJECT_USERS = gql`
  query getProjectUsers($projectId: String) {
    getProjectUsers(projectId: $projectId) {
      userId
      name
      email
      permission
    } 
  }
`;

export const useGetProjectUsers = (onCompleteCallback, projectId, isVendor) => {
    const {error: getProjectUsersError, loading: getProjectUsersLoading, data: getProjectUsersData, refetch: getProjectUsersRefetch} = useQuery(GET_PROJECT_USERS, {
        variables: {
            projectId: projectId
        },
        skip: isVendor,
        fetchPolicy: "no-cache",
        onCompleted: (data) => onCompleteCallback(data.getProjectUsers)
    });

    return {
        getProjectUsersError,
        getProjectUsersData,
        getProjectUsersLoading,
        getProjectUsersRefetch
    }
}

const GET_PROJECT_BID_USERS = gql`
  query getProjectBidUsers($projectBidId: String) {
    getProjectBidUsers(projectBidId: $projectBidId) {
      userId
      name
      email
      permission
    } 
  }
`;

export const useGetProjectBidUsers = (onCompleteCallback, bidInfo, isVendor) => {
    const {error: getProjectBidUsersError, loading: getProjectBidUsersLoading, data: getProjectBidUsersData, refetch: getProjectBidUsersRefetch} = useQuery(GET_PROJECT_BID_USERS, {
        variables: {
          projectBidId: bidInfo ? bidInfo.id : null
        },
        skip: !isVendor,
        fetchPolicy: "no-cache",
        onCompleted: (data) => onCompleteCallback(data.getProjectBidUsers)
    });

    return {
        getProjectBidUsersData,
        getProjectBidUsersError,
        getProjectBidUsersLoading,
        getProjectBidUsersRefetch
    }
}

const GET_ALL_COMPANY_USERS = gql`
  query getAllUsersWithinCompany($companyId: String) {
    getAllUsersWithinCompany(companyId: $companyId) {
      id
      email
      name
    }
  }
`;

export const useGetAllCompanyUsers = (companyId) => {
    const  {data: getAllCompanyUsersData } = useQuery(GET_ALL_COMPANY_USERS, {
        variables: {
          companyId
        }
    });

    return {
        getAllCompanyUsersData
    }
}

const UPDATE_PROJECT_PERMISSION = gql`
  mutation updateProjectPermissions($data: UpdateProjectPermissionsInput) {
    updateProjectPermissions(data: $data)
  }
`;

export const useUpdateProjectPermission = () => {
    const [updateProjectPermission, { data: updateProjectPermissionData, loading: updateProjectPermissionLoading, error: updateProjectPermissionError }] = useMutation(UPDATE_PROJECT_PERMISSION);

    return {
        updateProjectPermission,
        updateProjectPermissionData,
        updateProjectPermissionError,
        updateProjectPermissionLoading
    }
}

const UPDATE_PROJECT_BID_PERMISSION = gql`
  mutation updateProjectBidPermissions($data: UpdateProjectBidPermissionsInput) {
    updateProjectBidPermissions(data: $data)
  }
`;

export const useUpdateProjectBidPermission = () => {
    const [updateProjectBidPermission, { data: updateProjectBidPermissionData, loading: updateProjectBidPermissionLoading, error: updateProjectBidPermissionError }] = useMutation(UPDATE_PROJECT_BID_PERMISSION);

    return {
        updateProjectBidPermission,
        updateProjectBidPermissionData,
        updateProjectBidPermissionError,
        updateProjectBidPermissionLoading
    }
}

const DELETE_PROJECT_PERMISSION = gql`
  mutation deleteProjectPermissions($data: DeleteProjectPermissionsInput) {
    deleteProjectPermissions(data: $data)
  }
`;

export const useDeleteProjectPermission = () => {
    const [deleteProjectPermission, { data: deleteProjectPermissionData, loading: deleteProjectPermissionLoading, error: deleteProjectPermissionError }] = useMutation(DELETE_PROJECT_PERMISSION);

    return {
        deleteProjectPermission,
        deleteProjectPermissionData,
        deleteProjectPermissionError,
        deleteProjectPermissionLoading
    }
}

const DELETE_PROJECT_BID_PERMISSION = gql`
  mutation deleteProjectBidPermissions($data: DeleteProjectBidPermissionsInput) {
    deleteProjectBidPermissions(data: $data)
  }
`;

export const useDeleteProjectBidPermission = () => {
    const [deleteProjectBidPermission, { data: deleteProjectBidPermissionData, loading: deleteProjectBidPermissionLoading, error: deleteProjectBidPermissionError }] = useMutation(DELETE_PROJECT_BID_PERMISSION);

    return {
        deleteProjectBidPermission,
        deleteProjectBidPermissionData,
        deleteProjectBidPermissionError,
        deleteProjectBidPermissionLoading
    }
}
