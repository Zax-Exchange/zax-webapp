// THIS FILE IS GENERATED. DO NOT EDIT.
import * as Types from '../../../../generated/graphql';

import { gql } from '@apollo/client';
import * as Apollo from '@apollo/client';
const defaultOptions = {} as const;
export type UpdateCustomerUpgradeToPaidPlanMutationVariables = Types.Exact<{
  data: Types.UpdateCustomerUpgradeToPaidPlanInput;
}>;


export type UpdateCustomerUpgradeToPaidPlanMutation = { __typename?: 'Mutation', updateCustomerUpgradeToPaidPlan: boolean };


export const UpdateCustomerUpgradeToPaidPlanDocument = gql`
    mutation updateCustomerUpgradeToPaidPlan($data: UpdateCustomerUpgradeToPaidPlanInput!) {
  updateCustomerUpgradeToPaidPlan(data: $data)
}
    `;
export type UpdateCustomerUpgradeToPaidPlanMutationFn = Apollo.MutationFunction<UpdateCustomerUpgradeToPaidPlanMutation, UpdateCustomerUpgradeToPaidPlanMutationVariables>;

/**
 * __useUpdateCustomerUpgradeToPaidPlanMutation__
 *
 * To run a mutation, you first call `useUpdateCustomerUpgradeToPaidPlanMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useUpdateCustomerUpgradeToPaidPlanMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [updateCustomerUpgradeToPaidPlanMutation, { data, loading, error }] = useUpdateCustomerUpgradeToPaidPlanMutation({
 *   variables: {
 *      data: // value for 'data'
 *   },
 * });
 */
export function useUpdateCustomerUpgradeToPaidPlanMutation(baseOptions?: Apollo.MutationHookOptions<UpdateCustomerUpgradeToPaidPlanMutation, UpdateCustomerUpgradeToPaidPlanMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<UpdateCustomerUpgradeToPaidPlanMutation, UpdateCustomerUpgradeToPaidPlanMutationVariables>(UpdateCustomerUpgradeToPaidPlanDocument, options);
      }
export type UpdateCustomerUpgradeToPaidPlanMutationHookResult = ReturnType<typeof useUpdateCustomerUpgradeToPaidPlanMutation>;
export type UpdateCustomerUpgradeToPaidPlanMutationResult = Apollo.MutationResult<UpdateCustomerUpgradeToPaidPlanMutation>;
export type UpdateCustomerUpgradeToPaidPlanMutationOptions = Apollo.BaseMutationOptions<UpdateCustomerUpgradeToPaidPlanMutation, UpdateCustomerUpgradeToPaidPlanMutationVariables>;