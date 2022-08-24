import * as Types from '../../../../generated/graphql';

import { gql } from '@apollo/client';
import * as Apollo from '@apollo/client';
const defaultOptions = {} as const;
export type GetProjectUsersQueryVariables = Types.Exact<{
  projectId: Types.Scalars['String'];
}>;


export type GetProjectUsersQuery = { __typename?: 'Query', getProjectUsers: Array<{ __typename?: 'UserPermission', userId: string, name: string, email: string, permission: Types.ProjectPermission }> };

export type GetProjectDetailQueryVariables = Types.Exact<{
  projectId: Types.Scalars['String'];
}>;


export type GetProjectDetailQuery = { __typename?: 'Query', getProjectDetail: { __typename?: 'Project', id: string, userId: string, companyId: string, name: string, deliveryDate: string, deliveryAddress: string, budget: number, status: string, createdAt: string, updatedAt: string, design?: { __typename?: 'ProjectDesign', fileName: string, url: string } | null, components: Array<{ __typename?: 'ProjectComponent', id: string, projectId: string, name: string, materials: Array<string>, dimension: string, postProcess: string }> } };

export type SearchProjectsQueryVariables = Types.Exact<{
  searchInput: Types.SearchProjectInput;
}>;


export type SearchProjectsQuery = { __typename?: 'Query', searchCustomerProjects: Array<{ __typename?: 'ProjectOverview', name: string, companyName: string, materials: Array<string>, id: string, companyId: string, deliveryDate: string, deliveryAddress: string, budget: number, createdAt: string }> };


export const GetProjectUsersDocument = gql`
    query getProjectUsers($projectId: String!) {
  getProjectUsers(projectId: $projectId) {
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
 *      projectId: // value for 'projectId'
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
    query getProjectDetail($projectId: String!) {
  getProjectDetail(projectId: $projectId) {
    id
    userId
    companyId
    name
    deliveryDate
    deliveryAddress
    budget
    design {
      fileName
      url
    }
    status
    components {
      id
      projectId
      name
      materials
      dimension
      postProcess
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
 *      projectId: // value for 'projectId'
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
export const SearchProjectsDocument = gql`
    query searchProjects($searchInput: SearchProjectInput!) {
  searchCustomerProjects(searchInput: $searchInput) {
    name
    companyName
    materials
    id
    companyId
    deliveryDate
    deliveryAddress
    budget
    createdAt
  }
}
    `;

/**
 * __useSearchProjectsQuery__
 *
 * To run a query within a React component, call `useSearchProjectsQuery` and pass it any options that fit your needs.
 * When your component renders, `useSearchProjectsQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useSearchProjectsQuery({
 *   variables: {
 *      searchInput: // value for 'searchInput'
 *   },
 * });
 */
export function useSearchProjectsQuery(baseOptions: Apollo.QueryHookOptions<SearchProjectsQuery, SearchProjectsQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<SearchProjectsQuery, SearchProjectsQueryVariables>(SearchProjectsDocument, options);
      }
export function useSearchProjectsLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<SearchProjectsQuery, SearchProjectsQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<SearchProjectsQuery, SearchProjectsQueryVariables>(SearchProjectsDocument, options);
        }
export type SearchProjectsQueryHookResult = ReturnType<typeof useSearchProjectsQuery>;
export type SearchProjectsLazyQueryHookResult = ReturnType<typeof useSearchProjectsLazyQuery>;
export type SearchProjectsQueryResult = Apollo.QueryResult<SearchProjectsQuery, SearchProjectsQueryVariables>;