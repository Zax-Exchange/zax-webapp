// THIS FILE IS GENERATED. DO NOT EDIT.
import * as Types from '../../../../generated/graphql';

import { gql } from '@apollo/client';
import * as Apollo from '@apollo/client';
const defaultOptions = {} as const;
export type UpdateBillingEmailMutationVariables = Types.Exact<{
  data: Types.UpdateBillingEmailInput;
}>;


export type UpdateBillingEmailMutation = { __typename?: 'Mutation', updateBillingEmail?: boolean | null };


export const UpdateBillingEmailDocument = gql`
    mutation updateBillingEmail($data: UpdateBillingEmailInput!) {
  updateBillingEmail(data: $data)
}
    `;
export type UpdateBillingEmailMutationFn = Apollo.MutationFunction<UpdateBillingEmailMutation, UpdateBillingEmailMutationVariables>;

/**
 * __useUpdateBillingEmailMutation__
 *
 * To run a mutation, you first call `useUpdateBillingEmailMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useUpdateBillingEmailMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [updateBillingEmailMutation, { data, loading, error }] = useUpdateBillingEmailMutation({
 *   variables: {
 *      data: // value for 'data'
 *   },
 * });
 */
export function useUpdateBillingEmailMutation(baseOptions?: Apollo.MutationHookOptions<UpdateBillingEmailMutation, UpdateBillingEmailMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<UpdateBillingEmailMutation, UpdateBillingEmailMutationVariables>(UpdateBillingEmailDocument, options);
      }
export type UpdateBillingEmailMutationHookResult = ReturnType<typeof useUpdateBillingEmailMutation>;
export type UpdateBillingEmailMutationResult = Apollo.MutationResult<UpdateBillingEmailMutation>;
export type UpdateBillingEmailMutationOptions = Apollo.BaseMutationOptions<UpdateBillingEmailMutation, UpdateBillingEmailMutationVariables>;