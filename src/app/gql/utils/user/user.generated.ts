// THIS FILE IS GENERATED. DO NOT EDIT.
import * as Types from '../../../../generated/graphql';

import { gql } from '@apollo/client';
import * as Apollo from '@apollo/client';
const defaultOptions = {} as const;
export type CheckUserEmailQueryVariables = Types.Exact<{
  data: Types.CheckUserEmailInput;
}>;


export type CheckUserEmailQuery = { __typename?: 'Query', checkUserEmail: boolean };

export type LoginQueryVariables = Types.Exact<{
  data: Types.UserLoginInput;
}>;


export type LoginQuery = { __typename?: 'Query', login: { __typename?: 'LoggedInUser', id: string, companyId: string, isVendor: boolean, power: Types.UserPower, name: string, email: string, token: string, notificationToken: string, chatToken: string } };

export type InviteUserMutationVariables = Types.Exact<{
  data: Types.InviteUserInput;
}>;


export type InviteUserMutation = { __typename?: 'Mutation', inviteUser: boolean };

export type RequestToJoinMutationVariables = Types.Exact<{
  data: Types.RequestToJoinInput;
}>;


export type RequestToJoinMutation = { __typename?: 'Mutation', requestToJoin: boolean };


export const CheckUserEmailDocument = gql`
    query checkUserEmail($data: CheckUserEmailInput!) {
  checkUserEmail(data: $data)
}
    `;

/**
 * __useCheckUserEmailQuery__
 *
 * To run a query within a React component, call `useCheckUserEmailQuery` and pass it any options that fit your needs.
 * When your component renders, `useCheckUserEmailQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useCheckUserEmailQuery({
 *   variables: {
 *      data: // value for 'data'
 *   },
 * });
 */
export function useCheckUserEmailQuery(baseOptions: Apollo.QueryHookOptions<CheckUserEmailQuery, CheckUserEmailQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<CheckUserEmailQuery, CheckUserEmailQueryVariables>(CheckUserEmailDocument, options);
      }
export function useCheckUserEmailLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<CheckUserEmailQuery, CheckUserEmailQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<CheckUserEmailQuery, CheckUserEmailQueryVariables>(CheckUserEmailDocument, options);
        }
export type CheckUserEmailQueryHookResult = ReturnType<typeof useCheckUserEmailQuery>;
export type CheckUserEmailLazyQueryHookResult = ReturnType<typeof useCheckUserEmailLazyQuery>;
export type CheckUserEmailQueryResult = Apollo.QueryResult<CheckUserEmailQuery, CheckUserEmailQueryVariables>;
export const LoginDocument = gql`
    query login($data: UserLoginInput!) {
  login(data: $data) {
    id
    companyId
    isVendor
    power
    name
    email
    token
    notificationToken
    chatToken
  }
}
    `;

/**
 * __useLoginQuery__
 *
 * To run a query within a React component, call `useLoginQuery` and pass it any options that fit your needs.
 * When your component renders, `useLoginQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useLoginQuery({
 *   variables: {
 *      data: // value for 'data'
 *   },
 * });
 */
export function useLoginQuery(baseOptions: Apollo.QueryHookOptions<LoginQuery, LoginQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<LoginQuery, LoginQueryVariables>(LoginDocument, options);
      }
export function useLoginLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<LoginQuery, LoginQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<LoginQuery, LoginQueryVariables>(LoginDocument, options);
        }
export type LoginQueryHookResult = ReturnType<typeof useLoginQuery>;
export type LoginLazyQueryHookResult = ReturnType<typeof useLoginLazyQuery>;
export type LoginQueryResult = Apollo.QueryResult<LoginQuery, LoginQueryVariables>;
export const InviteUserDocument = gql`
    mutation inviteUser($data: InviteUserInput!) {
  inviteUser(data: $data)
}
    `;
export type InviteUserMutationFn = Apollo.MutationFunction<InviteUserMutation, InviteUserMutationVariables>;

/**
 * __useInviteUserMutation__
 *
 * To run a mutation, you first call `useInviteUserMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useInviteUserMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [inviteUserMutation, { data, loading, error }] = useInviteUserMutation({
 *   variables: {
 *      data: // value for 'data'
 *   },
 * });
 */
export function useInviteUserMutation(baseOptions?: Apollo.MutationHookOptions<InviteUserMutation, InviteUserMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<InviteUserMutation, InviteUserMutationVariables>(InviteUserDocument, options);
      }
export type InviteUserMutationHookResult = ReturnType<typeof useInviteUserMutation>;
export type InviteUserMutationResult = Apollo.MutationResult<InviteUserMutation>;
export type InviteUserMutationOptions = Apollo.BaseMutationOptions<InviteUserMutation, InviteUserMutationVariables>;
export const RequestToJoinDocument = gql`
    mutation requestToJoin($data: RequestToJoinInput!) {
  requestToJoin(data: $data)
}
    `;
export type RequestToJoinMutationFn = Apollo.MutationFunction<RequestToJoinMutation, RequestToJoinMutationVariables>;

/**
 * __useRequestToJoinMutation__
 *
 * To run a mutation, you first call `useRequestToJoinMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useRequestToJoinMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [requestToJoinMutation, { data, loading, error }] = useRequestToJoinMutation({
 *   variables: {
 *      data: // value for 'data'
 *   },
 * });
 */
export function useRequestToJoinMutation(baseOptions?: Apollo.MutationHookOptions<RequestToJoinMutation, RequestToJoinMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<RequestToJoinMutation, RequestToJoinMutationVariables>(RequestToJoinDocument, options);
      }
export type RequestToJoinMutationHookResult = ReturnType<typeof useRequestToJoinMutation>;
export type RequestToJoinMutationResult = Apollo.MutationResult<RequestToJoinMutation>;
export type RequestToJoinMutationOptions = Apollo.BaseMutationOptions<RequestToJoinMutation, RequestToJoinMutationVariables>;