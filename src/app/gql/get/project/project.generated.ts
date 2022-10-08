// THIS FILE IS GENERATED. DO NOT EDIT.
import * as Types from '../../../../generated/graphql';

import { gql } from '@apollo/client';
import * as Apollo from '@apollo/client';
const defaultOptions = {} as const;
export type GetProjectUsersQueryVariables = Types.Exact<{
  data: Types.GetProjectUsersInput;
}>;


export type GetProjectUsersQuery = { __typename?: 'Query', getProjectUsers: Array<{ __typename?: 'UserProjectPermission', userId: string, name: string, email: string, permission: Types.ProjectPermission }> };

export type GetProjectDetailQueryVariables = Types.Exact<{
  data: Types.GetProjectDetailInput;
}>;


export type GetProjectDetailQuery = { __typename?: 'Query', getProjectDetail?: { __typename?: 'Project', id: string, userId: string, companyName: string, companyId: string, name: string, deliveryDate: string, deliveryAddress: string, targetPrice: number, orderQuantities: Array<number>, status: string, createdAt: string, updatedAt: string, design?: Array<{ __typename?: 'ProjectDesign', fileName: string, url: string }> | null, components: Array<{ __typename?: 'ProjectComponent', id: string, projectId: string, name: string, componentSpec: { __typename?: 'ProjectComponentSpec', id: string, productName: string, boxStyle?: string | null, style?: string | null, dimension: string, thickness?: string | null, flute?: string | null, color?: string | null, manufacturingProcess?: string | null, material?: string | null, materialSource?: string | null, postProcess?: Array<string> | null, finish?: string | null, outsideMaterial?: string | null, outsideMaterialSource?: string | null, outsidePostProcess?: Array<string> | null, outsideFinish?: string | null, outsideColor?: string | null, insideMaterial?: string | null, insideMaterialSource?: string | null, insidePostProcess?: Array<string> | null, insideFinish?: string | null, insideColor?: string | null } }> } | null };

export type SearchCustomerProjectsQueryVariables = Types.Exact<{
  data: Types.SearchCustomerProjectInput;
}>;


export type SearchCustomerProjectsQuery = { __typename?: 'Query', searchCustomerProjects: Array<{ __typename?: 'ProjectOverview', name: string, companyName: string, category: string, products: Array<string>, id: string, companyId: string, deliveryDate: string, deliveryAddress: string, targetPrice: number, orderQuantities: Array<number>, createdAt: string }> };


export const GetProjectUsersDocument = gql`
    query getProjectUsers($data: GetProjectUsersInput!) {
  getProjectUsers(data: $data) {
    userId
    name
    email
    permission
  }
}
    `;

/**
 * __useGetProjectUsersQuery__
 *
 * To run a query within a React component, call `useGetProjectUsersQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetProjectUsersQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetProjectUsersQuery({
 *   variables: {
 *      data: // value for 'data'
 *   },
 * });
 */
export function useGetProjectUsersQuery(baseOptions: Apollo.QueryHookOptions<GetProjectUsersQuery, GetProjectUsersQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<GetProjectUsersQuery, GetProjectUsersQueryVariables>(GetProjectUsersDocument, options);
      }
export function useGetProjectUsersLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<GetProjectUsersQuery, GetProjectUsersQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<GetProjectUsersQuery, GetProjectUsersQueryVariables>(GetProjectUsersDocument, options);
        }
export type GetProjectUsersQueryHookResult = ReturnType<typeof useGetProjectUsersQuery>;
export type GetProjectUsersLazyQueryHookResult = ReturnType<typeof useGetProjectUsersLazyQuery>;
export type GetProjectUsersQueryResult = Apollo.QueryResult<GetProjectUsersQuery, GetProjectUsersQueryVariables>;
export const GetProjectDetailDocument = gql`
    query getProjectDetail($data: GetProjectDetailInput!) {
  getProjectDetail(data: $data) {
    id
    userId
    companyName
    companyId
    name
    deliveryDate
    deliveryAddress
    targetPrice
    orderQuantities
    design {
      fileName
      url
    }
    status
    components {
      id
      projectId
      name
      componentSpec {
        id
        productName
        boxStyle
        style
        dimension
        productName
        dimension
        thickness
        flute
        color
        manufacturingProcess
        material
        materialSource
        postProcess
        finish
        outsideMaterial
        outsideMaterialSource
        outsidePostProcess
        outsideFinish
        outsideColor
        insideMaterial
        insideMaterialSource
        insidePostProcess
        insideFinish
        insideColor
      }
    }
    createdAt
    updatedAt
  }
}
    `;

/**
 * __useGetProjectDetailQuery__
 *
 * To run a query within a React component, call `useGetProjectDetailQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetProjectDetailQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetProjectDetailQuery({
 *   variables: {
 *      data: // value for 'data'
 *   },
 * });
 */
export function useGetProjectDetailQuery(baseOptions: Apollo.QueryHookOptions<GetProjectDetailQuery, GetProjectDetailQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<GetProjectDetailQuery, GetProjectDetailQueryVariables>(GetProjectDetailDocument, options);
      }
export function useGetProjectDetailLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<GetProjectDetailQuery, GetProjectDetailQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<GetProjectDetailQuery, GetProjectDetailQueryVariables>(GetProjectDetailDocument, options);
        }
export type GetProjectDetailQueryHookResult = ReturnType<typeof useGetProjectDetailQuery>;
export type GetProjectDetailLazyQueryHookResult = ReturnType<typeof useGetProjectDetailLazyQuery>;
export type GetProjectDetailQueryResult = Apollo.QueryResult<GetProjectDetailQuery, GetProjectDetailQueryVariables>;
export const SearchCustomerProjectsDocument = gql`
    query searchCustomerProjects($data: SearchCustomerProjectInput!) {
  searchCustomerProjects(data: $data) {
    name
    companyName
    category
    products
    id
    companyId
    deliveryDate
    deliveryAddress
    targetPrice
    orderQuantities
    createdAt
  }
}
    `;

/**
 * __useSearchCustomerProjectsQuery__
 *
 * To run a query within a React component, call `useSearchCustomerProjectsQuery` and pass it any options that fit your needs.
 * When your component renders, `useSearchCustomerProjectsQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useSearchCustomerProjectsQuery({
 *   variables: {
 *      data: // value for 'data'
 *   },
 * });
 */
export function useSearchCustomerProjectsQuery(baseOptions: Apollo.QueryHookOptions<SearchCustomerProjectsQuery, SearchCustomerProjectsQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<SearchCustomerProjectsQuery, SearchCustomerProjectsQueryVariables>(SearchCustomerProjectsDocument, options);
      }
export function useSearchCustomerProjectsLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<SearchCustomerProjectsQuery, SearchCustomerProjectsQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<SearchCustomerProjectsQuery, SearchCustomerProjectsQueryVariables>(SearchCustomerProjectsDocument, options);
        }
export type SearchCustomerProjectsQueryHookResult = ReturnType<typeof useSearchCustomerProjectsQuery>;
export type SearchCustomerProjectsLazyQueryHookResult = ReturnType<typeof useSearchCustomerProjectsLazyQuery>;
export type SearchCustomerProjectsQueryResult = Apollo.QueryResult<SearchCustomerProjectsQuery, SearchCustomerProjectsQueryVariables>;