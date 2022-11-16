// THIS FILE IS GENERATED. DO NOT EDIT.
import * as Types from '../../../../generated/graphql';

import { gql } from '@apollo/client';
import * as Apollo from '@apollo/client';
const defaultOptions = {} as const;
export type CreateProjectBidComponentsMutationVariables = Types.Exact<{
  data: Array<Types.CreateProjectBidComponentInput> | Types.CreateProjectBidComponentInput;
}>;


export type CreateProjectBidComponentsMutation = { __typename?: 'Mutation', createProjectBidComponents: boolean };


export const CreateProjectBidComponentsDocument = gql`
    mutation createProjectBidComponents($data: [CreateProjectBidComponentInput!]!) {
  createProjectBidComponents(data: $data)
}
    `;
export type CreateProjectBidComponentsMutationFn = Apollo.MutationFunction<CreateProjectBidComponentsMutation, CreateProjectBidComponentsMutationVariables>;

/**
 * __useCreateProjectBidComponentsMutation__
 *
 * To run a mutation, you first call `useCreateProjectBidComponentsMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useCreateProjectBidComponentsMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [createProjectBidComponentsMutation, { data, loading, error }] = useCreateProjectBidComponentsMutation({
 *   variables: {
 *      data: // value for 'data'
 *   },
 * });
 */
export function useCreateProjectBidComponentsMutation(baseOptions?: Apollo.MutationHookOptions<CreateProjectBidComponentsMutation, CreateProjectBidComponentsMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<CreateProjectBidComponentsMutation, CreateProjectBidComponentsMutationVariables>(CreateProjectBidComponentsDocument, options);
      }
export type CreateProjectBidComponentsMutationHookResult = ReturnType<typeof useCreateProjectBidComponentsMutation>;
export type CreateProjectBidComponentsMutationResult = Apollo.MutationResult<CreateProjectBidComponentsMutation>;
export type CreateProjectBidComponentsMutationOptions = Apollo.BaseMutationOptions<CreateProjectBidComponentsMutation, CreateProjectBidComponentsMutationVariables>;