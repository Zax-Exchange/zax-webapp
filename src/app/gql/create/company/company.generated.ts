import * as Types from '../../../../generated/graphql';

import { gql } from '@apollo/client';
import * as Apollo from '@apollo/client';
const defaultOptions = {} as const;
export type CreateStripeCustomerMutationVariables = Types.Exact<{
  email: Types.Scalars['String'];
}>;


export type CreateStripeCustomerMutation = { __typename?: 'Mutation', createStripeCustomer: string };


export const CreateStripeCustomerDocument = gql`
    mutation createStripeCustomer($email: String!) {
  createStripeCustomer(email: $email)
}
    `;
export type CreateStripeCustomerMutationFn = Apollo.MutationFunction<CreateStripeCustomerMutation, CreateStripeCustomerMutationVariables>;

/**
 * __useCreateStripeCustomerMutation__
 *
 * To run a mutation, you first call `useCreateStripeCustomerMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useCreateStripeCustomerMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [createStripeCustomerMutation, { data, loading, error }] = useCreateStripeCustomerMutation({
 *   variables: {
 *      email: // value for 'email'
 *   },
 * });
 */
export function useCreateStripeCustomerMutation(baseOptions?: Apollo.MutationHookOptions<CreateStripeCustomerMutation, CreateStripeCustomerMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<CreateStripeCustomerMutation, CreateStripeCustomerMutationVariables>(CreateStripeCustomerDocument, options);
      }
export type CreateStripeCustomerMutationHookResult = ReturnType<typeof useCreateStripeCustomerMutation>;
export type CreateStripeCustomerMutationResult = Apollo.MutationResult<CreateStripeCustomerMutation>;
export type CreateStripeCustomerMutationOptions = Apollo.BaseMutationOptions<CreateStripeCustomerMutation, CreateStripeCustomerMutationVariables>;