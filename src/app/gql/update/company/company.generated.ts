import * as Types from '../../../../generated/graphql';

import { gql } from '@apollo/client';
import * as Apollo from '@apollo/client';
const defaultOptions = {} as const;
export type UpdateCompanyPlanSubscriptionInfoMutationVariables = Types.Exact<{
  subscriptionId: Types.Scalars['String'];
}>;


export type UpdateCompanyPlanSubscriptionInfoMutation = { __typename?: 'Mutation', updateCompanyPlanSubscriptionInfo: boolean };

export type UpdateCompanyStatusMutationVariables = Types.Exact<{
  companyId: Types.Scalars['String'];
  isActive: Types.Scalars['Boolean'];
}>;


export type UpdateCompanyStatusMutation = { __typename?: 'Mutation', updateCompanyStatus: boolean };


export const UpdateCompanyPlanSubscriptionInfoDocument = gql`
    mutation updateCompanyPlanSubscriptionInfo($subscriptionId: String!) {
  updateCompanyPlanSubscriptionInfo(subscriptionId: $subscriptionId)
}
    `;
export type UpdateCompanyPlanSubscriptionInfoMutationFn = Apollo.MutationFunction<UpdateCompanyPlanSubscriptionInfoMutation, UpdateCompanyPlanSubscriptionInfoMutationVariables>;

/**
 * __useUpdateCompanyPlanSubscriptionInfoMutation__
 *
 * To run a mutation, you first call `useUpdateCompanyPlanSubscriptionInfoMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useUpdateCompanyPlanSubscriptionInfoMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [updateCompanyPlanSubscriptionInfoMutation, { data, loading, error }] = useUpdateCompanyPlanSubscriptionInfoMutation({
 *   variables: {
 *      subscriptionId: // value for 'subscriptionId'
 *   },
 * });
 */
export function useUpdateCompanyPlanSubscriptionInfoMutation(baseOptions?: Apollo.MutationHookOptions<UpdateCompanyPlanSubscriptionInfoMutation, UpdateCompanyPlanSubscriptionInfoMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<UpdateCompanyPlanSubscriptionInfoMutation, UpdateCompanyPlanSubscriptionInfoMutationVariables>(UpdateCompanyPlanSubscriptionInfoDocument, options);
      }
export type UpdateCompanyPlanSubscriptionInfoMutationHookResult = ReturnType<typeof useUpdateCompanyPlanSubscriptionInfoMutation>;
export type UpdateCompanyPlanSubscriptionInfoMutationResult = Apollo.MutationResult<UpdateCompanyPlanSubscriptionInfoMutation>;
export type UpdateCompanyPlanSubscriptionInfoMutationOptions = Apollo.BaseMutationOptions<UpdateCompanyPlanSubscriptionInfoMutation, UpdateCompanyPlanSubscriptionInfoMutationVariables>;
export const UpdateCompanyStatusDocument = gql`
    mutation updateCompanyStatus($companyId: String!, $isActive: Boolean!) {
  updateCompanyStatus(companyId: $companyId, isActive: $isActive)
}
    `;
export type UpdateCompanyStatusMutationFn = Apollo.MutationFunction<UpdateCompanyStatusMutation, UpdateCompanyStatusMutationVariables>;

/**
 * __useUpdateCompanyStatusMutation__
 *
 * To run a mutation, you first call `useUpdateCompanyStatusMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useUpdateCompanyStatusMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [updateCompanyStatusMutation, { data, loading, error }] = useUpdateCompanyStatusMutation({
 *   variables: {
 *      companyId: // value for 'companyId'
 *      isActive: // value for 'isActive'
 *   },
 * });
 */
export function useUpdateCompanyStatusMutation(baseOptions?: Apollo.MutationHookOptions<UpdateCompanyStatusMutation, UpdateCompanyStatusMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<UpdateCompanyStatusMutation, UpdateCompanyStatusMutationVariables>(UpdateCompanyStatusDocument, options);
      }
export type UpdateCompanyStatusMutationHookResult = ReturnType<typeof useUpdateCompanyStatusMutation>;
export type UpdateCompanyStatusMutationResult = Apollo.MutationResult<UpdateCompanyStatusMutation>;
export type UpdateCompanyStatusMutationOptions = Apollo.BaseMutationOptions<UpdateCompanyStatusMutation, UpdateCompanyStatusMutationVariables>;