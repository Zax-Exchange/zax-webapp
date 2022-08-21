import { gql } from "@apollo/client";

const DELETE_PROJECT_PERMISSION = gql`
  mutation deleteProjectPermissions($data: DeleteProjectPermissionsInput) {
    deleteProjectPermissions(data: $data)
  }
`;

const DELETE_PROJECT = gql`
  mutation deleteProject($projectId: String) {
    deleteProject(projectId: $projectId)
  }
`;