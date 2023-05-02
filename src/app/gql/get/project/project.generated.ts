// THIS FILE IS GENERATED. DO NOT EDIT.
import * as Types from '../../../../generated/graphql';

import { gql } from '@apollo/client';
import { FileFragmentFragmentDoc } from '../../utils/common/file.generated';
import * as Apollo from '@apollo/client';
const defaultOptions = {} as const;
export type ProjectComponentFragmentFragment = { __typename?: 'ProjectComponent', id: string, projectId: string, name: string, designs?: Array<{ __typename?: 'ProjectDesign', fileId: string, filename: string, url: string }> | null, componentSpec: { __typename?: 'ProjectComponentSpec', id: string, productName: string, boxStyle?: string | null, style?: string | null, includeArtworkInQuote?: boolean | null, purpose?: string | null, shape?: string | null, thickness?: string | null, flute?: string | null, color?: string | null, manufacturingProcess?: string | null, material?: string | null, materialSource?: string | null, numberOfPages?: string | null, finish?: string | null, outsideMaterial?: string | null, outsideMaterialSource?: string | null, outsideFinish?: string | null, outsideColor?: string | null, insideMaterial?: string | null, insideMaterialSource?: string | null, insideFinish?: string | null, insideColor?: string | null, dimension: { __typename?: 'ProductDimension', x: string, y: string, z?: string | null }, postProcess?: Array<{ __typename?: 'PostProcessDetail', postProcessName: string, isInside?: boolean | null, printingMethod?: string | null, color?: string | null, fontSize?: string | null, numberOfColors?: { __typename?: 'PostProcessPrintingNumberOfColors', c: string, t: string } | null, estimatedArea?: { __typename?: 'ProductDimension', x: string, y: string } | null }> | null } };

export type ProjectFragment_CustomerProject_Fragment = { __typename?: 'CustomerProject', id: string, userId: string, companyId: string, companyName: string, name: string, category: string, totalWeight: string, deliveryDate: string, deliveryAddress: string, targetPrice: string, orderQuantities: Array<number>, status: Types.ProjectStatus, visibility: Types.ProjectVisibility, createdAt: any, updatedAt: any };

export type ProjectFragment_PermissionedProject_Fragment = { __typename?: 'PermissionedProject', id: string, userId: string, companyId: string, companyName: string, name: string, category: string, totalWeight: string, deliveryDate: string, deliveryAddress: string, targetPrice: string, orderQuantities: Array<number>, status: Types.ProjectStatus, visibility: Types.ProjectVisibility, createdAt: any, updatedAt: any };

export type ProjectFragment_Project_Fragment = { __typename?: 'Project', id: string, userId: string, companyId: string, companyName: string, name: string, category: string, totalWeight: string, deliveryDate: string, deliveryAddress: string, targetPrice: string, orderQuantities: Array<number>, status: Types.ProjectStatus, visibility: Types.ProjectVisibility, createdAt: any, updatedAt: any };

export type ProjectFragment_VendorGuestProject_Fragment = { __typename?: 'VendorGuestProject', id: string, userId: string, companyId: string, companyName: string, name: string, category: string, totalWeight: string, deliveryDate: string, deliveryAddress: string, targetPrice: string, orderQuantities: Array<number>, status: Types.ProjectStatus, visibility: Types.ProjectVisibility, createdAt: any, updatedAt: any };

export type ProjectFragment_VendorProject_Fragment = { __typename?: 'VendorProject', id: string, userId: string, companyId: string, companyName: string, name: string, category: string, totalWeight: string, deliveryDate: string, deliveryAddress: string, targetPrice: string, orderQuantities: Array<number>, status: Types.ProjectStatus, visibility: Types.ProjectVisibility, createdAt: any, updatedAt: any };

export type ProjectFragmentFragment = ProjectFragment_CustomerProject_Fragment | ProjectFragment_PermissionedProject_Fragment | ProjectFragment_Project_Fragment | ProjectFragment_VendorGuestProject_Fragment | ProjectFragment_VendorProject_Fragment;

export type ProjectInvitationFragmentFragment = { __typename?: 'ProjectInvitation', projectId: string, customerCompanyId: string, vendorCompanyId: string, projectName: string, customerName: string, vendorName: string };

export type GetProjectUsersQueryVariables = Types.Exact<{
  data: Types.GetProjectUsersInput;
}>;


export type GetProjectUsersQuery = { __typename?: 'Query', getProjectUsers: Array<{ __typename?: 'UserProjectPermission', userId: string, name: string, email: string, permission: Types.ProjectPermission }> };

export type GetProjectChangelogQueryVariables = Types.Exact<{
  data: Types.GetProjectChangelogInput;
}>;


export type GetProjectChangelogQuery = { __typename?: 'Query', getProjectChangelog: Array<{ __typename?: 'ProjectChangelog', projectId: string, changedAt: any, changes: Array<{ __typename?: 'ProjectPropertyChange', propertyName: string, oldValue?: any | null, newValue?: any | null }> }> };

export type GetProjectComponentChangelogQueryVariables = Types.Exact<{
  data: Types.GetProjectComponentChangelogInput;
}>;


export type GetProjectComponentChangelogQuery = { __typename?: 'Query', getProjectComponentChangelog: Array<Array<{ __typename?: 'ProjectComponentChangelog', projectComponentId: string, changedAt: any, changes: Array<{ __typename?: 'ProjectComponentPropertyChange', projectComponentSpecId?: string | null, propertyName: string, oldValue?: any | null, newValue?: any | null }> }>> };

export type GetProjectDetailQueryVariables = Types.Exact<{
  data: Types.GetProjectDetailInput;
}>;


export type GetProjectDetailQuery = { __typename?: 'Query', getProjectDetail?: { __typename?: 'Project', country: string, guestEmail?: string | null, id: string, userId: string, companyId: string, companyName: string, name: string, category: string, totalWeight: string, deliveryDate: string, deliveryAddress: string, targetPrice: string, orderQuantities: Array<number>, status: Types.ProjectStatus, visibility: Types.ProjectVisibility, createdAt: any, updatedAt: any, components: Array<{ __typename?: 'ProjectComponent', id: string, projectId: string, name: string, designs?: Array<{ __typename?: 'ProjectDesign', fileId: string, filename: string, url: string }> | null, componentSpec: { __typename?: 'ProjectComponentSpec', id: string, productName: string, boxStyle?: string | null, style?: string | null, includeArtworkInQuote?: boolean | null, purpose?: string | null, shape?: string | null, thickness?: string | null, flute?: string | null, color?: string | null, manufacturingProcess?: string | null, material?: string | null, materialSource?: string | null, numberOfPages?: string | null, finish?: string | null, outsideMaterial?: string | null, outsideMaterialSource?: string | null, outsideFinish?: string | null, outsideColor?: string | null, insideMaterial?: string | null, insideMaterialSource?: string | null, insideFinish?: string | null, insideColor?: string | null, dimension: { __typename?: 'ProductDimension', x: string, y: string, z?: string | null }, postProcess?: Array<{ __typename?: 'PostProcessDetail', postProcessName: string, isInside?: boolean | null, printingMethod?: string | null, color?: string | null, fontSize?: string | null, numberOfColors?: { __typename?: 'PostProcessPrintingNumberOfColors', c: string, t: string } | null, estimatedArea?: { __typename?: 'ProductDimension', x: string, y: string } | null }> | null } }> } | null };

export type SearchCustomerProjectsQueryVariables = Types.Exact<{
  data: Types.SearchCustomerProjectInput;
}>;


export type SearchCustomerProjectsQuery = { __typename?: 'Query', searchCustomerProjects: { __typename?: 'CustomerProjectSearchResult', totalHits: number, hits: Array<{ __typename?: 'SearchResultProjectOverview', id: string, name: string, category: string, products: Array<string>, deliveryDate: string, deliveryAddress: string, targetPrice: string, orderQuantities: Array<number>, createdAt: any, bidInfo: { __typename?: 'ProjectBidInfo', hasBids: boolean, biddedByUserCompany: boolean } }> } };

export const ProjectComponentFragmentFragmentDoc = gql`
    fragment ProjectComponentFragment on ProjectComponent {
  id
  projectId
  name
  designs {
    ...FileFragment
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
    ${FileFragmentFragmentDoc}`;
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
  status
  visibility
  createdAt
  updatedAt
}
    `;
export const ProjectInvitationFragmentFragmentDoc = gql`
    fragment ProjectInvitationFragment on ProjectInvitation {
  projectId
  customerCompanyId
  vendorCompanyId
  projectName
  customerName
  vendorName
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
export const GetProjectComponentChangelogDocument = gql`
    query getProjectComponentChangelog($data: GetProjectComponentChangelogInput!) {
  getProjectComponentChangelog(data: $data) {
    projectComponentId
    changedAt
    changes {
      projectComponentSpecId
      propertyName
      oldValue
      newValue
    }
  }
}
    `;

/**
 * __useGetProjectComponentChangelogQuery__
 *
 * To run a query within a React component, call `useGetProjectComponentChangelogQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetProjectComponentChangelogQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetProjectComponentChangelogQuery({
 *   variables: {
 *      data: // value for 'data'
 *   },
 * });
 */
export function useGetProjectComponentChangelogQuery(baseOptions: Apollo.QueryHookOptions<GetProjectComponentChangelogQuery, GetProjectComponentChangelogQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<GetProjectComponentChangelogQuery, GetProjectComponentChangelogQueryVariables>(GetProjectComponentChangelogDocument, options);
      }
export function useGetProjectComponentChangelogLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<GetProjectComponentChangelogQuery, GetProjectComponentChangelogQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<GetProjectComponentChangelogQuery, GetProjectComponentChangelogQueryVariables>(GetProjectComponentChangelogDocument, options);
        }
export type GetProjectComponentChangelogQueryHookResult = ReturnType<typeof useGetProjectComponentChangelogQuery>;
export type GetProjectComponentChangelogLazyQueryHookResult = ReturnType<typeof useGetProjectComponentChangelogLazyQuery>;
export type GetProjectComponentChangelogQueryResult = Apollo.QueryResult<GetProjectComponentChangelogQuery, GetProjectComponentChangelogQueryVariables>;
export const GetProjectDetailDocument = gql`
    query getProjectDetail($data: GetProjectDetailInput!) {
  getProjectDetail(data: $data) {
    ...ProjectFragment
    country
    guestEmail
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
    hits {
      id
      name
      category
      products
      deliveryDate
      deliveryAddress
      targetPrice
      orderQuantities
      createdAt
      bidInfo {
        hasBids
        biddedByUserCompany
      }
    }
    totalHits
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