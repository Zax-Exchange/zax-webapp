// THIS FILE IS GENERATED. DO NOT EDIT.
import * as Types from '../../../../generated/graphql';

import { gql } from '@apollo/client';
import * as Apollo from '@apollo/client';
const defaultOptions = {} as const;
export type GetBillingEmailQueryVariables = Types.Exact<{
  data: Types.GetBillingEmailInput;
}>;


export type GetBillingEmailQuery = { __typename?: 'Query', getBillingEmail: string };

export type GetStatementsQueryVariables = Types.Exact<{
  data: Types.GetStatementsInput;
}>;


export type GetStatementsQuery = { __typename?: 'Query', getStatements: string };


export const GetBillingEmailDocument = gql`
    query getBillingEmail($data: GetBillingEmailInput!) {
  getBillingEmail(data: $data)
}
    `;

/**
 * __useGetBillingEmailQuery__
 *
 * To run a query within a React component, call `useGetBillingEmailQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetBillingEmailQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetBillingEmailQuery({
 *   variables: {
 *      data: // value for 'data'
 *   },
 * });
 */
export function useGetBillingEmailQuery(baseOptions: Apollo.QueryHookOptions<GetBillingEmailQuery, GetBillingEmailQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<GetBillingEmailQuery, GetBillingEmailQueryVariables>(GetBillingEmailDocument, options);
      }
export function useGetBillingEmailLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<GetBillingEmailQuery, GetBillingEmailQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<GetBillingEmailQuery, GetBillingEmailQueryVariables>(GetBillingEmailDocument, options);
        }
export type GetBillingEmailQueryHookResult = ReturnType<typeof useGetBillingEmailQuery>;
export type GetBillingEmailLazyQueryHookResult = ReturnType<typeof useGetBillingEmailLazyQuery>;
export type GetBillingEmailQueryResult = Apollo.QueryResult<GetBillingEmailQuery, GetBillingEmailQueryVariables>;
export const GetStatementsDocument = gql`
    query getStatements($data: GetStatementsInput!) {
  getStatements(data: $data)
}
    `;

/**
 * __useGetStatementsQuery__
 *
 * To run a query within a React component, call `useGetStatementsQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetStatementsQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetStatementsQuery({
 *   variables: {
 *      data: // value for 'data'
 *   },
 * });
 */
export function useGetStatementsQuery(baseOptions: Apollo.QueryHookOptions<GetStatementsQuery, GetStatementsQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<GetStatementsQuery, GetStatementsQueryVariables>(GetStatementsDocument, options);
      }
export function useGetStatementsLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<GetStatementsQuery, GetStatementsQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<GetStatementsQuery, GetStatementsQueryVariables>(GetStatementsDocument, options);
        }
export type GetStatementsQueryHookResult = ReturnType<typeof useGetStatementsQuery>;
export type GetStatementsLazyQueryHookResult = ReturnType<typeof useGetStatementsLazyQuery>;
export type GetStatementsQueryResult = Apollo.QueryResult<GetStatementsQuery, GetStatementsQueryVariables>;