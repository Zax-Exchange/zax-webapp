// THIS FILE IS GENERATED. DO NOT EDIT.
import * as Types from '../../../../generated/graphql';

import { gql } from '@apollo/client';
import * as Apollo from '@apollo/client';
const defaultOptions = {} as const;
export type UpdateVendorMutationVariables = Types.Exact<{
  data: Types.UpdateVendorInput;
}>;


export type UpdateVendorMutation = { __typename?: 'Mutation', updateVendor: boolean };


export const UpdateVendorDocument = gql`
    mutation updateVendor($data: UpdateVendorInput!) {
  updateVendor(data: $data)
}
    `;
export type UpdateVendorMutationFn = Apollo.MutationFunction<UpdateVendorMutation, UpdateVendorMutationVariables>;

/**
 * __useUpdateVendorMutation__
 *
 * To run a mutation, you first call `useUpdateVendorMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useUpdateVendorMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [updateVendorMutation, { data, loading, error }] = useUpdateVendorMutation({
 *   variables: {
 *      data: // value for 'data'
 *   },
 * });
 */
export function useUpdateVendorMutation(baseOptions?: Apollo.MutationHookOptions<UpdateVendorMutation, UpdateVendorMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<UpdateVendorMutation, UpdateVendorMutationVariables>(UpdateVendorDocument, options);
      }
export type UpdateVendorMutationHookResult = ReturnType<typeof useUpdateVendorMutation>;
export type UpdateVendorMutationResult = Apollo.MutationResult<UpdateVendorMutation>;
export type UpdateVendorMutationOptions = Apollo.BaseMutationOptions<UpdateVendorMutation, UpdateVendorMutationVariables>;