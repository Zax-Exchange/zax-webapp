// THIS FILE IS GENERATED. DO NOT EDIT.
import * as Types from '../../../../generated/graphql';

import { gql } from '@apollo/client';
import * as Apollo from '@apollo/client';
const defaultOptions = {} as const;
export type GetProjectBidUsersQueryVariables = Types.Exact<{
  data: Types.GetProjectBidUsersInput;
}>;


export type GetProjectBidUsersQuery = { __typename?: 'Query', getProjectBidUsers: Array<{ __typename?: 'UserProjectPermission', userId: string, name: string, email: string, permission: Types.ProjectPermission }> };

export type GetProjectBidQueryVariables = Types.Exact<{
  data: Types.GetProjectBidInput;
}>;


export type GetProjectBidQuery = { __typename?: 'Query', getProjectBid?: { __typename?: 'ProjectBid', id: string, userId: string, companyId: string, projectId: string, comments: string, status: Types.BidStatus, createdAt: any, updatedAt: any, components: Array<{ __typename?: 'ProjectBidComponent', id: string, projectBidId: string, projectComponentId: string, samplingFee: number, quantityPrices: Array<{ __typename?: 'QuantityPrice', quantity: number, price: string }> }> } | null };


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
export const GetProjectBidDocument = gql`
    query getProjectBid($data: GetProjectBidInput!) {
  getProjectBid(data: $data) {
    id
    userId
    companyId
    projectId
    comments
    components {
      id
      projectBidId
      projectComponentId
      samplingFee
      quantityPrices {
        quantity
        price
      }
    }
    status
    createdAt
    updatedAt
  }
}
    `;

/**
 * __useGetProjectBidQuery__
 *
 * To run a query within a React component, call `useGetProjectBidQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetProjectBidQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetProjectBidQuery({
 *   variables: {
 *      data: // value for 'data'
 *   },
 * });
 */
export function useGetProjectBidQuery(baseOptions: Apollo.QueryHookOptions<GetProjectBidQuery, GetProjectBidQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<GetProjectBidQuery, GetProjectBidQueryVariables>(GetProjectBidDocument, options);
      }
export function useGetProjectBidLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<GetProjectBidQuery, GetProjectBidQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<GetProjectBidQuery, GetProjectBidQueryVariables>(GetProjectBidDocument, options);
        }
export type GetProjectBidQueryHookResult = ReturnType<typeof useGetProjectBidQuery>;
export type GetProjectBidLazyQueryHookResult = ReturnType<typeof useGetProjectBidLazyQuery>;
export type GetProjectBidQueryResult = Apollo.QueryResult<GetProjectBidQuery, GetProjectBidQueryVariables>;