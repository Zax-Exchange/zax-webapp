// THIS FILE IS GENERATED. DO NOT EDIT.
import * as Types from '../../../../generated/graphql';

import { gql } from '@apollo/client';
import * as Apollo from '@apollo/client';
const defaultOptions = {} as const;
export type CheckCompanyNameQueryVariables = Types.Exact<{
  data: Types.CheckCompanyNameInput;
}>;


export type CheckCompanyNameQuery = { __typename?: 'Query', checkCompanyName: boolean };

export type GetAllPendingJoinRequestsQueryVariables = Types.Exact<{
  data: Types.GetAllPendingJoinRequestsInput;
}>;


export type GetAllPendingJoinRequestsQuery = { __typename?: 'Query', getAllPendingJoinRequests: Array<string> };

export type DeletePendingJoinRequestsMutationVariables = Types.Exact<{
  data: Array<Types.DeletePendingJoinRequestInput> | Types.DeletePendingJoinRequestInput;
}>;


export type DeletePendingJoinRequestsMutation = { __typename?: 'Mutation', deletePendingJoinRequests: boolean };


export const CheckCompanyNameDocument = gql`
    query checkCompanyName($data: CheckCompanyNameInput!) {
  checkCompanyName(data: $data)
}
    `;

/**
 * __useCheckCompanyNameQuery__
 *
 * To run a query within a React component, call `useCheckCompanyNameQuery` and pass it any options that fit your needs.
 * When your component renders, `useCheckCompanyNameQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useCheckCompanyNameQuery({
 *   variables: {
 *      data: // value for 'data'
 *   },
 * });
 */
export function useCheckCompanyNameQuery(baseOptions: Apollo.QueryHookOptions<CheckCompanyNameQuery, CheckCompanyNameQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<CheckCompanyNameQuery, CheckCompanyNameQueryVariables>(CheckCompanyNameDocument, options);
      }
export function useCheckCompanyNameLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<CheckCompanyNameQuery, CheckCompanyNameQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<CheckCompanyNameQuery, CheckCompanyNameQueryVariables>(CheckCompanyNameDocument, options);
        }
export type CheckCompanyNameQueryHookResult = ReturnType<typeof useCheckCompanyNameQuery>;
export type CheckCompanyNameLazyQueryHookResult = ReturnType<typeof useCheckCompanyNameLazyQuery>;
export type CheckCompanyNameQueryResult = Apollo.QueryResult<CheckCompanyNameQuery, CheckCompanyNameQueryVariables>;
export const GetAllPendingJoinRequestsDocument = gql`
    query getAllPendingJoinRequests($data: GetAllPendingJoinRequestsInput!) {
  getAllPendingJoinRequests(data: $data)
}
    `;

/**
 * __useGetAllPendingJoinRequestsQuery__
 *
 * To run a query within a React component, call `useGetAllPendingJoinRequestsQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetAllPendingJoinRequestsQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetAllPendingJoinRequestsQuery({
 *   variables: {
 *      data: // value for 'data'
 *   },
 * });
 */
export function useGetAllPendingJoinRequestsQuery(baseOptions: Apollo.QueryHookOptions<GetAllPendingJoinRequestsQuery, GetAllPendingJoinRequestsQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<GetAllPendingJoinRequestsQuery, GetAllPendingJoinRequestsQueryVariables>(GetAllPendingJoinRequestsDocument, options);
      }
export function useGetAllPendingJoinRequestsLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<GetAllPendingJoinRequestsQuery, GetAllPendingJoinRequestsQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<GetAllPendingJoinRequestsQuery, GetAllPendingJoinRequestsQueryVariables>(GetAllPendingJoinRequestsDocument, options);
        }
export type GetAllPendingJoinRequestsQueryHookResult = ReturnType<typeof useGetAllPendingJoinRequestsQuery>;
export type GetAllPendingJoinRequestsLazyQueryHookResult = ReturnType<typeof useGetAllPendingJoinRequestsLazyQuery>;
export type GetAllPendingJoinRequestsQueryResult = Apollo.QueryResult<GetAllPendingJoinRequestsQuery, GetAllPendingJoinRequestsQueryVariables>;
export const DeletePendingJoinRequestsDocument = gql`
    mutation deletePendingJoinRequests($data: [DeletePendingJoinRequestInput!]!) {
  deletePendingJoinRequests(data: $data)
}
    `;
export type DeletePendingJoinRequestsMutationFn = Apollo.MutationFunction<DeletePendingJoinRequestsMutation, DeletePendingJoinRequestsMutationVariables>;

/**
 * __useDeletePendingJoinRequestsMutation__
 *
 * To run a mutation, you first call `useDeletePendingJoinRequestsMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useDeletePendingJoinRequestsMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [deletePendingJoinRequestsMutation, { data, loading, error }] = useDeletePendingJoinRequestsMutation({
 *   variables: {
 *      data: // value for 'data'
 *   },
 * });
 */
export function useDeletePendingJoinRequestsMutation(baseOptions?: Apollo.MutationHookOptions<DeletePendingJoinRequestsMutation, DeletePendingJoinRequestsMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<DeletePendingJoinRequestsMutation, DeletePendingJoinRequestsMutationVariables>(DeletePendingJoinRequestsDocument, options);
      }
export type DeletePendingJoinRequestsMutationHookResult = ReturnType<typeof useDeletePendingJoinRequestsMutation>;
export type DeletePendingJoinRequestsMutationResult = Apollo.MutationResult<DeletePendingJoinRequestsMutation>;
export type DeletePendingJoinRequestsMutationOptions = Apollo.BaseMutationOptions<DeletePendingJoinRequestsMutation, DeletePendingJoinRequestsMutationVariables>;