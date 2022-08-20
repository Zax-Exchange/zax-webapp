import { gql, useMutation } from "@apollo/client";
import { DeleteProjectBidPermissionsData, DeleteProjectBidPermissionsInput, DeleteProjectData, DeleteProjectInput, DeleteProjectPermissionsData, DeleteProjectPermissionsInput } from "../types/project/deleteProjectTypes";

const DELETE_PROJECT_PERMISSION = gql`
  mutation deleteProjectPermissions($data: DeleteProjectPermissionsInput) {
    deleteProjectPermissions(data: $data)
  }
`;

export const useDeleteProjectPermission = () => {
    const [deleteProjectPermission, { data: deleteProjectPermissionData, loading: deleteProjectPermissionLoading, error: deleteProjectPermissionError }] = useMutation<DeleteProjectPermissionsData, DeleteProjectPermissionsInput>(DELETE_PROJECT_PERMISSION);

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
    const [deleteProjectBidPermission, { data: deleteProjectBidPermissionData, loading: deleteProjectBidPermissionLoading, error: deleteProjectBidPermissionError }] = useMutation<DeleteProjectBidPermissionsData, DeleteProjectBidPermissionsInput>(DELETE_PROJECT_BID_PERMISSION);

    return {
        deleteProjectBidPermission,
        deleteProjectBidPermissionData,
        deleteProjectBidPermissionError,
        deleteProjectBidPermissionLoading
    }
}


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
  ] = useMutation<DeleteProjectData, DeleteProjectInput>(DELETE_PROJECT);

  return {
    deleteProject,
    deleteProjectData,
    deleteProjectError,
    deleteProjectLoading,
  };
};