// THIS FILE IS GENERATED. DO NOT EDIT.
import * as Types from '../../../../generated/graphql';

import { gql } from '@apollo/client';
import * as Apollo from '@apollo/client';
const defaultOptions = {} as const;
export type UpdateCompanyPlanSubscriptionInfoMutationVariables = Types.Exact<{
  data: Types.UpdateCompanyPlanSubscriptionInfoInput;
}>;


export type UpdateCompanyPlanSubscriptionInfoMutation = { __typename?: 'Mutation', updateCompanyPlanSubscriptionInfo: boolean };

export type UpdateCompanyStatusMutationVariables = Types.Exact<{
  data: Types.UpdateCompanyStatusInput;
}>;


export type UpdateCompanyStatusMutation = { __typename?: 'Mutation', updateCompanyStatus: boolean };


export const UpdateCompanyPlanSubscriptionInfoDocument = gql`
    mutation updateCompanyPlanSubscriptionInfo($data: UpdateCompanyPlanSubscriptionInfoInput!) {
  updateCompanyPlanSubscriptionInfo(data: $data)
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
 *      data: // value for 'data'
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
    mutation updateCompanyStatus($data: UpdateCompanyStatusInput!) {
  updateCompanyStatus(data: $data)
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
 *      data: // value for 'data'
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