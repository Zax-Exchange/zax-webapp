// THIS FILE IS GENERATED. DO NOT EDIT.
import * as Types from '../../../../generated/graphql';

import { gql } from '@apollo/client';
import * as Apollo from '@apollo/client';
const defaultOptions = {} as const;
export type GetVendorDetailQueryVariables = Types.Exact<{
  companyId: Types.Scalars['String'];
}>;


export type GetVendorDetailQuery = { __typename?: 'Query', getVendorDetail: { __typename?: 'VendorDetail', id: string, name: string, contactEmail: string, phone: string, logo?: string | null, country: string, isActive: boolean, companyUrl?: string | null, fax?: string | null, isVerified: boolean, locations: Array<string>, materials: Array<string>, moq: string, leadTime: number } };

export type GetVendorProjectQueryVariables = Types.Exact<{
  data: Types.GetProjectInput;
}>;


export type GetVendorProjectQuery = { __typename?: 'Query', getVendorProject: { __typename?: 'VendorProject', id: string, userId: string, customerName: string, companyId: string, name: string, deliveryDate: string, deliveryAddress: string, budget: number, status: string, createdAt: string, updatedAt: string, design?: { __typename?: 'ProjectDesign', fileName: string, url: string } | null, components: Array<{ __typename?: 'ProjectComponent', id: string, projectId: string, name: string, materials: Array<string>, dimension: string, postProcess: string }>, bidInfo: { __typename?: 'PermissionedProjectBid', id: string, companyId: string, permission: Types.ProjectPermission, createdAt: string, updatedAt: string, components: Array<{ __typename?: 'ProjectBidComponent', projectComponentId: string, quantityPrices: Array<{ __typename?: 'QuantityPrice', quantity: number, price: number }> }> } } };

export type GetVendorProjectsQueryVariables = Types.Exact<{
  userId: Types.Scalars['String'];
}>;


export type GetVendorProjectsQuery = { __typename?: 'Query', getVendorProjects: Array<{ __typename?: 'VendorProject', id: string, userId: string, companyId: string, customerName: string, name: string, deliveryDate: string, deliveryAddress: string, budget: number, status: string, permission: Types.ProjectPermission, createdAt: string, updatedAt: string, bidInfo: { __typename?: 'PermissionedProjectBid', id: string, companyId: string, permission: Types.ProjectPermission, createdAt: string, updatedAt: string, components: Array<{ __typename?: 'ProjectBidComponent', projectComponentId: string, quantityPrices: Array<{ __typename?: 'QuantityPrice', quantity: number, price: number }> }> }, components: Array<{ __typename?: 'ProjectComponent', id: string, name: string, materials: Array<string>, dimension: string, postProcess: string }>, design?: { __typename?: 'ProjectDesign', fileName: string, url: string } | null }> };

export type SearchVendorCompaniesQueryVariables = Types.Exact<{
  searchInput: Types.SearchCompanyInput;
}>;


export type SearchVendorCompaniesQuery = { __typename?: 'Query', searchVendorCompanies: Array<{ __typename?: 'VendorOverview', id: string, name: string, logo?: string | null, country: string, isVerified: boolean, locations: Array<string>, materials: Array<string>, moq: string, leadTime: number }> };


export const GetVendorDetailDocument = gql`
    query getVendorDetail($companyId: String!) {
  getVendorDetail(companyId: $companyId) {
    id
    name
    contactEmail
    phone
    logo
    country
    isActive
    companyUrl
    fax
    isVerified
    locations
    materials
    moq
    leadTime
  }
}
    `;

/**
 * __useGetVendorDetailQuery__
 *
 * To run a query within a React component, call `useGetVendorDetailQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetVendorDetailQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetVendorDetailQuery({
 *   variables: {
 *      companyId: // value for 'companyId'
 *   },
 * });
 */
export function useGetVendorDetailQuery(baseOptions: Apollo.QueryHookOptions<GetVendorDetailQuery, GetVendorDetailQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<GetVendorDetailQuery, GetVendorDetailQueryVariables>(GetVendorDetailDocument, options);
      }
export function useGetVendorDetailLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<GetVendorDetailQuery, GetVendorDetailQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<GetVendorDetailQuery, GetVendorDetailQueryVariables>(GetVendorDetailDocument, options);
        }
export type GetVendorDetailQueryHookResult = ReturnType<typeof useGetVendorDetailQuery>;
export type GetVendorDetailLazyQueryHookResult = ReturnType<typeof useGetVendorDetailLazyQuery>;
export type GetVendorDetailQueryResult = Apollo.QueryResult<GetVendorDetailQuery, GetVendorDetailQueryVariables>;
export const GetVendorProjectDocument = gql`
    query getVendorProject($data: GetProjectInput!) {
  getVendorProject(data: $data) {
    id
    userId
    customerName
    companyId
    name
    deliveryDate
    deliveryAddress
    budget
    status
    design {
      fileName
      url
    }
    components {
      id
      projectId
      name
      materials
      dimension
      postProcess
    }
    bidInfo {
      id
      companyId
      permission
      components {
        projectComponentId
        quantityPrices {
          quantity
          price
        }
      }
      createdAt
      updatedAt
    }
    createdAt
    updatedAt
  }
}
    `;

/**
 * __useGetVendorProjectQuery__
 *
 * To run a query within a React component, call `useGetVendorProjectQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetVendorProjectQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetVendorProjectQuery({
 *   variables: {
 *      data: // value for 'data'
 *   },
 * });
 */
export function useGetVendorProjectQuery(baseOptions: Apollo.QueryHookOptions<GetVendorProjectQuery, GetVendorProjectQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<GetVendorProjectQuery, GetVendorProjectQueryVariables>(GetVendorProjectDocument, options);
      }
export function useGetVendorProjectLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<GetVendorProjectQuery, GetVendorProjectQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<GetVendorProjectQuery, GetVendorProjectQueryVariables>(GetVendorProjectDocument, options);
        }
export type GetVendorProjectQueryHookResult = ReturnType<typeof useGetVendorProjectQuery>;
export type GetVendorProjectLazyQueryHookResult = ReturnType<typeof useGetVendorProjectLazyQuery>;
export type GetVendorProjectQueryResult = Apollo.QueryResult<GetVendorProjectQuery, GetVendorProjectQueryVariables>;
export const GetVendorProjectsDocument = gql`
    query getVendorProjects($userId: String!) {
  getVendorProjects(userId: $userId) {
    bidInfo {
      id
      companyId
      permission
      components {
        projectComponentId
        quantityPrices {
          quantity
          price
        }
      }
      createdAt
      updatedAt
    }
    components {
      id
      name
      materials
      dimension
      postProcess
    }
    id
    userId
    companyId
    customerName
    name
    deliveryDate
    deliveryAddress
    budget
    design {
      fileName
      url
    }
    status
    permission
    createdAt
    updatedAt
  }
}
    `;

/**
 * __useGetVendorProjectsQuery__
 *
 * To run a query within a React component, call `useGetVendorProjectsQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetVendorProjectsQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetVendorProjectsQuery({
 *   variables: {
 *      userId: // value for 'userId'
 *   },
 * });
 */
export function useGetVendorProjectsQuery(baseOptions: Apollo.QueryHookOptions<GetVendorProjectsQuery, GetVendorProjectsQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<GetVendorProjectsQuery, GetVendorProjectsQueryVariables>(GetVendorProjectsDocument, options);
      }
export function useGetVendorProjectsLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<GetVendorProjectsQuery, GetVendorProjectsQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<GetVendorProjectsQuery, GetVendorProjectsQueryVariables>(GetVendorProjectsDocument, options);
        }
export type GetVendorProjectsQueryHookResult = ReturnType<typeof useGetVendorProjectsQuery>;
export type GetVendorProjectsLazyQueryHookResult = ReturnType<typeof useGetVendorProjectsLazyQuery>;
export type GetVendorProjectsQueryResult = Apollo.QueryResult<GetVendorProjectsQuery, GetVendorProjectsQueryVariables>;
export const SearchVendorCompaniesDocument = gql`
    query searchVendorCompanies($searchInput: SearchCompanyInput!) {
  searchVendorCompanies(searchInput: $searchInput) {
    id
    name
    logo
    country
    isVerified
    locations
    materials
    moq
    leadTime
  }
}
    `;

/**
 * __useSearchVendorCompaniesQuery__
 *
 * To run a query within a React component, call `useSearchVendorCompaniesQuery` and pass it any options that fit your needs.
 * When your component renders, `useSearchVendorCompaniesQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useSearchVendorCompaniesQuery({
 *   variables: {
 *      searchInput: // value for 'searchInput'
 *   },
 * });
 */
export function useSearchVendorCompaniesQuery(baseOptions: Apollo.QueryHookOptions<SearchVendorCompaniesQuery, SearchVendorCompaniesQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<SearchVendorCompaniesQuery, SearchVendorCompaniesQueryVariables>(SearchVendorCompaniesDocument, options);
      }
export function useSearchVendorCompaniesLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<SearchVendorCompaniesQuery, SearchVendorCompaniesQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<SearchVendorCompaniesQuery, SearchVendorCompaniesQueryVariables>(SearchVendorCompaniesDocument, options);
        }
export type SearchVendorCompaniesQueryHookResult = ReturnType<typeof useSearchVendorCompaniesQuery>;
export type SearchVendorCompaniesLazyQueryHookResult = ReturnType<typeof useSearchVendorCompaniesLazyQuery>;
export type SearchVendorCompaniesQueryResult = Apollo.QueryResult<SearchVendorCompaniesQuery, SearchVendorCompaniesQueryVariables>;