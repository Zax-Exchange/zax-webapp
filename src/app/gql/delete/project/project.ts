import { gql } from "@apollo/client";

const DELETE_PROJECT_PERMISSION = gql`
  mutation deleteProjectPermissions($data: DeleteProjectPermissionsInput!) {
    deleteProjectPermissions(data: $data)
  }
`;

const DELETE_PROJECT = gql`
  mutation deleteProject($data: DeleteProjectInput!) {
    deleteProject(data: $data)
  }
`;

const DELETE_PROJECT_DESIGN = gql`
  mutation deleteProjectDesign($data: DeleteProjectDesignInput!) {
    deleteProjectDesign(data: $data)
  }
`

const DELETE_PROJECT_COMPONENTS = gql`
  mutation deleteProjectComponents($data: [DeleteProjectComponentInput!]!) {
    deleteProjectComponents(data: $data)
  }
`