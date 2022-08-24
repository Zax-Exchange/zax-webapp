import * as Types from '../../../../generated/graphql';

import { gql } from '@apollo/client';
import * as Apollo from '@apollo/client';
const defaultOptions = {} as const;
export type UpdateProjectBidPermissionsMutationVariables = Types.Exact<{
  data: Types.UpdateProjectBidPermissionsInput;
}>;


export type UpdateProjectBidPermissionsMutation = { __typename?: 'Mutation', updateProjectBidPermissions: boolean };


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