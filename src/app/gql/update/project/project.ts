import { gql } from "@apollo/client";

const UPDATE_PROJECT_PERMISSION = gql`
  mutation updateProjectPermissions($data: UpdateProjectPermissionsInput!) {
    updateProjectPermissions(data: $data)
  }
`;

const UPDATE_PROJECT = gql`
  mutation updateProject($data: UpdateProjectInput!) {
    updateProject(data: $data)
  }
`
