import { CustomerProject, ProjectUserData } from "./projectTypes";

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