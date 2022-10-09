// THIS FILE IS GENERATED. DO NOT EDIT.
import * as Types from '../../../../generated/graphql';

import { gql } from '@apollo/client';
import * as Apollo from '@apollo/client';
const defaultOptions = {} as const;
export type GetVendorDetailQueryVariables = Types.Exact<{
  data: Types.GetVendorDetailInput;
}>;


export type GetVendorDetailQuery = { __typename?: 'Query', getVendorDetail?: { __typename?: 'VendorDetail', id: string, name: string, contactEmail: string, phone: string, logo?: string | null, country: string, isActive: boolean, companyUrl?: string | null, fax?: string | null, isVerified: boolean, locations: Array<string>, products: Array<string>, moq: string, leadTime: number } | null };

export type GetVendorProjectQueryVariables = Types.Exact<{
  data: Types.GetVendorProjectInput;
}>;


export type GetVendorProjectQuery = { __typename?: 'Query', getVendorProject?: { __typename?: 'VendorProject', id: string, userId: string, companyName: string, companyId: string, name: string, category: string, totalWeight: string, deliveryDate: string, deliveryAddress: string, targetPrice: number, orderQuantities: Array<number>, status: string, createdAt: string, updatedAt: string, components: Array<{ __typename?: 'ProjectComponent', id: string, projectId: string, name: string, designs?: Array<{ __typename?: 'ProjectDesign', designId: string, filename: string, url: string }> | null, componentSpec: { __typename?: 'ProjectComponentSpec', id: string, productName: string, dimension: string, boxStyle?: string | null, style?: string | null, thickness?: string | null, flute?: string | null, color?: string | null, manufacturingProcess?: string | null, material?: string | null, materialSource?: string | null, postProcess?: Array<string> | null, finish?: string | null, outsideMaterial?: string | null, outsideMaterialSource?: string | null, outsidePostProcess?: Array<string> | null, outsideFinish?: string | null, outsideColor?: string | null, insideMaterial?: string | null, insideMaterialSource?: string | null, insidePostProcess?: Array<string> | null, insideFinish?: string | null, insideColor?: string | null } }>, bidInfo: { __typename?: 'PermissionedProjectBid', id: string, companyId: string, permission: Types.ProjectPermission, createdAt: string, updatedAt: string, components: Array<{ __typename?: 'ProjectBidComponent', projectComponentId: string, quantityPrices: Array<{ __typename?: 'QuantityPrice', quantity: number, price: number }> }> } } | null };

export type GetVendorProjectsQueryVariables = Types.Exact<{
  data: Types.GetVendorProjectsInput;
}>;


export type GetVendorProjectsQuery = { __typename?: 'Query', getVendorProjects: Array<{ __typename?: 'VendorProjectOverview', id: string, userId: string, bidId: string, bidStatus: Types.BidStatus, companyName: string, name: string, deliveryDate: string, deliveryAddress: string, targetPrice: number, orderQuantities: Array<number>, status: string, totalWeight: string, category: string, permission: Types.ProjectPermission, createdAt: string, updatedAt: string }> };

export type SearchVendorCompaniesQueryVariables = Types.Exact<{
  data: Types.SearchVendorCompanyInput;
}>;


export type SearchVendorCompaniesQuery = { __typename?: 'Query', searchVendorCompanies: Array<{ __typename?: 'VendorOverview', id: string, name: string, contactEmail: string, logo?: string | null, country: string, isVerified: boolean, locations: Array<string>, products: Array<string>, moq: string, leadTime: number }> };


export const GetVendorDetailDocument = gql`
    query getVendorDetail($data: GetVendorDetailInput!) {
  getVendorDetail(data: $data) {
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
    products
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
 *      data: // value for 'data'
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
    query getVendorProject($data: GetVendorProjectInput!) {
  getVendorProject(data: $data) {
    id
    userId
    companyName
    companyId
    name
    category
    totalWeight
    deliveryDate
    deliveryAddress
    targetPrice
    orderQuantities
    status
    components {
      id
      projectId
      name
      designs {
        designId
        filename
        url
      }
      componentSpec {
        id
        productName
        dimension
        boxStyle
        style
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
    query getVendorProjects($data: GetVendorProjectsInput!) {
  getVendorProjects(data: $data) {
    id
    userId
    bidId
    bidStatus
    companyName
    name
    deliveryDate
    deliveryAddress
    targetPrice
    orderQuantities
    status
    totalWeight
    category
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
 *      data: // value for 'data'
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
    query searchVendorCompanies($data: SearchVendorCompanyInput!) {
  searchVendorCompanies(data: $data) {
    id
    name
    contactEmail
    logo
    country
    isVerified
    locations
    products
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
 *      data: // value for 'data'
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