// THIS FILE IS GENERATED. DO NOT EDIT.
import * as Types from '../../../../generated/graphql';

import { gql } from '@apollo/client';
import { ProjectFragmentFragmentDoc, ProjectComponentFragmentFragmentDoc } from '../project/project.generated';
import { ProjectBidFragmentFragmentDoc } from '../bid/bid.generated';
import { FileFragmentFragmentDoc } from '../../utils/common/file.generated';
import * as Apollo from '@apollo/client';
const defaultOptions = {} as const;
export type GetCustomerProjectQueryVariables = Types.Exact<{
  data: Types.GetCustomerProjectInput;
}>;


export type GetCustomerProjectQuery = { __typename?: 'Query', getCustomerProject: { __typename?: 'CustomerProject', country: string, creationMode: Types.ProjectCreationMode, permission: Types.ProjectPermission, id: string, userId: string, companyId: string, companyName: string, name: string, category: string, totalWeight: string, deliveryDate: string, deliveryAddress: string, targetPrice: string, orderQuantities: Array<number>, status: Types.ProjectStatus, createdAt: any, updatedAt: any, components: Array<{ __typename?: 'ProjectComponent', id: string, projectId: string, name: string, designs?: Array<{ __typename?: 'ProjectDesign', fileId: string, filename: string, url: string }> | null, componentSpec: { __typename?: 'ProjectComponentSpec', id: string, productName: string, boxStyle?: string | null, style?: string | null, includeArtworkInQuote?: boolean | null, purpose?: string | null, shape?: string | null, thickness?: string | null, flute?: string | null, color?: string | null, manufacturingProcess?: string | null, material?: string | null, materialSource?: string | null, numberOfPages?: string | null, finish?: string | null, outsideMaterial?: string | null, outsideMaterialSource?: string | null, outsideFinish?: string | null, outsideColor?: string | null, insideMaterial?: string | null, insideMaterialSource?: string | null, insideFinish?: string | null, insideColor?: string | null, dimension: { __typename?: 'ProductDimension', x: string, y: string, z?: string | null }, postProcess?: Array<{ __typename?: 'PostProcessDetail', postProcessName: string, isInside?: boolean | null, printingMethod?: string | null, color?: string | null, fontSize?: string | null, numberOfColors?: { __typename?: 'PostProcessPrintingNumberOfColors', c: string, t: string } | null, estimatedArea?: { __typename?: 'ProductDimension', x: string, y: string } | null }> | null } }>, bids?: Array<{ __typename?: 'ProjectBid', id: string, userId: string, companyId: string, projectId: string, status: Types.BidStatus, createdAt: any, updatedAt: any, components: Array<{ __typename?: 'ProjectBidComponent', id: string, projectBidId: string, projectComponentId: string, samplingFee: number, toolingFee?: number | null, quantityPrices: Array<{ __typename?: 'QuantityPrice', quantity: number, price: string }> }>, remarkFile?: { __typename?: 'BidRemark', fileId: string, filename: string, url: string } | null }> | null } };

export type GetCustomerProjectsQueryVariables = Types.Exact<{
  data: Types.GetCustomerProjectsInput;
}>;


export type GetCustomerProjectsQuery = { __typename?: 'Query', getCustomerProjects: Array<{ __typename?: 'CustomerProjectOverview', id: string, userId: string, name: string, deliveryDate: string, deliveryAddress: string, targetPrice: string, orderQuantities: Array<number>, status: string, permission: Types.ProjectPermission, createdAt: any, updatedAt: any }> };

export type GetCustomerDetailQueryVariables = Types.Exact<{
  data: Types.GetCustomerDetailInput;
}>;


export type GetCustomerDetailQuery = { __typename?: 'Query', getCustomerDetail: { __typename?: 'CustomerDetail', id: string, name: string, contactEmail: string, logo?: string | null, country: string, phone: string, fax?: string | null, isVerified: boolean, isActive: boolean, companyUrl?: string | null } };

export type GetCustomerPosQueryVariables = Types.Exact<{
  data: Types.GetCustomerPosInput;
}>;


export type GetCustomerPosQuery = { __typename?: 'Query', getCustomerPos: Array<{ __typename?: 'CustomerPo', projectInfo: { __typename?: 'CustomerPoProjectInfo', projectId: string, projectName: string }, poDetails: Array<{ __typename?: 'CustomerPoDetail', projectBidId: string, vendorInfo: { __typename?: 'PoDetailVendorInfo', companyId: string, companyName: string }, poFile: { __typename?: 'PurchaseOrder', status: Types.PurchaseOrderStatus, fileId: string, filename: string, url: string }, invoiceFile?: { __typename?: 'Invoice', status: Types.InvoiceStatus, fileId: string, filename: string, url: string } | null }> }> };

export type GetPurchaseOrderQueryVariables = Types.Exact<{
  data: Types.GetPurchaseOrderInput;
}>;


export type GetPurchaseOrderQuery = { __typename?: 'Query', getPurchaseOrder?: { __typename?: 'PurchaseOrder', status: Types.PurchaseOrderStatus, fileId: string, filename: string, url: string } | null };


export const GetCustomerProjectDocument = gql`
    query getCustomerProject($data: GetCustomerProjectInput!) {
  getCustomerProject(data: $data) {
    ...ProjectFragment
    country
    creationMode
    permission
    components {
      ...ProjectComponentFragment
    }
    bids {
      ...ProjectBidFragment
    }
  }
}
    ${ProjectFragmentFragmentDoc}
${ProjectComponentFragmentFragmentDoc}
${ProjectBidFragmentFragmentDoc}`;

/**
 * __useGetCustomerProjectQuery__
 *
 * To run a query within a React component, call `useGetCustomerProjectQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetCustomerProjectQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetCustomerProjectQuery({
 *   variables: {
 *      data: // value for 'data'
 *   },
 * });
 */
export function useGetCustomerProjectQuery(baseOptions: Apollo.QueryHookOptions<GetCustomerProjectQuery, GetCustomerProjectQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<GetCustomerProjectQuery, GetCustomerProjectQueryVariables>(GetCustomerProjectDocument, options);
      }
export function useGetCustomerProjectLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<GetCustomerProjectQuery, GetCustomerProjectQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<GetCustomerProjectQuery, GetCustomerProjectQueryVariables>(GetCustomerProjectDocument, options);
        }
export type GetCustomerProjectQueryHookResult = ReturnType<typeof useGetCustomerProjectQuery>;
export type GetCustomerProjectLazyQueryHookResult = ReturnType<typeof useGetCustomerProjectLazyQuery>;
export type GetCustomerProjectQueryResult = Apollo.QueryResult<GetCustomerProjectQuery, GetCustomerProjectQueryVariables>;
export const GetCustomerProjectsDocument = gql`
    query GetCustomerProjects($data: GetCustomerProjectsInput!) {
  getCustomerProjects(data: $data) {
    id
    userId
    name
    deliveryDate
    deliveryAddress
    targetPrice
    orderQuantities
    status
    permission
    createdAt
    updatedAt
  }
}
    `;

/**
 * __useGetCustomerProjectsQuery__
 *
 * To run a query within a React component, call `useGetCustomerProjectsQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetCustomerProjectsQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetCustomerProjectsQuery({
 *   variables: {
 *      data: // value for 'data'
 *   },
 * });
 */
export function useGetCustomerProjectsQuery(baseOptions: Apollo.QueryHookOptions<GetCustomerProjectsQuery, GetCustomerProjectsQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<GetCustomerProjectsQuery, GetCustomerProjectsQueryVariables>(GetCustomerProjectsDocument, options);
      }
export function useGetCustomerProjectsLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<GetCustomerProjectsQuery, GetCustomerProjectsQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<GetCustomerProjectsQuery, GetCustomerProjectsQueryVariables>(GetCustomerProjectsDocument, options);
        }
export type GetCustomerProjectsQueryHookResult = ReturnType<typeof useGetCustomerProjectsQuery>;
export type GetCustomerProjectsLazyQueryHookResult = ReturnType<typeof useGetCustomerProjectsLazyQuery>;
export type GetCustomerProjectsQueryResult = Apollo.QueryResult<GetCustomerProjectsQuery, GetCustomerProjectsQueryVariables>;
export const GetCustomerDetailDocument = gql`
    query getCustomerDetail($data: GetCustomerDetailInput!) {
  getCustomerDetail(data: $data) {
    id
    name
    contactEmail
    logo
    country
    phone
    fax
    isVerified
    isActive
    companyUrl
  }
}
    `;

/**
 * __useGetCustomerDetailQuery__
 *
 * To run a query within a React component, call `useGetCustomerDetailQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetCustomerDetailQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetCustomerDetailQuery({
 *   variables: {
 *      data: // value for 'data'
 *   },
 * });
 */
export function useGetCustomerDetailQuery(baseOptions: Apollo.QueryHookOptions<GetCustomerDetailQuery, GetCustomerDetailQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<GetCustomerDetailQuery, GetCustomerDetailQueryVariables>(GetCustomerDetailDocument, options);
      }
export function useGetCustomerDetailLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<GetCustomerDetailQuery, GetCustomerDetailQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<GetCustomerDetailQuery, GetCustomerDetailQueryVariables>(GetCustomerDetailDocument, options);
        }
export type GetCustomerDetailQueryHookResult = ReturnType<typeof useGetCustomerDetailQuery>;
export type GetCustomerDetailLazyQueryHookResult = ReturnType<typeof useGetCustomerDetailLazyQuery>;
export type GetCustomerDetailQueryResult = Apollo.QueryResult<GetCustomerDetailQuery, GetCustomerDetailQueryVariables>;
export const GetCustomerPosDocument = gql`
    query getCustomerPos($data: GetCustomerPosInput!) {
  getCustomerPos(data: $data) {
    projectInfo {
      projectId
      projectName
    }
    poDetails {
      projectBidId
      vendorInfo {
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
 * __useGetCustomerPosQuery__
 *
 * To run a query within a React component, call `useGetCustomerPosQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetCustomerPosQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetCustomerPosQuery({
 *   variables: {
 *      data: // value for 'data'
 *   },
 * });
 */
export function useGetCustomerPosQuery(baseOptions: Apollo.QueryHookOptions<GetCustomerPosQuery, GetCustomerPosQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<GetCustomerPosQuery, GetCustomerPosQueryVariables>(GetCustomerPosDocument, options);
      }
export function useGetCustomerPosLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<GetCustomerPosQuery, GetCustomerPosQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<GetCustomerPosQuery, GetCustomerPosQueryVariables>(GetCustomerPosDocument, options);
        }
export type GetCustomerPosQueryHookResult = ReturnType<typeof useGetCustomerPosQuery>;
export type GetCustomerPosLazyQueryHookResult = ReturnType<typeof useGetCustomerPosLazyQuery>;
export type GetCustomerPosQueryResult = Apollo.QueryResult<GetCustomerPosQuery, GetCustomerPosQueryVariables>;
export const GetPurchaseOrderDocument = gql`
    query getPurchaseOrder($data: GetPurchaseOrderInput!) {
  getPurchaseOrder(data: $data) {
    ...FileFragment
    status
  }
}
    ${FileFragmentFragmentDoc}`;

/**
 * __useGetPurchaseOrderQuery__
 *
 * To run a query within a React component, call `useGetPurchaseOrderQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetPurchaseOrderQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetPurchaseOrderQuery({
 *   variables: {
 *      data: // value for 'data'
 *   },
 * });
 */
export function useGetPurchaseOrderQuery(baseOptions: Apollo.QueryHookOptions<GetPurchaseOrderQuery, GetPurchaseOrderQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<GetPurchaseOrderQuery, GetPurchaseOrderQueryVariables>(GetPurchaseOrderDocument, options);
      }
export function useGetPurchaseOrderLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<GetPurchaseOrderQuery, GetPurchaseOrderQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<GetPurchaseOrderQuery, GetPurchaseOrderQueryVariables>(GetPurchaseOrderDocument, options);
        }
export type GetPurchaseOrderQueryHookResult = ReturnType<typeof useGetPurchaseOrderQuery>;
export type GetPurchaseOrderLazyQueryHookResult = ReturnType<typeof useGetPurchaseOrderLazyQuery>;
export type GetPurchaseOrderQueryResult = Apollo.QueryResult<GetPurchaseOrderQuery, GetPurchaseOrderQueryVariables>;