// THIS FILE IS GENERATED. DO NOT EDIT.
import * as Types from '../../../../generated/graphql';

import { gql } from '@apollo/client';
import * as Apollo from '@apollo/client';
const defaultOptions = {} as const;
export type GetCustomerProjectQueryVariables = Types.Exact<{
  data: Types.GetCustomerProjectInput;
}>;


export type GetCustomerProjectQuery = { __typename?: 'Query', getCustomerProject: { __typename?: 'CustomerProject', id: string, userId: string, companyId: string, name: string, deliveryDate: string, deliveryAddress: string, budget: number, status: string, permission: Types.ProjectPermission, createdAt: string, updatedAt: string, design?: { __typename?: 'ProjectDesign', fileName: string, url: string } | null, components: Array<{ __typename?: 'ProjectComponent', id: string, projectId: string, name: string, materials: Array<string>, dimension: string, postProcess: string }>, bids?: Array<{ __typename?: 'ProjectBid', id: string, userId: string, companyId: string, createdAt: string, updatedAt: string, components: Array<{ __typename?: 'ProjectBidComponent', id: string, projectBidId: string, projectComponentId: string, quantityPrices: Array<{ __typename?: 'QuantityPrice', quantity: number, price: number }> }> } | null> | null } };

export type GetCustomerProjectsQueryVariables = Types.Exact<{
  data: Types.GetCustomerProjectsInput;
}>;


export type GetCustomerProjectsQuery = { __typename?: 'Query', getCustomerProjects: Array<{ __typename?: 'CustomerProject', id: string, userId: string, companyId: string, name: string, deliveryDate: string, deliveryAddress: string, budget: number, status: string, permission: Types.ProjectPermission, createdAt: string, updatedAt: string, design?: { __typename?: 'ProjectDesign', fileName: string, url: string } | null, components: Array<{ __typename?: 'ProjectComponent', id: string, projectId: string, name: string, materials: Array<string>, dimension: string, postProcess: string }>, bids?: Array<{ __typename?: 'ProjectBid', id: string, userId: string, companyId: string, createdAt: string, updatedAt: string, components: Array<{ __typename?: 'ProjectBidComponent', id: string, projectBidId: string, projectComponentId: string, quantityPrices: Array<{ __typename?: 'QuantityPrice', quantity: number, price: number }> }> } | null> | null }> };

export type GetEditableCustomerDetailQueryVariables = Types.Exact<{
  data: Types.GetEditableCustomerDetailInput;
}>;


export type GetEditableCustomerDetailQuery = { __typename?: 'Query', getEditableCustomerDetail: { __typename?: 'EditableCustomerDetail', name: string, contactEmail: string, phone: string, logo?: string | null, country: string, companyUrl?: string | null, fax?: string | null } };


export const GetCustomerProjectDocument = gql`
    query getCustomerProject($data: GetCustomerProjectInput!) {
  getCustomerProject(data: $data) {
    id
    userId
    companyId
    name
    deliveryDate
    deliveryAddress
    design {
      fileName
      url
    }
    budget
    status
    permission
    createdAt
    updatedAt
    components {
      id
      projectId
      name
      materials
      dimension
      postProcess
    }
    bids {
      id
      userId
      companyId
      components {
        id
        projectBidId
        projectComponentId
        quantityPrices {
          quantity
          price
        }
      }
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
    companyId
    name
    deliveryDate
    deliveryAddress
    design {
      fileName
      url
    }
    budget
    status
    permission
    createdAt
    updatedAt
    components {
      id
      projectId
      name
      materials
      dimension
      postProcess
    }
    bids {
      id
      userId
      companyId
      components {
        id
        projectBidId
        projectComponentId
        quantityPrices {
          quantity
          price
        }
      }
      createdAt
      updatedAt
    }
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
export const GetEditableCustomerDetailDocument = gql`
    query getEditableCustomerDetail($data: GetEditableCustomerDetailInput!) {
  getEditableCustomerDetail(data: $data) {
    name
    contactEmail
    phone
    logo
    country
    companyUrl
    fax
  }
}
    `;

/**
 * __useGetEditableCustomerDetailQuery__
 *
 * To run a query within a React component, call `useGetEditableCustomerDetailQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetEditableCustomerDetailQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetEditableCustomerDetailQuery({
 *   variables: {
 *      data: // value for 'data'
 *   },
 * });
 */
export function useGetEditableCustomerDetailQuery(baseOptions: Apollo.QueryHookOptions<GetEditableCustomerDetailQuery, GetEditableCustomerDetailQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<GetEditableCustomerDetailQuery, GetEditableCustomerDetailQueryVariables>(GetEditableCustomerDetailDocument, options);
      }
export function useGetEditableCustomerDetailLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<GetEditableCustomerDetailQuery, GetEditableCustomerDetailQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<GetEditableCustomerDetailQuery, GetEditableCustomerDetailQueryVariables>(GetEditableCustomerDetailDocument, options);
        }
export type GetEditableCustomerDetailQueryHookResult = ReturnType<typeof useGetEditableCustomerDetailQuery>;
export type GetEditableCustomerDetailLazyQueryHookResult = ReturnType<typeof useGetEditableCustomerDetailLazyQuery>;
export type GetEditableCustomerDetailQueryResult = Apollo.QueryResult<GetEditableCustomerDetailQuery, GetEditableCustomerDetailQueryVariables>;