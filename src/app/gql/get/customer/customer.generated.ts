// THIS FILE IS GENERATED. DO NOT EDIT.
import * as Types from '../../../../generated/graphql';

import { gql } from '@apollo/client';
import * as Apollo from '@apollo/client';
const defaultOptions = {} as const;
export type GetCustomerProjectQueryVariables = Types.Exact<{
  data: Types.GetCustomerProjectInput;
}>;


export type GetCustomerProjectQuery = { __typename?: 'Query', getCustomerProject: { __typename?: 'CustomerProject', id: string, userId: string, companyId: string, creationMode: Types.ProjectCreationMode, name: string, category: string, totalWeight: string, deliveryDate: string, deliveryAddress: string, targetPrice: string, orderQuantities: Array<number>, comments: string, status: string, permission: Types.ProjectPermission, createdAt: any, updatedAt: any, components: Array<{ __typename?: 'ProjectComponent', id: string, projectId: string, name: string, designs?: Array<{ __typename?: 'ProjectDesign', designId: string, filename: string, url: string }> | null, componentSpec: { __typename?: 'ProjectComponentSpec', id: string, productName: string, boxStyle?: string | null, style?: string | null, includeArtworkInQuote?: boolean | null, purpose?: string | null, shape?: string | null, thickness?: string | null, flute?: string | null, color?: string | null, manufacturingProcess?: string | null, material?: string | null, materialSource?: string | null, finish?: string | null, outsideMaterial?: string | null, outsideMaterialSource?: string | null, outsideFinish?: string | null, outsideColor?: string | null, insideMaterial?: string | null, insideMaterialSource?: string | null, insideFinish?: string | null, insideColor?: string | null, dimension: { __typename?: 'ProductDimension', x: string, y: string, z?: string | null }, postProcess?: Array<{ __typename?: 'PostProcessDetail', postProcessName: string, isInside?: boolean | null, printingMethod?: string | null, numberOfColors?: string | null, color?: string | null, fontSize?: string | null, estimatedArea?: { __typename?: 'ProductDimension', x: string, y: string } | null }> | null } }>, bids?: Array<{ __typename?: 'ProjectBid', id: string, userId: string, companyId: string, projectId: string, comments: string, status: Types.BidStatus, createdAt: any, updatedAt: any, components: Array<{ __typename?: 'ProjectBidComponent', id: string, projectBidId: string, projectComponentId: string, samplingFee: number, quantityPrices: Array<{ __typename?: 'QuantityPrice', quantity: number, price: string }> }> }> | null } };

export type GetCustomerProjectsQueryVariables = Types.Exact<{
  data: Types.GetCustomerProjectsInput;
}>;


export type GetCustomerProjectsQuery = { __typename?: 'Query', getCustomerProjects: Array<{ __typename?: 'CustomerProjectOverview', id: string, userId: string, name: string, deliveryDate: string, deliveryAddress: string, targetPrice: string, orderQuantities: Array<number>, status: string, permission: Types.ProjectPermission, createdAt: any, updatedAt: any }> };

export type GetCustomerDetailQueryVariables = Types.Exact<{
  data: Types.GetCustomerDetailInput;
}>;


export type GetCustomerDetailQuery = { __typename?: 'Query', getCustomerDetail: { __typename?: 'CustomerDetail', id: string, name: string, contactEmail: string, logo?: string | null, country: string, phone: string, fax?: string | null, isVerified: boolean, isActive: boolean, companyUrl?: string | null } };


export const GetCustomerProjectDocument = gql`
    query getCustomerProject($data: GetCustomerProjectInput!) {
  getCustomerProject(data: $data) {
    id
    userId
    companyId
    creationMode
    name
    category
    totalWeight
    deliveryDate
    deliveryAddress
    targetPrice
    orderQuantities
    comments
    status
    permission
    createdAt
    updatedAt
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
        dimension {
          x
          y
          z
        }
        boxStyle
        style
        includeArtworkInQuote
        purpose
        shape
        thickness
        flute
        color
        manufacturingProcess
        material
        materialSource
        postProcess {
          postProcessName
          isInside
          printingMethod
          numberOfColors
          color
          estimatedArea {
            x
            y
          }
          fontSize
        }
        finish
        outsideMaterial
        outsideMaterialSource
        outsideFinish
        outsideColor
        insideMaterial
        insideMaterialSource
        insideFinish
        insideColor
      }
    }
    bids {
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
}
    `;

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