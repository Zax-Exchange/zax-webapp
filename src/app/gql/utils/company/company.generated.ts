// THIS FILE IS GENERATED. DO NOT EDIT.
import * as Types from '../../../../generated/graphql';

import { gql } from '@apollo/client';
import * as Apollo from '@apollo/client';
const defaultOptions = {} as const;
export type CheckCompanyNameQueryVariables = Types.Exact<{
  data: Types.CheckCompanyNameInput;
}>;


export type CheckCompanyNameQuery = { __typename?: 'Query', checkCompanyName: boolean };


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