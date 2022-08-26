// THIS FILE IS GENERATED. DO NOT EDIT.
import * as Types from '../../../../generated/graphql';

import { gql } from '@apollo/client';
import * as Apollo from '@apollo/client';
const defaultOptions = {} as const;
export type UpdateVendorInfoMutationVariables = Types.Exact<{
  data: Types.UpdateVendorInfoInput;
}>;


export type UpdateVendorInfoMutation = { __typename?: 'Mutation', updateVendorInfo: boolean };


export const UpdateVendorInfoDocument = gql`
    mutation updateVendorInfo($data: UpdateVendorInfoInput!) {
  updateVendorInfo(data: $data)
}
    `;
export type UpdateVendorInfoMutationFn = Apollo.MutationFunction<UpdateVendorInfoMutation, UpdateVendorInfoMutationVariables>;

/**
 * __useUpdateVendorInfoMutation__
 *
 * To run a mutation, you first call `useUpdateVendorInfoMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useUpdateVendorInfoMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [updateVendorInfoMutation, { data, loading, error }] = useUpdateVendorInfoMutation({
 *   variables: {
 *      data: // value for 'data'
 *   },
 * });
 */
export function useUpdateVendorInfoMutation(baseOptions?: Apollo.MutationHookOptions<UpdateVendorInfoMutation, UpdateVendorInfoMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<UpdateVendorInfoMutation, UpdateVendorInfoMutationVariables>(UpdateVendorInfoDocument, options);
      }
export type UpdateVendorInfoMutationHookResult = ReturnType<typeof useUpdateVendorInfoMutation>;
export type UpdateVendorInfoMutationResult = Apollo.MutationResult<UpdateVendorInfoMutation>;
export type UpdateVendorInfoMutationOptions = Apollo.BaseMutationOptions<UpdateVendorInfoMutation, UpdateVendorInfoMutationVariables>;