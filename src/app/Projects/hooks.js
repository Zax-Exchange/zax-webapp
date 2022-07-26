import { gql, useMutation } from "@apollo/client";

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