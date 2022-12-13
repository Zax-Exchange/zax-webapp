// THIS FILE IS GENERATED. DO NOT EDIT.
import * as Types from '../../../../generated/graphql';

import { gql } from '@apollo/client';
import * as Apollo from '@apollo/client';
const defaultOptions = {} as const;
export type CreateStripeCustomerInStripeForCustomerMutationVariables = Types.Exact<{
  data: Types.CreateStripeCustomerInStripeForCustomerInput;
}>;


export type CreateStripeCustomerInStripeForCustomerMutation = { __typename?: 'Mutation', createStripeCustomerInStripeForCustomer: { __typename?: 'StripePaymentIntent', subscriptionId: string, clientSecret: string, customerId: string } };

export type CreateStripeCustomerInStripeForVendorMutationVariables = Types.Exact<{
  data: Types.CreateStripeCustomerInStripeForVendorInput;
}>;


export type CreateStripeCustomerInStripeForVendorMutation = { __typename?: 'Mutation', createStripeCustomerInStripeForVendor: { __typename?: 'StripePaymentIntent', subscriptionId: string, clientSecret: string, customerId: string } };


export const CreateStripeCustomerInStripeForCustomerDocument = gql`
    mutation createStripeCustomerInStripeForCustomer($data: CreateStripeCustomerInStripeForCustomerInput!) {
  createStripeCustomerInStripeForCustomer(data: $data) {
    subscriptionId
    clientSecret
    customerId
  }
}
    `;
export type CreateStripeCustomerInStripeForCustomerMutationFn = Apollo.MutationFunction<CreateStripeCustomerInStripeForCustomerMutation, CreateStripeCustomerInStripeForCustomerMutationVariables>;

/**
 * __useCreateStripeCustomerInStripeForCustomerMutation__
 *
 * To run a mutation, you first call `useCreateStripeCustomerInStripeForCustomerMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useCreateStripeCustomerInStripeForCustomerMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [createStripeCustomerInStripeForCustomerMutation, { data, loading, error }] = useCreateStripeCustomerInStripeForCustomerMutation({
 *   variables: {
 *      data: // value for 'data'
 *   },
 * });
 */
export function useCreateStripeCustomerInStripeForCustomerMutation(baseOptions?: Apollo.MutationHookOptions<CreateStripeCustomerInStripeForCustomerMutation, CreateStripeCustomerInStripeForCustomerMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<CreateStripeCustomerInStripeForCustomerMutation, CreateStripeCustomerInStripeForCustomerMutationVariables>(CreateStripeCustomerInStripeForCustomerDocument, options);
      }
export type CreateStripeCustomerInStripeForCustomerMutationHookResult = ReturnType<typeof useCreateStripeCustomerInStripeForCustomerMutation>;
export type CreateStripeCustomerInStripeForCustomerMutationResult = Apollo.MutationResult<CreateStripeCustomerInStripeForCustomerMutation>;
export type CreateStripeCustomerInStripeForCustomerMutationOptions = Apollo.BaseMutationOptions<CreateStripeCustomerInStripeForCustomerMutation, CreateStripeCustomerInStripeForCustomerMutationVariables>;
export const CreateStripeCustomerInStripeForVendorDocument = gql`
    mutation createStripeCustomerInStripeForVendor($data: CreateStripeCustomerInStripeForVendorInput!) {
  createStripeCustomerInStripeForVendor(data: $data) {
    subscriptionId
    clientSecret
    customerId
  }
}
    `;
export type CreateStripeCustomerInStripeForVendorMutationFn = Apollo.MutationFunction<CreateStripeCustomerInStripeForVendorMutation, CreateStripeCustomerInStripeForVendorMutationVariables>;

/**
 * __useCreateStripeCustomerInStripeForVendorMutation__
 *
 * To run a mutation, you first call `useCreateStripeCustomerInStripeForVendorMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useCreateStripeCustomerInStripeForVendorMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [createStripeCustomerInStripeForVendorMutation, { data, loading, error }] = useCreateStripeCustomerInStripeForVendorMutation({
 *   variables: {
 *      data: // value for 'data'
 *   },
 * });
 */
export function useCreateStripeCustomerInStripeForVendorMutation(baseOptions?: Apollo.MutationHookOptions<CreateStripeCustomerInStripeForVendorMutation, CreateStripeCustomerInStripeForVendorMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<CreateStripeCustomerInStripeForVendorMutation, CreateStripeCustomerInStripeForVendorMutationVariables>(CreateStripeCustomerInStripeForVendorDocument, options);
      }
export type CreateStripeCustomerInStripeForVendorMutationHookResult = ReturnType<typeof useCreateStripeCustomerInStripeForVendorMutation>;
export type CreateStripeCustomerInStripeForVendorMutationResult = Apollo.MutationResult<CreateStripeCustomerInStripeForVendorMutation>;
export type CreateStripeCustomerInStripeForVendorMutationOptions = Apollo.BaseMutationOptions<CreateStripeCustomerInStripeForVendorMutation, CreateStripeCustomerInStripeForVendorMutationVariables>;