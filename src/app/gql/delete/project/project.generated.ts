// THIS FILE IS GENERATED. DO NOT EDIT.
import * as Types from '../../../../generated/graphql';

import { gql } from '@apollo/client';
import * as Apollo from '@apollo/client';
const defaultOptions = {} as const;
export type DeleteProjectPermissionsMutationVariables = Types.Exact<{
  data: Types.DeleteProjectPermissionsInput;
}>;


export type DeleteProjectPermissionsMutation = { __typename?: 'Mutation', deleteProjectPermissions: boolean };

export type DeleteProjectMutationVariables = Types.Exact<{
  data: Types.DeleteProjectInput;
}>;


export type DeleteProjectMutation = { __typename?: 'Mutation', deleteProject: boolean };


export const DeleteProjectPermissionsDocument = gql`
    mutation deleteProjectPermissions($data: DeleteProjectPermissionsInput!) {
  deleteProjectPermissions(data: $data)
}
    `;
export type DeleteProjectPermissionsMutationFn = Apollo.MutationFunction<DeleteProjectPermissionsMutation, DeleteProjectPermissionsMutationVariables>;

/**
 * __useDeleteProjectPermissionsMutation__
 *
 * To run a mutation, you first call `useDeleteProjectPermissionsMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useDeleteProjectPermissionsMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [deleteProjectPermissionsMutation, { data, loading, error }] = useDeleteProjectPermissionsMutation({
 *   variables: {
 *      data: // value for 'data'
 *   },
 * });
 */
export function useDeleteProjectPermissionsMutation(baseOptions?: Apollo.MutationHookOptions<DeleteProjectPermissionsMutation, DeleteProjectPermissionsMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<DeleteProjectPermissionsMutation, DeleteProjectPermissionsMutationVariables>(DeleteProjectPermissionsDocument, options);
      }
export type DeleteProjectPermissionsMutationHookResult = ReturnType<typeof useDeleteProjectPermissionsMutation>;
export type DeleteProjectPermissionsMutationResult = Apollo.MutationResult<DeleteProjectPermissionsMutation>;
export type DeleteProjectPermissionsMutationOptions = Apollo.BaseMutationOptions<DeleteProjectPermissionsMutation, DeleteProjectPermissionsMutationVariables>;
export const DeleteProjectDocument = gql`
    mutation deleteProject($data: DeleteProjectInput!) {
  deleteProject(data: $data)
}
    `;
export type DeleteProjectMutationFn = Apollo.MutationFunction<DeleteProjectMutation, DeleteProjectMutationVariables>;

/**
 * __useDeleteProjectMutation__
 *
 * To run a mutation, you first call `useDeleteProjectMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useDeleteProjectMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [deleteProjectMutation, { data, loading, error }] = useDeleteProjectMutation({
 *   variables: {
 *      data: // value for 'data'
 *   },
 * });
 */
export function useDeleteProjectMutation(baseOptions?: Apollo.MutationHookOptions<DeleteProjectMutation, DeleteProjectMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<DeleteProjectMutation, DeleteProjectMutationVariables>(DeleteProjectDocument, options);
      }
export type DeleteProjectMutationHookResult = ReturnType<typeof useDeleteProjectMutation>;
export type DeleteProjectMutationResult = Apollo.MutationResult<DeleteProjectMutation>;
export type DeleteProjectMutationOptions = Apollo.BaseMutationOptions<DeleteProjectMutation, DeleteProjectMutationVariables>;