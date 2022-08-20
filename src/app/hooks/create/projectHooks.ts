import { gql, useMutation } from "@apollo/client";
import { CreateProjectBidData, CreateProjectBidInput, CreateProjectData, CreateProjectInput } from "../types/project/createProjectTypes";

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
  ] = useMutation<CreateProjectBidData, CreateProjectBidInput>(CREATE_PROJECT_BID);

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
  ] = useMutation<CreateProjectData, CreateProjectInput>(CREATE_PROJECT);
  return {
    createProjectMutation,
    createProjectLoading,
    createProjectError,
    createProjectData,
  };
};