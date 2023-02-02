// THIS FILE IS GENERATED. DO NOT EDIT.
import * as Types from '../../../../generated/graphql';

import { gql } from '@apollo/client';
import * as Apollo from '@apollo/client';
const defaultOptions = {} as const;
export type SearchCategoriesQueryVariables = Types.Exact<{
  data: Types.SearchCategoriesInput;
}>;


export type SearchCategoriesQuery = { __typename?: 'Query', searchCategories: Array<{ __typename?: 'Category', name: string, parent: string, children: Array<string> }> };


export const SearchCategoriesDocument = gql`
    query searchCategories($data: SearchCategoriesInput!) {
  searchCategories(data: $data) {
    name
    parent
    children
  }
}
    `;

/**
 * __useSearchCategoriesQuery__
 *
 * To run a query within a React component, call `useSearchCategoriesQuery` and pass it any options that fit your needs.
 * When your component renders, `useSearchCategoriesQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useSearchCategoriesQuery({
 *   variables: {
 *      data: // value for 'data'
 *   },
 * });
 */
export function useSearchCategoriesQuery(baseOptions: Apollo.QueryHookOptions<SearchCategoriesQuery, SearchCategoriesQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<SearchCategoriesQuery, SearchCategoriesQueryVariables>(SearchCategoriesDocument, options);
      }
export function useSearchCategoriesLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<SearchCategoriesQuery, SearchCategoriesQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<SearchCategoriesQuery, SearchCategoriesQueryVariables>(SearchCategoriesDocument, options);
        }
export type SearchCategoriesQueryHookResult = ReturnType<typeof useSearchCategoriesQuery>;
export type SearchCategoriesLazyQueryHookResult = ReturnType<typeof useSearchCategoriesLazyQuery>;
export type SearchCategoriesQueryResult = Apollo.QueryResult<SearchCategoriesQuery, SearchCategoriesQueryVariables>;