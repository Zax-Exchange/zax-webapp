// THIS FILE IS GENERATED. DO NOT EDIT.
import * as Types from '../../../../generated/graphql';

import { gql } from '@apollo/client';
import { FileFragmentFragmentDoc } from '../../utils/common/file.generated';
import * as Apollo from '@apollo/client';
const defaultOptions = {} as const;
export type ProjectBidComponentFragmentFragment = { __typename?: 'ProjectBidComponent', id: string, projectBidId: string, projectComponentId: string, samplingFee: string, toolingFee?: string | null, quantityPrices: Array<{ __typename?: 'QuantityPrice', quantity: number, price: string }> };

export type ProjectBidFragmentFragment = { __typename?: 'ProjectBid', id: string, userId: string, companyId: string, projectId: string, status: Types.BidStatus, createdAt: any, updatedAt: any, components: Array<{ __typename?: 'ProjectBidComponent', id: string, projectBidId: string, projectComponentId: string, samplingFee: string, toolingFee?: string | null, quantityPrices: Array<{ __typename?: 'QuantityPrice', quantity: number, price: string }> }>, remarkFile?: { __typename?: 'BidRemark', fileId: string, filename: string, url: string } | null };

export type PermissionedProjectBidFragmentFragment = { __typename?: 'PermissionedProjectBid', id: string, userId: string, companyId: string, projectId: string, status: Types.BidStatus, permission: Types.ProjectPermission, createdAt: any, updatedAt: any, components: Array<{ __typename?: 'ProjectBidComponent', id: string, projectBidId: string, projectComponentId: string, samplingFee: string, toolingFee?: string | null, quantityPrices: Array<{ __typename?: 'QuantityPrice', quantity: number, price: string }> }>, remarkFile?: { __typename?: 'BidRemark', fileId: string, filename: string, url: string } | null };

export type GetProjectBidUsersQueryVariables = Types.Exact<{
  data: Types.GetProjectBidUsersInput;
}>;


export type GetProjectBidUsersQuery = { __typename?: 'Query', getProjectBidUsers: Array<{ __typename?: 'UserProjectPermission', userId: string, name: string, email: string, permission: Types.ProjectPermission }> };

export type GetProjectBidQueryVariables = Types.Exact<{
  data: Types.GetProjectBidInput;
}>;


export type GetProjectBidQuery = { __typename?: 'Query', getProjectBid?: { __typename?: 'ProjectBid', id: string, userId: string, companyId: string, projectId: string, status: Types.BidStatus, createdAt: any, updatedAt: any, components: Array<{ __typename?: 'ProjectBidComponent', id: string, projectBidId: string, projectComponentId: string, samplingFee: string, toolingFee?: string | null, quantityPrices: Array<{ __typename?: 'QuantityPrice', quantity: number, price: string }> }>, remarkFile?: { __typename?: 'BidRemark', fileId: string, filename: string, url: string } | null } | null };

export type GetProjectBidsForPoQueryVariables = Types.Exact<{
  data: Types.GetProjectBidsForPoInput;
}>;


export type GetProjectBidsForPoQuery = { __typename?: 'Query', getProjectBidsForPo: Array<{ __typename?: 'ProjectBidForPo', projectBidId: string, companyId: string, companyName: string }> };

export const ProjectBidComponentFragmentFragmentDoc = gql`
    fragment ProjectBidComponentFragment on ProjectBidComponent {
  id
  projectBidId
  projectComponentId
  samplingFee
  toolingFee
  quantityPrices {
    quantity
    price
  }
}
    `;
export const ProjectBidFragmentFragmentDoc = gql`
    fragment ProjectBidFragment on ProjectBid {
  id
  userId
  companyId
  projectId
  components {
    ...ProjectBidComponentFragment
  }
  status
  remarkFile {
    ...FileFragment
  }
  createdAt
  updatedAt
}
    ${ProjectBidComponentFragmentFragmentDoc}
${FileFragmentFragmentDoc}`;
export const PermissionedProjectBidFragmentFragmentDoc = gql`
    fragment PermissionedProjectBidFragment on PermissionedProjectBid {
  id
  userId
  companyId
  projectId
  components {
    ...ProjectBidComponentFragment
  }
  status
  remarkFile {
    fileId
    filename
    url
  }
  permission
  createdAt
  updatedAt
}
    ${ProjectBidComponentFragmentFragmentDoc}`;
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
    ...ProjectBidFragment
  }
}
    ${ProjectBidFragmentFragmentDoc}`;

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
export const GetProjectBidsForPoDocument = gql`
    query getProjectBidsForPo($data: GetProjectBidsForPoInput!) {
  getProjectBidsForPo(data: $data) {
    projectBidId
    companyId
    companyName
  }
}
    `;

/**
 * __useGetProjectBidsForPoQuery__
 *
 * To run a query within a React component, call `useGetProjectBidsForPoQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetProjectBidsForPoQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetProjectBidsForPoQuery({
 *   variables: {
 *      data: // value for 'data'
 *   },
 * });
 */
export function useGetProjectBidsForPoQuery(baseOptions: Apollo.QueryHookOptions<GetProjectBidsForPoQuery, GetProjectBidsForPoQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<GetProjectBidsForPoQuery, GetProjectBidsForPoQueryVariables>(GetProjectBidsForPoDocument, options);
      }
export function useGetProjectBidsForPoLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<GetProjectBidsForPoQuery, GetProjectBidsForPoQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<GetProjectBidsForPoQuery, GetProjectBidsForPoQueryVariables>(GetProjectBidsForPoDocument, options);
        }
export type GetProjectBidsForPoQueryHookResult = ReturnType<typeof useGetProjectBidsForPoQuery>;
export type GetProjectBidsForPoLazyQueryHookResult = ReturnType<typeof useGetProjectBidsForPoLazyQuery>;
export type GetProjectBidsForPoQueryResult = Apollo.QueryResult<GetProjectBidsForPoQuery, GetProjectBidsForPoQueryVariables>;