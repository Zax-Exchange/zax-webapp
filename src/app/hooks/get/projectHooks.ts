import { gql, useQuery } from "@apollo/client";
import { GetProjectBidUsersData, GetProjectDetailData, GetProjectUsersData, ProjectBidUser } from "../types/project/getProjectTypes";
import { PermissionedProjectBid, ProjectUserData } from "../types/project/projectTypes";

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

export const useGetProjectUsers = (onCompleteCallback: React.Dispatch<React.SetStateAction<ProjectUserData[]>>, projectId: string, isVendor: boolean) => {
    const {error: getProjectUsersError, loading: getProjectUsersLoading, data: getProjectUsersData, refetch: getProjectUsersRefetch} = useQuery<GetProjectUsersData, { projectId: string }>(GET_PROJECT_USERS, {
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

export const useGetProjectBidUsers = (onCompleteCallback: React.Dispatch<React.SetStateAction<ProjectBidUser[]>>, bidInfo: PermissionedProjectBid, isVendor: boolean) => {
    const {error: getProjectBidUsersError, loading: getProjectBidUsersLoading, data: getProjectBidUsersData, refetch: getProjectBidUsersRefetch} = useQuery<GetProjectBidUsersData>(GET_PROJECT_BID_USERS, {
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

const GET_PROJECT_DETAIL = gql`
  query getProjectDetail($projectId: String) {
    getProjectDetail(projectId: $projectId) {
      id
      userId
      companyId
      name
      deliveryDate
      deliveryAddress
      budget
      design {
        fileName
        url
      }
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
      updatedAt
    }
  }
`;

export const useGetProjectDetail = (projectId: string) => {
  const {
    data: getProjectDetailData,
    loading: getProjectDetailLoading,
    error: getProjectDetailError,
    refetch: getProjectDetailRefetch,
  } = useQuery<GetProjectDetailData, { projectId: string}>(GET_PROJECT_DETAIL, {
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