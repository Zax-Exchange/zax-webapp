import { ProjectPermission } from "../common/enums";
import { CustomerProject, Project, ProjectUserData, VendorProject } from "./projectTypes";

// for useGetProjectUsers hook
export interface GetProjectUsersData {
  getProjectUsers: ProjectUserData[];
}


// for useGetCustomerProject hook
export interface GetCustomerProjectData {
  getCustomerProject: CustomerProject
}

// for useGetCustomerProject hook
export interface GetCustomerProjectInput {
  data: {
    userId: string;
    projectId: string;
  }
}

// for useGetCustomerProjects hook
export interface GetCustomerProjectsData {
  getCustomerProjects: CustomerProject[]
}

// for useGetCustomerProjects hook
export interface GetCustomerProjectsInput {
  userId: string
}

export interface ProjectBidUser {
  userId: string;
  name: string;
  email: string;
  permission: ProjectPermission
}

// for useGetProjectBidUsers hook
export interface GetProjectBidUsersData {
  getProjectBidUsers: ProjectBidUser[]
}

// for useGetProjectDetail hook

export interface GetProjectDetailData {
  getProjectDetail: Project
}

// for useGetVendorProject hook
export interface GetVendorProjectData {
  getVendorProject: VendorProject
}
// for useGetVendorProjects hook
export interface GetVendorProjectsData {
  getVendorProjects: VendorProject[]
}