import { gql, useMutation } from "@apollo/client";

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