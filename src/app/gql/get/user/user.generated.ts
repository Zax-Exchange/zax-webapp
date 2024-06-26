// THIS FILE IS GENERATED. DO NOT EDIT.
import * as Types from '../../../../generated/graphql';

import { gql } from '@apollo/client';
import * as Apollo from '@apollo/client';
const defaultOptions = {} as const;
export type UserFragment_GenericUser_Fragment = { __typename?: 'GenericUser', id: string, name: string, email: string, companyId: string, isVendor: boolean, power: Types.UserPower };

export type UserFragment_LoggedInUser_Fragment = { __typename?: 'LoggedInUser', id: string, name: string, email: string, companyId: string, isVendor: boolean, power: Types.UserPower };

export type UserFragmentFragment = UserFragment_GenericUser_Fragment | UserFragment_LoggedInUser_Fragment;

export type GetUserQueryVariables = Types.Exact<{
  data: Types.GetUserInput;
}>;


export type GetUserQuery = { __typename?: 'Query', getUser: { __typename?: 'GenericUser', status: Types.UserStatus, id: string, name: string, email: string, companyId: string, isVendor: boolean, power: Types.UserPower } };

export const UserFragmentFragmentDoc = gql`
    fragment UserFragment on UserInterface {
  id
  name
  email
  companyId
  isVendor
  power
}
    `;
export const GetUserDocument = gql`
    query getUser($data: GetUserInput!) {
  getUser(data: $data) {
    ...UserFragment
    status
  }
}
    ${UserFragmentFragmentDoc}`;

/**
 * __useGetUserQuery__
 *
 * To run a query within a React component, call `useGetUserQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetUserQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetUserQuery({
 *   variables: {
 *      data: // value for 'data'
 *   },
 * });
 */
export function useGetUserQuery(baseOptions: Apollo.QueryHookOptions<GetUserQuery, GetUserQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<GetUserQuery, GetUserQueryVariables>(GetUserDocument, options);
      }
export function useGetUserLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<GetUserQuery, GetUserQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<GetUserQuery, GetUserQueryVariables>(GetUserDocument, options);
        }
export type GetUserQueryHookResult = ReturnType<typeof useGetUserQuery>;
export type GetUserLazyQueryHookResult = ReturnType<typeof useGetUserLazyQuery>;
export type GetUserQueryResult = Apollo.QueryResult<GetUserQuery, GetUserQueryVariables>;