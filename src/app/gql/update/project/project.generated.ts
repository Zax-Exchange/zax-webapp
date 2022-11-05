// THIS FILE IS GENERATED. DO NOT EDIT.
import * as Types from '../../../../generated/graphql';

import { gql } from '@apollo/client';
import * as Apollo from '@apollo/client';
const defaultOptions = {} as const;
export type UpdateProjectPermissionsMutationVariables = Types.Exact<{
  data: Types.UpdateProjectPermissionsInput;
}>;


export type UpdateProjectPermissionsMutation = { __typename?: 'Mutation', updateProjectPermissions: boolean };

export type UpdateProjectMutationVariables = Types.Exact<{
  data: Types.UpdateProjectInput;
}>;


export type UpdateProjectMutation = { __typename?: 'Mutation', updateProject: boolean };

export type UpdateProjectComponentsMutationVariables = Types.Exact<{
  data: Array<Types.UpdateProjectComponentInput> | Types.UpdateProjectComponentInput;
}>;


export type UpdateProjectComponentsMutation = { __typename?: 'Mutation', updateProjectComponents: boolean };


export const UpdateProjectPermissionsDocument = gql`
    mutation updateProjectPermissions($data: UpdateProjectPermissionsInput!) {
  updateProjectPermissions(data: $data)
}
    `;
export type UpdateProjectPermissionsMutationFn = Apollo.MutationFunction<UpdateProjectPermissionsMutation, UpdateProjectPermissionsMutationVariables>;

/**
 * __useUpdateProjectPermissionsMutation__
 *
 * To run a mutation, you first call `useUpdateProjectPermissionsMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useUpdateProjectPermissionsMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [updateProjectPermissionsMutation, { data, loading, error }] = useUpdateProjectPermissionsMutation({
 *   variables: {
 *      data: // value for 'data'
 *   },
 * });
 */
export function useUpdateProjectPermissionsMutation(baseOptions?: Apollo.MutationHookOptions<UpdateProjectPermissionsMutation, UpdateProjectPermissionsMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<UpdateProjectPermissionsMutation, UpdateProjectPermissionsMutationVariables>(UpdateProjectPermissionsDocument, options);
      }
export type UpdateProjectPermissionsMutationHookResult = ReturnType<typeof useUpdateProjectPermissionsMutation>;
export type UpdateProjectPermissionsMutationResult = Apollo.MutationResult<UpdateProjectPermissionsMutation>;
export type UpdateProjectPermissionsMutationOptions = Apollo.BaseMutationOptions<UpdateProjectPermissionsMutation, UpdateProjectPermissionsMutationVariables>;
export const UpdateProjectDocument = gql`
    mutation updateProject($data: UpdateProjectInput!) {
  updateProject(data: $data)
}
    `;
export type UpdateProjectMutationFn = Apollo.MutationFunction<UpdateProjectMutation, UpdateProjectMutationVariables>;

/**
 * __useUpdateProjectMutation__
 *
 * To run a mutation, you first call `useUpdateProjectMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useUpdateProjectMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [updateProjectMutation, { data, loading, error }] = useUpdateProjectMutation({
 *   variables: {
 *      data: // value for 'data'
 *   },
 * });
 */
export function useUpdateProjectMutation(baseOptions?: Apollo.MutationHookOptions<UpdateProjectMutation, UpdateProjectMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<UpdateProjectMutation, UpdateProjectMutationVariables>(UpdateProjectDocument, options);
      }
export type UpdateProjectMutationHookResult = ReturnType<typeof useUpdateProjectMutation>;
export type UpdateProjectMutationResult = Apollo.MutationResult<UpdateProjectMutation>;
export type UpdateProjectMutationOptions = Apollo.BaseMutationOptions<UpdateProjectMutation, UpdateProjectMutationVariables>;
export const UpdateProjectComponentsDocument = gql`
    mutation updateProjectComponents($data: [UpdateProjectComponentInput!]!) {
  updateProjectComponents(data: $data)
}
    `;
export type UpdateProjectComponentsMutationFn = Apollo.MutationFunction<UpdateProjectComponentsMutation, UpdateProjectComponentsMutationVariables>;

/**
 * __useUpdateProjectComponentsMutation__
 *
 * To run a mutation, you first call `useUpdateProjectComponentsMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useUpdateProjectComponentsMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [updateProjectComponentsMutation, { data, loading, error }] = useUpdateProjectComponentsMutation({
 *   variables: {
 *      data: // value for 'data'
 *   },
 * });
 */
export function useUpdateProjectComponentsMutation(baseOptions?: Apollo.MutationHookOptions<UpdateProjectComponentsMutation, UpdateProjectComponentsMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<UpdateProjectComponentsMutation, UpdateProjectComponentsMutationVariables>(UpdateProjectComponentsDocument, options);
      }
export type UpdateProjectComponentsMutationHookResult = ReturnType<typeof useUpdateProjectComponentsMutation>;
export type UpdateProjectComponentsMutationResult = Apollo.MutationResult<UpdateProjectComponentsMutation>;
export type UpdateProjectComponentsMutationOptions = Apollo.BaseMutationOptions<UpdateProjectComponentsMutation, UpdateProjectComponentsMutationVariables>;