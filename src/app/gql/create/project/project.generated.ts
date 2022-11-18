// THIS FILE IS GENERATED. DO NOT EDIT.
import * as Types from '../../../../generated/graphql';

import { gql } from '@apollo/client';
import * as Apollo from '@apollo/client';
const defaultOptions = {} as const;
export type CreateProjectBidMutationVariables = Types.Exact<{
  data: Types.CreateProjectBidInput;
}>;


export type CreateProjectBidMutation = { __typename?: 'Mutation', createProjectBid: boolean };

export type CreateProjectMutationVariables = Types.Exact<{
  data: Types.CreateProjectInput;
}>;


export type CreateProjectMutation = { __typename?: 'Mutation', createProject: boolean };

export type CreateProjectComponentsMutationVariables = Types.Exact<{
  data: Array<Types.CreateProjectComponentInput> | Types.CreateProjectComponentInput;
}>;


export type CreateProjectComponentsMutation = { __typename?: 'Mutation', createProjectComponents: boolean };


export const CreateProjectBidDocument = gql`
    mutation CreateProjectBid($data: CreateProjectBidInput!) {
  createProjectBid(data: $data)
}
    `;
export type CreateProjectBidMutationFn = Apollo.MutationFunction<CreateProjectBidMutation, CreateProjectBidMutationVariables>;

/**
 * __useCreateProjectBidMutation__
 *
 * To run a mutation, you first call `useCreateProjectBidMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useCreateProjectBidMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [createProjectBidMutation, { data, loading, error }] = useCreateProjectBidMutation({
 *   variables: {
 *      data: // value for 'data'
 *   },
 * });
 */
export function useCreateProjectBidMutation(baseOptions?: Apollo.MutationHookOptions<CreateProjectBidMutation, CreateProjectBidMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<CreateProjectBidMutation, CreateProjectBidMutationVariables>(CreateProjectBidDocument, options);
      }
export type CreateProjectBidMutationHookResult = ReturnType<typeof useCreateProjectBidMutation>;
export type CreateProjectBidMutationResult = Apollo.MutationResult<CreateProjectBidMutation>;
export type CreateProjectBidMutationOptions = Apollo.BaseMutationOptions<CreateProjectBidMutation, CreateProjectBidMutationVariables>;
export const CreateProjectDocument = gql`
    mutation createProject($data: CreateProjectInput!) {
  createProject(data: $data)
}
    `;
export type CreateProjectMutationFn = Apollo.MutationFunction<CreateProjectMutation, CreateProjectMutationVariables>;

/**
 * __useCreateProjectMutation__
 *
 * To run a mutation, you first call `useCreateProjectMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useCreateProjectMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [createProjectMutation, { data, loading, error }] = useCreateProjectMutation({
 *   variables: {
 *      data: // value for 'data'
 *   },
 * });
 */
export function useCreateProjectMutation(baseOptions?: Apollo.MutationHookOptions<CreateProjectMutation, CreateProjectMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<CreateProjectMutation, CreateProjectMutationVariables>(CreateProjectDocument, options);
      }
export type CreateProjectMutationHookResult = ReturnType<typeof useCreateProjectMutation>;
export type CreateProjectMutationResult = Apollo.MutationResult<CreateProjectMutation>;
export type CreateProjectMutationOptions = Apollo.BaseMutationOptions<CreateProjectMutation, CreateProjectMutationVariables>;
export const CreateProjectComponentsDocument = gql`
    mutation createProjectComponents($data: [CreateProjectComponentInput!]!) {
  createProjectComponents(data: $data)
}
    `;
export type CreateProjectComponentsMutationFn = Apollo.MutationFunction<CreateProjectComponentsMutation, CreateProjectComponentsMutationVariables>;

/**
 * __useCreateProjectComponentsMutation__
 *
 * To run a mutation, you first call `useCreateProjectComponentsMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useCreateProjectComponentsMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [createProjectComponentsMutation, { data, loading, error }] = useCreateProjectComponentsMutation({
 *   variables: {
 *      data: // value for 'data'
 *   },
 * });
 */
export function useCreateProjectComponentsMutation(baseOptions?: Apollo.MutationHookOptions<CreateProjectComponentsMutation, CreateProjectComponentsMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<CreateProjectComponentsMutation, CreateProjectComponentsMutationVariables>(CreateProjectComponentsDocument, options);
      }
export type CreateProjectComponentsMutationHookResult = ReturnType<typeof useCreateProjectComponentsMutation>;
export type CreateProjectComponentsMutationResult = Apollo.MutationResult<CreateProjectComponentsMutation>;
export type CreateProjectComponentsMutationOptions = Apollo.BaseMutationOptions<CreateProjectComponentsMutation, CreateProjectComponentsMutationVariables>;