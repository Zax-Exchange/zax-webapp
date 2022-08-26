// THIS FILE IS GENERATED. DO NOT EDIT.
import * as Types from '../../../../generated/graphql';

import { gql } from '@apollo/client';
import * as Apollo from '@apollo/client';
const defaultOptions = {} as const;
export type UpdateCustomerInfoMutationVariables = Types.Exact<{
  data: Types.UpdateCustomerInfoInput;
}>;


export type UpdateCustomerInfoMutation = { __typename?: 'Mutation', updateCustomerInfo: boolean };


export const UpdateCustomerInfoDocument = gql`
    mutation updateCustomerInfo($data: UpdateCustomerInfoInput!) {
  updateCustomerInfo(data: $data)
}
    `;
export type UpdateCustomerInfoMutationFn = Apollo.MutationFunction<UpdateCustomerInfoMutation, UpdateCustomerInfoMutationVariables>;

/**
 * __useUpdateCustomerInfoMutation__
 *
 * To run a mutation, you first call `useUpdateCustomerInfoMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useUpdateCustomerInfoMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [updateCustomerInfoMutation, { data, loading, error }] = useUpdateCustomerInfoMutation({
 *   variables: {
 *      data: // value for 'data'
 *   },
 * });
 */
export function useUpdateCustomerInfoMutation(baseOptions?: Apollo.MutationHookOptions<UpdateCustomerInfoMutation, UpdateCustomerInfoMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<UpdateCustomerInfoMutation, UpdateCustomerInfoMutationVariables>(UpdateCustomerInfoDocument, options);
      }
export type UpdateCustomerInfoMutationHookResult = ReturnType<typeof useUpdateCustomerInfoMutation>;
export type UpdateCustomerInfoMutationResult = Apollo.MutationResult<UpdateCustomerInfoMutation>;
export type UpdateCustomerInfoMutationOptions = Apollo.BaseMutationOptions<UpdateCustomerInfoMutation, UpdateCustomerInfoMutationVariables>;