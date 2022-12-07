// THIS FILE IS GENERATED. DO NOT EDIT.
import * as Types from '../../../../generated/graphql';

import { gql } from '@apollo/client';
import * as Apollo from '@apollo/client';
const defaultOptions = {} as const;
export type CreateStripeCustomerInStripeMutationVariables = Types.Exact<{
  data: Types.CreateStripeCustomerInStripeInput;
}>;


export type CreateStripeCustomerInStripeMutation = { __typename?: 'Mutation', createStripeCustomerInStripe: { __typename?: 'StripePaymentIntent', subscriptionId: string, clientSecret: string, customerId: string } };


export const CreateStripeCustomerInStripeDocument = gql`
    mutation createStripeCustomerInStripe($data: CreateStripeCustomerInStripeInput!) {
  createStripeCustomerInStripe(data: $data) {
    subscriptionId
    clientSecret
    customerId
  }
}
    `;
export type CreateStripeCustomerInStripeMutationFn = Apollo.MutationFunction<CreateStripeCustomerInStripeMutation, CreateStripeCustomerInStripeMutationVariables>;

/**
 * __useCreateStripeCustomerInStripeMutation__
 *
 * To run a mutation, you first call `useCreateStripeCustomerInStripeMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useCreateStripeCustomerInStripeMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [createStripeCustomerInStripeMutation, { data, loading, error }] = useCreateStripeCustomerInStripeMutation({
 *   variables: {
 *      data: // value for 'data'
 *   },
 * });
 */
export function useCreateStripeCustomerInStripeMutation(baseOptions?: Apollo.MutationHookOptions<CreateStripeCustomerInStripeMutation, CreateStripeCustomerInStripeMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<CreateStripeCustomerInStripeMutation, CreateStripeCustomerInStripeMutationVariables>(CreateStripeCustomerInStripeDocument, options);
      }
export type CreateStripeCustomerInStripeMutationHookResult = ReturnType<typeof useCreateStripeCustomerInStripeMutation>;
export type CreateStripeCustomerInStripeMutationResult = Apollo.MutationResult<CreateStripeCustomerInStripeMutation>;
export type CreateStripeCustomerInStripeMutationOptions = Apollo.BaseMutationOptions<CreateStripeCustomerInStripeMutation, CreateStripeCustomerInStripeMutationVariables>;