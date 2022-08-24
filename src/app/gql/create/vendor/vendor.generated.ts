import * as Types from '../../../../generated/graphql';

import { gql } from '@apollo/client';
import * as Apollo from '@apollo/client';
const defaultOptions = {} as const;
export type CreateVendorMutationVariables = Types.Exact<{
  data: Types.CreateVendorInput;
}>;


export type CreateVendorMutation = { __typename?: 'Mutation', createVendor: string };

export type CreateVendorSubscriptionMutationVariables = Types.Exact<{
  data: Types.CreateVendorSubscriptionInput;
}>;


export type CreateVendorSubscriptionMutation = { __typename?: 'Mutation', createVendorSubscription: { __typename?: 'StripeSubscription', clientSecret: string, subscriptionId: string } };


export const CreateVendorDocument = gql`
    mutation createVendor($data: CreateVendorInput!) {
  createVendor(data: $data)
}
    `;
export type CreateVendorMutationFn = Apollo.MutationFunction<CreateVendorMutation, CreateVendorMutationVariables>;

/**
 * __useCreateVendorMutation__
 *
 * To run a mutation, you first call `useCreateVendorMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useCreateVendorMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [createVendorMutation, { data, loading, error }] = useCreateVendorMutation({
 *   variables: {
 *      data: // value for 'data'
 *   },
 * });
 */
export function useCreateVendorMutation(baseOptions?: Apollo.MutationHookOptions<CreateVendorMutation, CreateVendorMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<CreateVendorMutation, CreateVendorMutationVariables>(CreateVendorDocument, options);
      }
export type CreateVendorMutationHookResult = ReturnType<typeof useCreateVendorMutation>;
export type CreateVendorMutationResult = Apollo.MutationResult<CreateVendorMutation>;
export type CreateVendorMutationOptions = Apollo.BaseMutationOptions<CreateVendorMutation, CreateVendorMutationVariables>;
export const CreateVendorSubscriptionDocument = gql`
    mutation createVendorSubscription($data: CreateVendorSubscriptionInput!) {
  createVendorSubscription(data: $data) {
    clientSecret
    subscriptionId
  }
}
    `;
export type CreateVendorSubscriptionMutationFn = Apollo.MutationFunction<CreateVendorSubscriptionMutation, CreateVendorSubscriptionMutationVariables>;

/**
 * __useCreateVendorSubscriptionMutation__
 *
 * To run a mutation, you first call `useCreateVendorSubscriptionMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useCreateVendorSubscriptionMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [createVendorSubscriptionMutation, { data, loading, error }] = useCreateVendorSubscriptionMutation({
 *   variables: {
 *      data: // value for 'data'
 *   },
 * });
 */
export function useCreateVendorSubscriptionMutation(baseOptions?: Apollo.MutationHookOptions<CreateVendorSubscriptionMutation, CreateVendorSubscriptionMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<CreateVendorSubscriptionMutation, CreateVendorSubscriptionMutationVariables>(CreateVendorSubscriptionDocument, options);
      }
export type CreateVendorSubscriptionMutationHookResult = ReturnType<typeof useCreateVendorSubscriptionMutation>;
export type CreateVendorSubscriptionMutationResult = Apollo.MutationResult<CreateVendorSubscriptionMutation>;
export type CreateVendorSubscriptionMutationOptions = Apollo.BaseMutationOptions<CreateVendorSubscriptionMutation, CreateVendorSubscriptionMutationVariables>;