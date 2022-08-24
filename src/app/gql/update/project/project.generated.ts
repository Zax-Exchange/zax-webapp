import * as Types from '../../../../generated/graphql';

import { gql } from '@apollo/client';
import * as Apollo from '@apollo/client';
const defaultOptions = {} as const;
export type UpdateProjectPermissionsMutationVariables = Types.Exact<{
  data: Types.UpdateProjectPermissionsInput;
}>;


export type UpdateProjectPermissionsMutation = { __typename?: 'Mutation', updateProjectPermissions: boolean };


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