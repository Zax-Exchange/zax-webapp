// THIS FILE IS GENERATED. DO NOT EDIT.
import * as Types from '../../../../generated/graphql';

import { gql } from '@apollo/client';
import * as Apollo from '@apollo/client';
const defaultOptions = {} as const;
export type GetStatementsLinkQueryVariables = Types.Exact<{
  data: Types.GetStatementsLinkInput;
}>;


export type GetStatementsLinkQuery = { __typename?: 'Query', getStatementsLink: string };


export const GetStatementsLinkDocument = gql`
    query getStatementsLink($data: GetStatementsLinkInput!) {
  getStatementsLink(data: $data)
}
    `;

/**
 * __useGetStatementsLinkQuery__
 *
 * To run a query within a React component, call `useGetStatementsLinkQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetStatementsLinkQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetStatementsLinkQuery({
 *   variables: {
 *      data: // value for 'data'
 *   },
 * });
 */
export function useGetStatementsLinkQuery(baseOptions: Apollo.QueryHookOptions<GetStatementsLinkQuery, GetStatementsLinkQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<GetStatementsLinkQuery, GetStatementsLinkQueryVariables>(GetStatementsLinkDocument, options);
      }
export function useGetStatementsLinkLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<GetStatementsLinkQuery, GetStatementsLinkQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<GetStatementsLinkQuery, GetStatementsLinkQueryVariables>(GetStatementsLinkDocument, options);
        }
export type GetStatementsLinkQueryHookResult = ReturnType<typeof useGetStatementsLinkQuery>;
export type GetStatementsLinkLazyQueryHookResult = ReturnType<typeof useGetStatementsLinkLazyQuery>;
export type GetStatementsLinkQueryResult = Apollo.QueryResult<GetStatementsLinkQuery, GetStatementsLinkQueryVariables>;