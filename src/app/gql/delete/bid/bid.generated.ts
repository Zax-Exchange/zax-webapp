// THIS FILE IS GENERATED. DO NOT EDIT.
import * as Types from '../../../../generated/graphql';

import { gql } from '@apollo/client';
import * as Apollo from '@apollo/client';
const defaultOptions = {} as const;
export type DeleteProjectBidPermissionsMutationVariables = Types.Exact<{
  data: Types.DeleteProjectBidPermissionsInput;
}>;


export type DeleteProjectBidPermissionsMutation = { __typename?: 'Mutation', deleteProjectBidPermissions: boolean };

export type DeleteBidRemarkMutationVariables = Types.Exact<{
  data: Types.DeleteBidRemarkInput;
}>;


export type DeleteBidRemarkMutation = { __typename?: 'Mutation', deleteBidRemark: boolean };


export const DeleteProjectBidPermissionsDocument = gql`
    mutation deleteProjectBidPermissions($data: DeleteProjectBidPermissionsInput!) {
  deleteProjectBidPermissions(data: $data)
}
    `;
export type DeleteProjectBidPermissionsMutationFn = Apollo.MutationFunction<DeleteProjectBidPermissionsMutation, DeleteProjectBidPermissionsMutationVariables>;

/**
 * __useDeleteProjectBidPermissionsMutation__
 *
 * To run a mutation, you first call `useDeleteProjectBidPermissionsMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useDeleteProjectBidPermissionsMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [deleteProjectBidPermissionsMutation, { data, loading, error }] = useDeleteProjectBidPermissionsMutation({
 *   variables: {
 *      data: // value for 'data'
 *   },
 * });
 */
export function useDeleteProjectBidPermissionsMutation(baseOptions?: Apollo.MutationHookOptions<DeleteProjectBidPermissionsMutation, DeleteProjectBidPermissionsMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<DeleteProjectBidPermissionsMutation, DeleteProjectBidPermissionsMutationVariables>(DeleteProjectBidPermissionsDocument, options);
      }
export type DeleteProjectBidPermissionsMutationHookResult = ReturnType<typeof useDeleteProjectBidPermissionsMutation>;
export type DeleteProjectBidPermissionsMutationResult = Apollo.MutationResult<DeleteProjectBidPermissionsMutation>;
export type DeleteProjectBidPermissionsMutationOptions = Apollo.BaseMutationOptions<DeleteProjectBidPermissionsMutation, DeleteProjectBidPermissionsMutationVariables>;
export const DeleteBidRemarkDocument = gql`
    mutation deleteBidRemark($data: DeleteBidRemarkInput!) {
  deleteBidRemark(data: $data)
}
    `;
export type DeleteBidRemarkMutationFn = Apollo.MutationFunction<DeleteBidRemarkMutation, DeleteBidRemarkMutationVariables>;

/**
 * __useDeleteBidRemarkMutation__
 *
 * To run a mutation, you first call `useDeleteBidRemarkMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useDeleteBidRemarkMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [deleteBidRemarkMutation, { data, loading, error }] = useDeleteBidRemarkMutation({
 *   variables: {
 *      data: // value for 'data'
 *   },
 * });
 */
export function useDeleteBidRemarkMutation(baseOptions?: Apollo.MutationHookOptions<DeleteBidRemarkMutation, DeleteBidRemarkMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<DeleteBidRemarkMutation, DeleteBidRemarkMutationVariables>(DeleteBidRemarkDocument, options);
      }
export type DeleteBidRemarkMutationHookResult = ReturnType<typeof useDeleteBidRemarkMutation>;
export type DeleteBidRemarkMutationResult = Apollo.MutationResult<DeleteBidRemarkMutation>;
export type DeleteBidRemarkMutationOptions = Apollo.BaseMutationOptions<DeleteBidRemarkMutation, DeleteBidRemarkMutationVariables>;