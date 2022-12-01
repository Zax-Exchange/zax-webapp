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

export type SendPasswordResetLinkMutationVariables = Types.Exact<{
  data: Types.SendPasswordResetLinkInput;
}>;


export type SendPasswordResetLinkMutation = { __typename?: 'Mutation', sendPasswordResetLink: boolean };

export type ResetPasswordMutationVariables = Types.Exact<{
  data: Types.ResetPasswordInput;
}>;


export type ResetPasswordMutation = { __typename?: 'Mutation', resetPassword?: boolean | null };


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
export const SendPasswordResetLinkDocument = gql`
    mutation sendPasswordResetLink($data: SendPasswordResetLinkInput!) {
  sendPasswordResetLink(data: $data)
}
    `;
export type SendPasswordResetLinkMutationFn = Apollo.MutationFunction<SendPasswordResetLinkMutation, SendPasswordResetLinkMutationVariables>;

/**
 * __useSendPasswordResetLinkMutation__
 *
 * To run a mutation, you first call `useSendPasswordResetLinkMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useSendPasswordResetLinkMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [sendPasswordResetLinkMutation, { data, loading, error }] = useSendPasswordResetLinkMutation({
 *   variables: {
 *      data: // value for 'data'
 *   },
 * });
 */
export function useSendPasswordResetLinkMutation(baseOptions?: Apollo.MutationHookOptions<SendPasswordResetLinkMutation, SendPasswordResetLinkMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<SendPasswordResetLinkMutation, SendPasswordResetLinkMutationVariables>(SendPasswordResetLinkDocument, options);
      }
export type SendPasswordResetLinkMutationHookResult = ReturnType<typeof useSendPasswordResetLinkMutation>;
export type SendPasswordResetLinkMutationResult = Apollo.MutationResult<SendPasswordResetLinkMutation>;
export type SendPasswordResetLinkMutationOptions = Apollo.BaseMutationOptions<SendPasswordResetLinkMutation, SendPasswordResetLinkMutationVariables>;
export const ResetPasswordDocument = gql`
    mutation resetPassword($data: ResetPasswordInput!) {
  resetPassword(data: $data)
}
    `;
export type ResetPasswordMutationFn = Apollo.MutationFunction<ResetPasswordMutation, ResetPasswordMutationVariables>;

/**
 * __useResetPasswordMutation__
 *
 * To run a mutation, you first call `useResetPasswordMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useResetPasswordMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [resetPasswordMutation, { data, loading, error }] = useResetPasswordMutation({
 *   variables: {
 *      data: // value for 'data'
 *   },
 * });
 */
export function useResetPasswordMutation(baseOptions?: Apollo.MutationHookOptions<ResetPasswordMutation, ResetPasswordMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<ResetPasswordMutation, ResetPasswordMutationVariables>(ResetPasswordDocument, options);
      }
export type ResetPasswordMutationHookResult = ReturnType<typeof useResetPasswordMutation>;
export type ResetPasswordMutationResult = Apollo.MutationResult<ResetPasswordMutation>;
export type ResetPasswordMutationOptions = Apollo.BaseMutationOptions<ResetPasswordMutation, ResetPasswordMutationVariables>;