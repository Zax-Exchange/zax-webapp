import * as Types from '../../../../generated/graphql';

import { gql } from '@apollo/client';
import * as Apollo from '@apollo/client';
const defaultOptions = {} as const;
export type GetUserWithUserIdQueryVariables = Types.Exact<{
  userId: Types.Scalars['String'];
  paranoid?: Types.InputMaybe<Types.Scalars['Boolean']>;
}>;


export type GetUserWithUserIdQuery = { __typename?: 'Query', getUserWithUserId: { __typename?: 'User', id: string, name: string, email: string, companyId: string, isActive: boolean } };


export const GetUserWithUserIdDocument = gql`
    query getUserWithUserId($userId: String!, $paranoid: Boolean) {
  getUserWithUserId(userId: $userId) {
    id
    name
    email
    companyId
    isActive
  }
}
    `;

/**
 * __useGetUserWithUserIdQuery__
 *
 * To run a query within a React component, call `useGetUserWithUserIdQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetUserWithUserIdQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetUserWithUserIdQuery({
 *   variables: {
 *      userId: // value for 'userId'
 *      paranoid: // value for 'paranoid'
 *   },
 * });
 */
export function useGetUserWithUserIdQuery(baseOptions: Apollo.QueryHookOptions<GetUserWithUserIdQuery, GetUserWithUserIdQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<GetUserWithUserIdQuery, GetUserWithUserIdQueryVariables>(GetUserWithUserIdDocument, options);
      }
export function useGetUserWithUserIdLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<GetUserWithUserIdQuery, GetUserWithUserIdQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<GetUserWithUserIdQuery, GetUserWithUserIdQueryVariables>(GetUserWithUserIdDocument, options);
        }
export type GetUserWithUserIdQueryHookResult = ReturnType<typeof useGetUserWithUserIdQuery>;
export type GetUserWithUserIdLazyQueryHookResult = ReturnType<typeof useGetUserWithUserIdLazyQuery>;
export type GetUserWithUserIdQueryResult = Apollo.QueryResult<GetUserWithUserIdQuery, GetUserWithUserIdQueryVariables>;