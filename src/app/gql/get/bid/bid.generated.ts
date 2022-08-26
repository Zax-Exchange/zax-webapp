// THIS FILE IS GENERATED. DO NOT EDIT.
import * as Types from '../../../../generated/graphql';

import { gql } from '@apollo/client';
import * as Apollo from '@apollo/client';
const defaultOptions = {} as const;
export type GetProjectBidUsersQueryVariables = Types.Exact<{
  data: Types.GetProjectBidUsersInput;
}>;


export type GetProjectBidUsersQuery = { __typename?: 'Query', getProjectBidUsers: Array<{ __typename?: 'UserPermission', userId: string, name: string, email: string, permission: Types.ProjectPermission }> };


export const GetProjectBidUsersDocument = gql`
    query getProjectBidUsers($data: GetProjectBidUsersInput!) {
  getProjectBidUsers(data: $data) {
    userId
    name
    email
    permission
  }
}
    `;

/**
 * __useGetProjectBidUsersQuery__
 *
 * To run a query within a React component, call `useGetProjectBidUsersQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetProjectBidUsersQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetProjectBidUsersQuery({
 *   variables: {
 *      data: // value for 'data'
 *   },
 * });
 */
export function useGetProjectBidUsersQuery(baseOptions: Apollo.QueryHookOptions<GetProjectBidUsersQuery, GetProjectBidUsersQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<GetProjectBidUsersQuery, GetProjectBidUsersQueryVariables>(GetProjectBidUsersDocument, options);
      }
export function useGetProjectBidUsersLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<GetProjectBidUsersQuery, GetProjectBidUsersQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<GetProjectBidUsersQuery, GetProjectBidUsersQueryVariables>(GetProjectBidUsersDocument, options);
        }
export type GetProjectBidUsersQueryHookResult = ReturnType<typeof useGetProjectBidUsersQuery>;
export type GetProjectBidUsersLazyQueryHookResult = ReturnType<typeof useGetProjectBidUsersLazyQuery>;
export type GetProjectBidUsersQueryResult = Apollo.QueryResult<GetProjectBidUsersQuery, GetProjectBidUsersQueryVariables>;