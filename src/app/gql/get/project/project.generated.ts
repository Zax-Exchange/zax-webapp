// THIS FILE IS GENERATED. DO NOT EDIT.
import * as Types from '../../../../generated/graphql';

import { gql } from '@apollo/client';
import * as Apollo from '@apollo/client';
const defaultOptions = {} as const;
export type ProjectComponentFragmentFragment = { __typename?: 'ProjectComponent', id: string, projectId: string, name: string, designs?: Array<{ __typename?: 'ProjectDesign', fileId: string, filename: string, url: string }> | null, componentSpec: { __typename?: 'ProjectComponentSpec', id: string, productName: string, boxStyle?: string | null, style?: string | null, includeArtworkInQuote?: boolean | null, purpose?: string | null, shape?: string | null, thickness?: string | null, flute?: string | null, color?: string | null, manufacturingProcess?: string | null, material?: string | null, materialSource?: string | null, numberOfPages?: string | null, finish?: string | null, outsideMaterial?: string | null, outsideMaterialSource?: string | null, outsideFinish?: string | null, outsideColor?: string | null, insideMaterial?: string | null, insideMaterialSource?: string | null, insideFinish?: string | null, insideColor?: string | null, dimension: { __typename?: 'ProductDimension', x: string, y: string, z?: string | null }, postProcess?: Array<{ __typename?: 'PostProcessDetail', postProcessName: string, isInside?: boolean | null, printingMethod?: string | null, color?: string | null, fontSize?: string | null, numberOfColors?: { __typename?: 'PostProcessPrintingNumberOfColors', c: string, t: string } | null, estimatedArea?: { __typename?: 'ProductDimension', x: string, y: string } | null }> | null } };

export type ProjectFragment_CustomerProject_Fragment = { __typename?: 'CustomerProject', id: string, userId: string, companyId: string, companyName: string, name: string, category: string, totalWeight: string, deliveryDate: string, deliveryAddress: string, targetPrice: string, orderQuantities: Array<number>, comments: string, status: Types.ProjectStatus, createdAt: any, updatedAt: any };

export type ProjectFragment_PermissionedProject_Fragment = { __typename?: 'PermissionedProject', id: string, userId: string, companyId: string, companyName: string, name: string, category: string, totalWeight: string, deliveryDate: string, deliveryAddress: string, targetPrice: string, orderQuantities: Array<number>, comments: string, status: Types.ProjectStatus, createdAt: any, updatedAt: any };

export type ProjectFragment_Project_Fragment = { __typename?: 'Project', id: string, userId: string, companyId: string, companyName: string, name: string, category: string, totalWeight: string, deliveryDate: string, deliveryAddress: string, targetPrice: string, orderQuantities: Array<number>, comments: string, status: Types.ProjectStatus, createdAt: any, updatedAt: any };

export type ProjectFragment_VendorProject_Fragment = { __typename?: 'VendorProject', id: string, userId: string, companyId: string, companyName: string, name: string, category: string, totalWeight: string, deliveryDate: string, deliveryAddress: string, targetPrice: string, orderQuantities: Array<number>, comments: string, status: Types.ProjectStatus, createdAt: any, updatedAt: any };

export type ProjectFragmentFragment = ProjectFragment_CustomerProject_Fragment | ProjectFragment_PermissionedProject_Fragment | ProjectFragment_Project_Fragment | ProjectFragment_VendorProject_Fragment;

export type GetProjectUsersQueryVariables = Types.Exact<{
  data: Types.GetProjectUsersInput;
}>;


export type GetProjectUsersQuery = { __typename?: 'Query', getProjectUsers: Array<{ __typename?: 'UserProjectPermission', userId: string, name: string, email: string, permission: Types.ProjectPermission }> };

export type GetProjectChangelogQueryVariables = Types.Exact<{
  data: Types.GetProjectChangelogInput;
}>;


export type GetProjectChangelogQuery = { __typename?: 'Query', getProjectChangelog: Array<{ __typename?: 'ProjectChangelog', projectId: string, changedAt: any, changes: Array<{ __typename?: 'ProjectPropertyChange', propertyName: string, oldValue?: any | null, newValue?: any | null }> }> };

export type GetProjectDetailQueryVariables = Types.Exact<{
  data: Types.GetProjectDetailInput;
}>;


export type GetProjectDetailQuery = { __typename?: 'Query', getProjectDetail?: { __typename?: 'Project', id: string, userId: string, companyId: string, companyName: string, name: string, category: string, totalWeight: string, deliveryDate: string, deliveryAddress: string, targetPrice: string, orderQuantities: Array<number>, comments: string, status: Types.ProjectStatus, createdAt: any, updatedAt: any, components: Array<{ __typename?: 'ProjectComponent', id: string, projectId: string, name: string, designs?: Array<{ __typename?: 'ProjectDesign', fileId: string, filename: string, url: string }> | null, componentSpec: { __typename?: 'ProjectComponentSpec', id: string, productName: string, boxStyle?: string | null, style?: string | null, includeArtworkInQuote?: boolean | null, purpose?: string | null, shape?: string | null, thickness?: string | null, flute?: string | null, color?: string | null, manufacturingProcess?: string | null, material?: string | null, materialSource?: string | null, numberOfPages?: string | null, finish?: string | null, outsideMaterial?: string | null, outsideMaterialSource?: string | null, outsideFinish?: string | null, outsideColor?: string | null, insideMaterial?: string | null, insideMaterialSource?: string | null, insideFinish?: string | null, insideColor?: string | null, dimension: { __typename?: 'ProductDimension', x: string, y: string, z?: string | null }, postProcess?: Array<{ __typename?: 'PostProcessDetail', postProcessName: string, isInside?: boolean | null, printingMethod?: string | null, color?: string | null, fontSize?: string | null, numberOfColors?: { __typename?: 'PostProcessPrintingNumberOfColors', c: string, t: string } | null, estimatedArea?: { __typename?: 'ProductDimension', x: string, y: string } | null }> | null } }> } | null };

export type SearchCustomerProjectsQueryVariables = Types.Exact<{
  data: Types.SearchCustomerProjectInput;
}>;


export type SearchCustomerProjectsQuery = { __typename?: 'Query', searchCustomerProjects: Array<{ __typename?: 'ProjectOverview', name: string, companyName: string, category: string, products: Array<string>, id: string, companyId: string, deliveryDate: string, deliveryAddress: string, targetPrice: string, orderQuantities: Array<number>, createdAt: any }> };

export const ProjectComponentFragmentFragmentDoc = gql`
    fragment ProjectComponentFragment on ProjectComponent {
  id
  projectId
  name
  designs {
    fileId
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
    numberOfPages
    postProcess {
      postProcessName
      isInside
      printingMethod
      numberOfColors {
        c
        t
      }
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
    `;
export const ProjectFragmentFragmentDoc = gql`
    fragment ProjectFragment on ProjectInterface {
  id
  userId
  companyId
  companyName
  name
  category
  totalWeight
  deliveryDate
  deliveryAddress
  targetPrice
  orderQuantities
  comments
  status
  createdAt
  updatedAt
}
    `;
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
export const GetProjectChangelogDocument = gql`
    query getProjectChangelog($data: GetProjectChangelogInput!) {
  getProjectChangelog(data: $data) {
    projectId
    changedAt
    changes {
      propertyName
      oldValue
      newValue
    }
  }
}
    `;

/**
 * __useGetProjectChangelogQuery__
 *
 * To run a query within a React component, call `useGetProjectChangelogQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetProjectChangelogQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetProjectChangelogQuery({
 *   variables: {
 *      data: // value for 'data'
 *   },
 * });
 */
export function useGetProjectChangelogQuery(baseOptions: Apollo.QueryHookOptions<GetProjectChangelogQuery, GetProjectChangelogQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<GetProjectChangelogQuery, GetProjectChangelogQueryVariables>(GetProjectChangelogDocument, options);
      }
export function useGetProjectChangelogLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<GetProjectChangelogQuery, GetProjectChangelogQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<GetProjectChangelogQuery, GetProjectChangelogQueryVariables>(GetProjectChangelogDocument, options);
        }
export type GetProjectChangelogQueryHookResult = ReturnType<typeof useGetProjectChangelogQuery>;
export type GetProjectChangelogLazyQueryHookResult = ReturnType<typeof useGetProjectChangelogLazyQuery>;
export type GetProjectChangelogQueryResult = Apollo.QueryResult<GetProjectChangelogQuery, GetProjectChangelogQueryVariables>;
export const GetProjectDetailDocument = gql`
    query getProjectDetail($data: GetProjectDetailInput!) {
  getProjectDetail(data: $data) {
    ...ProjectFragment
    components {
      ...ProjectComponentFragment
    }
  }
}
    ${ProjectFragmentFragmentDoc}
${ProjectComponentFragmentFragmentDoc}`;

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