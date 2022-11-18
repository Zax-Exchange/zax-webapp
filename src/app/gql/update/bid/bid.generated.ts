// THIS FILE IS GENERATED. DO NOT EDIT.
import * as Types from '../../../../generated/graphql';

import { gql } from '@apollo/client';
import * as Apollo from '@apollo/client';
const defaultOptions = {} as const;
export type UpdateProjectBidPermissionsMutationVariables = Types.Exact<{
  data: Types.UpdateProjectBidPermissionsInput;
}>;


export type UpdateProjectBidPermissionsMutation = { __typename?: 'Mutation', updateProjectBidPermissions: boolean };

export type UpdateProjectBidComponentsMutationVariables = Types.Exact<{
  data: Array<Types.UpdateProjectBidComponentInput> | Types.UpdateProjectBidComponentInput;
}>;


export type UpdateProjectBidComponentsMutation = { __typename?: 'Mutation', updateProjectBidComponents: boolean };

export type UpdateProjectBidMutationVariables = Types.Exact<{
  data: Types.UpdateProjectBidInput;
}>;


export type UpdateProjectBidMutation = { __typename?: 'Mutation', updateProjectBid: boolean };


export const UpdateProjectBidPermissionsDocument = gql`
    mutation updateProjectBidPermissions($data: UpdateProjectBidPermissionsInput!) {
  updateProjectBidPermissions(data: $data)
}
    `;
export type UpdateProjectBidPermissionsMutationFn = Apollo.MutationFunction<UpdateProjectBidPermissionsMutation, UpdateProjectBidPermissionsMutationVariables>;

/**
 * __useUpdateProjectBidPermissionsMutation__
 *
 * To run a mutation, you first call `useUpdateProjectBidPermissionsMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useUpdateProjectBidPermissionsMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [updateProjectBidPermissionsMutation, { data, loading, error }] = useUpdateProjectBidPermissionsMutation({
 *   variables: {
 *      data: // value for 'data'
 *   },
 * });
 */
export function useUpdateProjectBidPermissionsMutation(baseOptions?: Apollo.MutationHookOptions<UpdateProjectBidPermissionsMutation, UpdateProjectBidPermissionsMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<UpdateProjectBidPermissionsMutation, UpdateProjectBidPermissionsMutationVariables>(UpdateProjectBidPermissionsDocument, options);
      }
export type UpdateProjectBidPermissionsMutationHookResult = ReturnType<typeof useUpdateProjectBidPermissionsMutation>;
export type UpdateProjectBidPermissionsMutationResult = Apollo.MutationResult<UpdateProjectBidPermissionsMutation>;
export type UpdateProjectBidPermissionsMutationOptions = Apollo.BaseMutationOptions<UpdateProjectBidPermissionsMutation, UpdateProjectBidPermissionsMutationVariables>;
export const UpdateProjectBidComponentsDocument = gql`
    mutation updateProjectBidComponents($data: [UpdateProjectBidComponentInput!]!) {
  updateProjectBidComponents(data: $data)
}
    `;
export type UpdateProjectBidComponentsMutationFn = Apollo.MutationFunction<UpdateProjectBidComponentsMutation, UpdateProjectBidComponentsMutationVariables>;

/**
 * __useUpdateProjectBidComponentsMutation__
 *
 * To run a mutation, you first call `useUpdateProjectBidComponentsMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useUpdateProjectBidComponentsMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [updateProjectBidComponentsMutation, { data, loading, error }] = useUpdateProjectBidComponentsMutation({
 *   variables: {
 *      data: // value for 'data'
 *   },
 * });
 */
export function useUpdateProjectBidComponentsMutation(baseOptions?: Apollo.MutationHookOptions<UpdateProjectBidComponentsMutation, UpdateProjectBidComponentsMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<UpdateProjectBidComponentsMutation, UpdateProjectBidComponentsMutationVariables>(UpdateProjectBidComponentsDocument, options);
      }
export type UpdateProjectBidComponentsMutationHookResult = ReturnType<typeof useUpdateProjectBidComponentsMutation>;
export type UpdateProjectBidComponentsMutationResult = Apollo.MutationResult<UpdateProjectBidComponentsMutation>;
export type UpdateProjectBidComponentsMutationOptions = Apollo.BaseMutationOptions<UpdateProjectBidComponentsMutation, UpdateProjectBidComponentsMutationVariables>;
export const UpdateProjectBidDocument = gql`
    mutation updateProjectBid($data: UpdateProjectBidInput!) {
  updateProjectBid(data: $data)
}
    `;
export type UpdateProjectBidMutationFn = Apollo.MutationFunction<UpdateProjectBidMutation, UpdateProjectBidMutationVariables>;

/**
 * __useUpdateProjectBidMutation__
 *
 * To run a mutation, you first call `useUpdateProjectBidMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useUpdateProjectBidMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [updateProjectBidMutation, { data, loading, error }] = useUpdateProjectBidMutation({
 *   variables: {
 *      data: // value for 'data'
 *   },
 * });
 */
export function useUpdateProjectBidMutation(baseOptions?: Apollo.MutationHookOptions<UpdateProjectBidMutation, UpdateProjectBidMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<UpdateProjectBidMutation, UpdateProjectBidMutationVariables>(UpdateProjectBidDocument, options);
      }
export type UpdateProjectBidMutationHookResult = ReturnType<typeof useUpdateProjectBidMutation>;
export type UpdateProjectBidMutationResult = Apollo.MutationResult<UpdateProjectBidMutation>;
export type UpdateProjectBidMutationOptions = Apollo.BaseMutationOptions<UpdateProjectBidMutation, UpdateProjectBidMutationVariables>;