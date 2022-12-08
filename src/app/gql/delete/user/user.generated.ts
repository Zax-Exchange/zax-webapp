// THIS FILE IS GENERATED. DO NOT EDIT.
import * as Types from '../../../../generated/graphql';

import { gql } from '@apollo/client';
import * as Apollo from '@apollo/client';
const defaultOptions = {} as const;
export type DeactivateCustomerUserMutationVariables = Types.Exact<{
  data: Types.DeactivateUserInput;
}>;


export type DeactivateCustomerUserMutation = { __typename?: 'Mutation', deactivateCustomerUser: boolean };


export const DeactivateCustomerUserDocument = gql`
    mutation deactivateCustomerUser($data: DeactivateUserInput!) {
  deactivateCustomerUser(data: $data)
}
    `;
export type DeactivateCustomerUserMutationFn = Apollo.MutationFunction<DeactivateCustomerUserMutation, DeactivateCustomerUserMutationVariables>;

/**
 * __useDeactivateCustomerUserMutation__
 *
 * To run a mutation, you first call `useDeactivateCustomerUserMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useDeactivateCustomerUserMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [deactivateCustomerUserMutation, { data, loading, error }] = useDeactivateCustomerUserMutation({
 *   variables: {
 *      data: // value for 'data'
 *   },
 * });
 */
export function useDeactivateCustomerUserMutation(baseOptions?: Apollo.MutationHookOptions<DeactivateCustomerUserMutation, DeactivateCustomerUserMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<DeactivateCustomerUserMutation, DeactivateCustomerUserMutationVariables>(DeactivateCustomerUserDocument, options);
      }
export type DeactivateCustomerUserMutationHookResult = ReturnType<typeof useDeactivateCustomerUserMutation>;
export type DeactivateCustomerUserMutationResult = Apollo.MutationResult<DeactivateCustomerUserMutation>;
export type DeactivateCustomerUserMutationOptions = Apollo.BaseMutationOptions<DeactivateCustomerUserMutation, DeactivateCustomerUserMutationVariables>;