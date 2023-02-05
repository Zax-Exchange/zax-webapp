// THIS FILE IS GENERATED. DO NOT EDIT.
import * as Types from '../../../../generated/graphql';

import { gql } from '@apollo/client';
import { ProjectFragmentFragmentDoc, ProjectComponentFragmentFragmentDoc } from '../project/project.generated';
import { PermissionedProjectBidFragmentFragmentDoc } from '../bid/bid.generated';
import { FileFragmentFragmentDoc } from '../../utils/common/file.generated';
import * as Apollo from '@apollo/client';
const defaultOptions = {} as const;
export type GetVendorDetailQueryVariables = Types.Exact<{
  data: Types.GetVendorDetailInput;
}>;


export type GetVendorDetailQuery = { __typename?: 'Query', getVendorDetail?: { __typename?: 'VendorDetail', id: string, name: string, contactEmail: string, phone: string, logo?: string | null, country: string, isActive: boolean, companyUrl?: string | null, fax?: string | null, isVerified: boolean, locations: Array<string>, leadTime: number, productsAndMoq: Array<{ __typename?: 'ProductAndMoq', product: string, moq: string }> } | null };

export type GetVendorProjectQueryVariables = Types.Exact<{
  data: Types.GetVendorProjectInput;
}>;


export type GetVendorProjectQuery = { __typename?: 'Query', getVendorProject?: { __typename?: 'VendorProject', id: string, userId: string, companyId: string, companyName: string, name: string, category: string, totalWeight: string, deliveryDate: string, deliveryAddress: string, targetPrice: string, orderQuantities: Array<number>, status: Types.ProjectStatus, visibility: Types.ProjectVisibility, createdAt: any, updatedAt: any, components: Array<{ __typename?: 'ProjectComponent', id: string, projectId: string, name: string, designs?: Array<{ __typename?: 'ProjectDesign', fileId: string, filename: string, url: string }> | null, componentSpec: { __typename?: 'ProjectComponentSpec', id: string, productName: string, boxStyle?: string | null, style?: string | null, includeArtworkInQuote?: boolean | null, purpose?: string | null, shape?: string | null, thickness?: string | null, flute?: string | null, color?: string | null, manufacturingProcess?: string | null, material?: string | null, materialSource?: string | null, numberOfPages?: string | null, finish?: string | null, outsideMaterial?: string | null, outsideMaterialSource?: string | null, outsideFinish?: string | null, outsideColor?: string | null, insideMaterial?: string | null, insideMaterialSource?: string | null, insideFinish?: string | null, insideColor?: string | null, dimension: { __typename?: 'ProductDimension', x: string, y: string, z?: string | null }, postProcess?: Array<{ __typename?: 'PostProcessDetail', postProcessName: string, isInside?: boolean | null, printingMethod?: string | null, color?: string | null, fontSize?: string | null, numberOfColors?: { __typename?: 'PostProcessPrintingNumberOfColors', c: string, t: string } | null, estimatedArea?: { __typename?: 'ProductDimension', x: string, y: string } | null }> | null } }>, bidInfo: { __typename?: 'PermissionedProjectBid', id: string, userId: string, companyId: string, projectId: string, status: Types.BidStatus, permission: Types.ProjectPermission, createdAt: any, updatedAt: any, components: Array<{ __typename?: 'ProjectBidComponent', id: string, projectBidId: string, projectComponentId: string, samplingFee: string, toolingFee?: string | null, quantityPrices: Array<{ __typename?: 'QuantityPrice', quantity: number, price: string }> }>, remarkFile?: { __typename?: 'BidRemark', fileId: string, filename: string, url: string } | null } } | null };

export type GetVendorProjectsQueryVariables = Types.Exact<{
  data: Types.GetVendorProjectsInput;
}>;


export type GetVendorProjectsQuery = { __typename?: 'Query', getVendorProjects: Array<{ __typename?: 'VendorProjectOverview', id: string, userId: string, bidId: string, bidStatus: Types.BidStatus, companyName: string, name: string, deliveryDate: string, deliveryAddress: string, targetPrice: string, orderQuantities: Array<number>, status: string, totalWeight: string, category: string, permission: Types.ProjectPermission, createdAt: any, updatedAt: any }> };

export type GetVendorGuestProjectsQueryVariables = Types.Exact<{
  data: Types.GetVendorGuestProjectsInput;
}>;


export type GetVendorGuestProjectsQuery = { __typename?: 'Query', getVendorGuestProjects: Array<{ __typename?: 'VendorGuestProjectOverview', id: string, name: string, deliveryDate: string, deliveryAddress: string, targetPrice: string, orderQuantities: Array<number>, status: string, totalWeight: string, category: string, permission: Types.ProjectPermission, guestEmail: string, createdAt: any, updatedAt: any }> };

export type GetVendorGuestProjectQueryVariables = Types.Exact<{
  data: Types.GetVendorGuestProjectInput;
}>;


export type GetVendorGuestProjectQuery = { __typename?: 'Query', getVendorGuestProject?: { __typename?: 'VendorGuestProject', permission: Types.ProjectPermission, guestEmail: string, id: string, userId: string, companyId: string, companyName: string, name: string, category: string, totalWeight: string, deliveryDate: string, deliveryAddress: string, targetPrice: string, orderQuantities: Array<number>, status: Types.ProjectStatus, visibility: Types.ProjectVisibility, createdAt: any, updatedAt: any, components: Array<{ __typename?: 'ProjectComponent', id: string, projectId: string, name: string, designs?: Array<{ __typename?: 'ProjectDesign', fileId: string, filename: string, url: string }> | null, componentSpec: { __typename?: 'ProjectComponentSpec', id: string, productName: string, boxStyle?: string | null, style?: string | null, includeArtworkInQuote?: boolean | null, purpose?: string | null, shape?: string | null, thickness?: string | null, flute?: string | null, color?: string | null, manufacturingProcess?: string | null, material?: string | null, materialSource?: string | null, numberOfPages?: string | null, finish?: string | null, outsideMaterial?: string | null, outsideMaterialSource?: string | null, outsideFinish?: string | null, outsideColor?: string | null, insideMaterial?: string | null, insideMaterialSource?: string | null, insideFinish?: string | null, insideColor?: string | null, dimension: { __typename?: 'ProductDimension', x: string, y: string, z?: string | null }, postProcess?: Array<{ __typename?: 'PostProcessDetail', postProcessName: string, isInside?: boolean | null, printingMethod?: string | null, color?: string | null, fontSize?: string | null, numberOfColors?: { __typename?: 'PostProcessPrintingNumberOfColors', c: string, t: string } | null, estimatedArea?: { __typename?: 'ProductDimension', x: string, y: string } | null }> | null } }> } | null };

export type SearchVendorCompaniesQueryVariables = Types.Exact<{
  data: Types.SearchVendorCompanyInput;
}>;


export type SearchVendorCompaniesQuery = { __typename?: 'Query', searchVendorCompanies: Array<{ __typename?: 'VendorSearchItem', vendor: { __typename?: 'VendorOverview', id: string, name: string, contactEmail: string, logo?: string | null, country: string, isVerified: boolean, locations: Array<string>, products: Array<string>, leadTime: number }, highlight: { __typename?: 'VendorSearchHighlight', products?: Array<string | null> | null, name?: Array<string | null> | null } }> };

export type GetVendorPosQueryVariables = Types.Exact<{
  data: Types.GetVendorPosInput;
}>;


export type GetVendorPosQuery = { __typename?: 'Query', getVendorPos: Array<{ __typename?: 'VendorPo', projectInfo: { __typename?: 'VendorPoProjectInfo', projectId: string, projectName: string }, poDetails: Array<{ __typename?: 'VendorPoDetail', projectBidId: string, customerInfo: { __typename?: 'PoDetailCustomerInfo', companyId: string, companyName: string }, poFile: { __typename?: 'PurchaseOrder', status: Types.PurchaseOrderStatus, fileId: string, filename: string, url: string }, invoiceFile?: { __typename?: 'Invoice', status: Types.InvoiceStatus, fileId: string, filename: string, url: string } | null }> }> };

export type GetInvoiceQueryVariables = Types.Exact<{
  data: Types.GetInvoiceInput;
}>;


export type GetInvoiceQuery = { __typename?: 'Query', getInvoice?: { __typename?: 'Invoice', status: Types.InvoiceStatus, fileId: string, filename: string, url: string } | null };

export type GetSearchProjectDetailQueryVariables = Types.Exact<{
  data: Types.GetSearchProjectDetailInput;
}>;


export type GetSearchProjectDetailQuery = { __typename?: 'Query', getSearchProjectDetail?: { __typename?: 'Project', country: string, id: string, userId: string, companyId: string, companyName: string, name: string, category: string, totalWeight: string, deliveryDate: string, deliveryAddress: string, targetPrice: string, orderQuantities: Array<number>, status: Types.ProjectStatus, visibility: Types.ProjectVisibility, createdAt: any, updatedAt: any, components: Array<{ __typename?: 'ProjectComponent', id: string, projectId: string, name: string, designs?: Array<{ __typename?: 'ProjectDesign', fileId: string, filename: string, url: string }> | null, componentSpec: { __typename?: 'ProjectComponentSpec', id: string, productName: string, boxStyle?: string | null, style?: string | null, includeArtworkInQuote?: boolean | null, purpose?: string | null, shape?: string | null, thickness?: string | null, flute?: string | null, color?: string | null, manufacturingProcess?: string | null, material?: string | null, materialSource?: string | null, numberOfPages?: string | null, finish?: string | null, outsideMaterial?: string | null, outsideMaterialSource?: string | null, outsideFinish?: string | null, outsideColor?: string | null, insideMaterial?: string | null, insideMaterialSource?: string | null, insideFinish?: string | null, insideColor?: string | null, dimension: { __typename?: 'ProductDimension', x: string, y: string, z?: string | null }, postProcess?: Array<{ __typename?: 'PostProcessDetail', postProcessName: string, isInside?: boolean | null, printingMethod?: string | null, color?: string | null, fontSize?: string | null, numberOfColors?: { __typename?: 'PostProcessPrintingNumberOfColors', c: string, t: string } | null, estimatedArea?: { __typename?: 'ProductDimension', x: string, y: string } | null }> | null } }> } | null };


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
    productsAndMoq {
      product
      moq
    }
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
    ...ProjectFragment
    components {
      ...ProjectComponentFragment
    }
    bidInfo {
      ...PermissionedProjectBidFragment
    }
  }
}
    ${ProjectFragmentFragmentDoc}
${ProjectComponentFragmentFragmentDoc}
${PermissionedProjectBidFragmentFragmentDoc}`;

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
export const GetVendorGuestProjectsDocument = gql`
    query getVendorGuestProjects($data: GetVendorGuestProjectsInput!) {
  getVendorGuestProjects(data: $data) {
    id
    name
    deliveryDate
    deliveryAddress
    targetPrice
    orderQuantities
    status
    totalWeight
    category
    permission
    guestEmail
    createdAt
    updatedAt
  }
}
    `;

/**
 * __useGetVendorGuestProjectsQuery__
 *
 * To run a query within a React component, call `useGetVendorGuestProjectsQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetVendorGuestProjectsQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetVendorGuestProjectsQuery({
 *   variables: {
 *      data: // value for 'data'
 *   },
 * });
 */
export function useGetVendorGuestProjectsQuery(baseOptions: Apollo.QueryHookOptions<GetVendorGuestProjectsQuery, GetVendorGuestProjectsQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<GetVendorGuestProjectsQuery, GetVendorGuestProjectsQueryVariables>(GetVendorGuestProjectsDocument, options);
      }
export function useGetVendorGuestProjectsLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<GetVendorGuestProjectsQuery, GetVendorGuestProjectsQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<GetVendorGuestProjectsQuery, GetVendorGuestProjectsQueryVariables>(GetVendorGuestProjectsDocument, options);
        }
export type GetVendorGuestProjectsQueryHookResult = ReturnType<typeof useGetVendorGuestProjectsQuery>;
export type GetVendorGuestProjectsLazyQueryHookResult = ReturnType<typeof useGetVendorGuestProjectsLazyQuery>;
export type GetVendorGuestProjectsQueryResult = Apollo.QueryResult<GetVendorGuestProjectsQuery, GetVendorGuestProjectsQueryVariables>;
export const GetVendorGuestProjectDocument = gql`
    query getVendorGuestProject($data: GetVendorGuestProjectInput!) {
  getVendorGuestProject(data: $data) {
    ...ProjectFragment
    permission
    guestEmail
    components {
      ...ProjectComponentFragment
    }
  }
}
    ${ProjectFragmentFragmentDoc}
${ProjectComponentFragmentFragmentDoc}`;

/**
 * __useGetVendorGuestProjectQuery__
 *
 * To run a query within a React component, call `useGetVendorGuestProjectQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetVendorGuestProjectQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetVendorGuestProjectQuery({
 *   variables: {
 *      data: // value for 'data'
 *   },
 * });
 */
export function useGetVendorGuestProjectQuery(baseOptions: Apollo.QueryHookOptions<GetVendorGuestProjectQuery, GetVendorGuestProjectQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<GetVendorGuestProjectQuery, GetVendorGuestProjectQueryVariables>(GetVendorGuestProjectDocument, options);
      }
export function useGetVendorGuestProjectLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<GetVendorGuestProjectQuery, GetVendorGuestProjectQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<GetVendorGuestProjectQuery, GetVendorGuestProjectQueryVariables>(GetVendorGuestProjectDocument, options);
        }
export type GetVendorGuestProjectQueryHookResult = ReturnType<typeof useGetVendorGuestProjectQuery>;
export type GetVendorGuestProjectLazyQueryHookResult = ReturnType<typeof useGetVendorGuestProjectLazyQuery>;
export type GetVendorGuestProjectQueryResult = Apollo.QueryResult<GetVendorGuestProjectQuery, GetVendorGuestProjectQueryVariables>;
export const SearchVendorCompaniesDocument = gql`
    query searchVendorCompanies($data: SearchVendorCompanyInput!) {
  searchVendorCompanies(data: $data) {
    vendor {
      id
      name
      contactEmail
      logo
      country
      isVerified
      locations
      products
      leadTime
    }
    highlight {
      products
      name
    }
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
export const GetVendorPosDocument = gql`
    query getVendorPos($data: GetVendorPosInput!) {
  getVendorPos(data: $data) {
    projectInfo {
      projectId
      projectName
    }
    poDetails {
      projectBidId
      customerInfo {
        companyId
        companyName
      }
      poFile {
        ...FileFragment
        status
      }
      invoiceFile {
        ...FileFragment
        status
      }
    }
  }
}
    ${FileFragmentFragmentDoc}`;

/**
 * __useGetVendorPosQuery__
 *
 * To run a query within a React component, call `useGetVendorPosQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetVendorPosQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetVendorPosQuery({
 *   variables: {
 *      data: // value for 'data'
 *   },
 * });
 */
export function useGetVendorPosQuery(baseOptions: Apollo.QueryHookOptions<GetVendorPosQuery, GetVendorPosQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<GetVendorPosQuery, GetVendorPosQueryVariables>(GetVendorPosDocument, options);
      }
export function useGetVendorPosLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<GetVendorPosQuery, GetVendorPosQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<GetVendorPosQuery, GetVendorPosQueryVariables>(GetVendorPosDocument, options);
        }
export type GetVendorPosQueryHookResult = ReturnType<typeof useGetVendorPosQuery>;
export type GetVendorPosLazyQueryHookResult = ReturnType<typeof useGetVendorPosLazyQuery>;
export type GetVendorPosQueryResult = Apollo.QueryResult<GetVendorPosQuery, GetVendorPosQueryVariables>;
export const GetInvoiceDocument = gql`
    query getInvoice($data: GetInvoiceInput!) {
  getInvoice(data: $data) {
    ...FileFragment
    status
  }
}
    ${FileFragmentFragmentDoc}`;

/**
 * __useGetInvoiceQuery__
 *
 * To run a query within a React component, call `useGetInvoiceQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetInvoiceQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetInvoiceQuery({
 *   variables: {
 *      data: // value for 'data'
 *   },
 * });
 */
export function useGetInvoiceQuery(baseOptions: Apollo.QueryHookOptions<GetInvoiceQuery, GetInvoiceQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<GetInvoiceQuery, GetInvoiceQueryVariables>(GetInvoiceDocument, options);
      }
export function useGetInvoiceLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<GetInvoiceQuery, GetInvoiceQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<GetInvoiceQuery, GetInvoiceQueryVariables>(GetInvoiceDocument, options);
        }
export type GetInvoiceQueryHookResult = ReturnType<typeof useGetInvoiceQuery>;
export type GetInvoiceLazyQueryHookResult = ReturnType<typeof useGetInvoiceLazyQuery>;
export type GetInvoiceQueryResult = Apollo.QueryResult<GetInvoiceQuery, GetInvoiceQueryVariables>;
export const GetSearchProjectDetailDocument = gql`
    query getSearchProjectDetail($data: GetSearchProjectDetailInput!) {
  getSearchProjectDetail(data: $data) {
    ...ProjectFragment
    country
    components {
      ...ProjectComponentFragment
    }
  }
}
    ${ProjectFragmentFragmentDoc}
${ProjectComponentFragmentFragmentDoc}`;

/**
 * __useGetSearchProjectDetailQuery__
 *
 * To run a query within a React component, call `useGetSearchProjectDetailQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetSearchProjectDetailQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetSearchProjectDetailQuery({
 *   variables: {
 *      data: // value for 'data'
 *   },
 * });
 */
export function useGetSearchProjectDetailQuery(baseOptions: Apollo.QueryHookOptions<GetSearchProjectDetailQuery, GetSearchProjectDetailQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<GetSearchProjectDetailQuery, GetSearchProjectDetailQueryVariables>(GetSearchProjectDetailDocument, options);
      }
export function useGetSearchProjectDetailLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<GetSearchProjectDetailQuery, GetSearchProjectDetailQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<GetSearchProjectDetailQuery, GetSearchProjectDetailQueryVariables>(GetSearchProjectDetailDocument, options);
        }
export type GetSearchProjectDetailQueryHookResult = ReturnType<typeof useGetSearchProjectDetailQuery>;
export type GetSearchProjectDetailLazyQueryHookResult = ReturnType<typeof useGetSearchProjectDetailLazyQuery>;
export type GetSearchProjectDetailQueryResult = Apollo.QueryResult<GetSearchProjectDetailQuery, GetSearchProjectDetailQueryVariables>;