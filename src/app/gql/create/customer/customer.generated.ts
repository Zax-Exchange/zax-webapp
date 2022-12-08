// THIS FILE IS GENERATED. DO NOT EDIT.
import * as Types from '../../../../generated/graphql';

import { gql } from '@apollo/client';
import * as Apollo from '@apollo/client';
const defaultOptions = {} as const;
export type CreateCustomerMutationVariables = Types.Exact<{
  data: Types.CreateCustomerInput;
}>;


export type CreateCustomerMutation = { __typename?: 'Mutation', createCustomer: boolean };

export type CreateCustomerSubscriptionMutationVariables = Types.Exact<{
  priceId: Types.Scalars['String'];
  stripeCustomerId: Types.Scalars['String'];
}>;


export type CreateCustomerSubscriptionMutation = { __typename?: 'Mutation', createCustomerSubscription: { __typename?: 'StripeSubscription', clientSecret: string, subscriptionId: string } };

export type CreatePurchaseOrderMutationVariables = Types.Exact<{
  data: Types.CreatePurchaseOrderInput;
}>;


export type CreatePurchaseOrderMutation = { __typename?: 'Mutation', createPurchaseOrder: boolean };


export const CreateCustomerDocument = gql`
    mutation createCustomer($data: CreateCustomerInput!) {
  createCustomer(data: $data)
}
    `;
export type CreateCustomerMutationFn = Apollo.MutationFunction<CreateCustomerMutation, CreateCustomerMutationVariables>;

/**
 * __useCreateCustomerMutation__
 *
 * To run a mutation, you first call `useCreateCustomerMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useCreateCustomerMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [createCustomerMutation, { data, loading, error }] = useCreateCustomerMutation({
 *   variables: {
 *      data: // value for 'data'
 *   },
 * });
 */
export function useCreateCustomerMutation(baseOptions?: Apollo.MutationHookOptions<CreateCustomerMutation, CreateCustomerMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<CreateCustomerMutation, CreateCustomerMutationVariables>(CreateCustomerDocument, options);
      }
export type CreateCustomerMutationHookResult = ReturnType<typeof useCreateCustomerMutation>;
export type CreateCustomerMutationResult = Apollo.MutationResult<CreateCustomerMutation>;
export type CreateCustomerMutationOptions = Apollo.BaseMutationOptions<CreateCustomerMutation, CreateCustomerMutationVariables>;
export const CreateCustomerSubscriptionDocument = gql`
    mutation createCustomerSubscription($priceId: String!, $stripeCustomerId: String!) {
  createCustomerSubscription(
    priceId: $priceId
    stripeCustomerId: $stripeCustomerId
  ) {
    clientSecret
    subscriptionId
  }
}
    `;
export type CreateCustomerSubscriptionMutationFn = Apollo.MutationFunction<CreateCustomerSubscriptionMutation, CreateCustomerSubscriptionMutationVariables>;

/**
 * __useCreateCustomerSubscriptionMutation__
 *
 * To run a mutation, you first call `useCreateCustomerSubscriptionMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useCreateCustomerSubscriptionMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [createCustomerSubscriptionMutation, { data, loading, error }] = useCreateCustomerSubscriptionMutation({
 *   variables: {
 *      priceId: // value for 'priceId'
 *      stripeCustomerId: // value for 'stripeCustomerId'
 *   },
 * });
 */
export function useCreateCustomerSubscriptionMutation(baseOptions?: Apollo.MutationHookOptions<CreateCustomerSubscriptionMutation, CreateCustomerSubscriptionMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<CreateCustomerSubscriptionMutation, CreateCustomerSubscriptionMutationVariables>(CreateCustomerSubscriptionDocument, options);
      }
export type CreateCustomerSubscriptionMutationHookResult = ReturnType<typeof useCreateCustomerSubscriptionMutation>;
export type CreateCustomerSubscriptionMutationResult = Apollo.MutationResult<CreateCustomerSubscriptionMutation>;
export type CreateCustomerSubscriptionMutationOptions = Apollo.BaseMutationOptions<CreateCustomerSubscriptionMutation, CreateCustomerSubscriptionMutationVariables>;
export const CreatePurchaseOrderDocument = gql`
    mutation createPurchaseOrder($data: CreatePurchaseOrderInput!) {
  createPurchaseOrder(data: $data)
}
    `;
export type CreatePurchaseOrderMutationFn = Apollo.MutationFunction<CreatePurchaseOrderMutation, CreatePurchaseOrderMutationVariables>;

/**
 * __useCreatePurchaseOrderMutation__
 *
 * To run a mutation, you first call `useCreatePurchaseOrderMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useCreatePurchaseOrderMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [createPurchaseOrderMutation, { data, loading, error }] = useCreatePurchaseOrderMutation({
 *   variables: {
 *      data: // value for 'data'
 *   },
 * });
 */
export function useCreatePurchaseOrderMutation(baseOptions?: Apollo.MutationHookOptions<CreatePurchaseOrderMutation, CreatePurchaseOrderMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<CreatePurchaseOrderMutation, CreatePurchaseOrderMutationVariables>(CreatePurchaseOrderDocument, options);
      }
export type CreatePurchaseOrderMutationHookResult = ReturnType<typeof useCreatePurchaseOrderMutation>;
export type CreatePurchaseOrderMutationResult = Apollo.MutationResult<CreatePurchaseOrderMutation>;
export type CreatePurchaseOrderMutationOptions = Apollo.BaseMutationOptions<CreatePurchaseOrderMutation, CreatePurchaseOrderMutationVariables>;