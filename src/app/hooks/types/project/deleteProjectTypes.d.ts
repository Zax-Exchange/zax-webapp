
// for useDeleteProjectPermissions hook
export interface DeleteProjectPermissionsInput {
  data: {
    userIds: string[];
    projectId: string;
  }
}

// for useDeleteProjectPermissions hook
export interface DeleteProjectPermissionsData {
  deleteProjectPermissions: boolean
}

// for useDeleteProjectBidPermissions hook
export interface DeleteProjectBidPermissionsInput {
  data: {
    userIds: string[];
    projectId: string;
  }
}

// for useDeleteProjectBidPermissions hook
export interface DeleteProjectBidPermissionsData {
  deleteProjectBidPermissions: boolean
}

// for useDeleteProject hook
export interface DeleteProjectInput {
  projectId: string;
}

// for useDeleteProject hook
export interface DeleteProjectData {
  deleteProject: boolean;
}