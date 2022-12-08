// THIS FILE IS GENERATED. DO NOT EDIT.
import * as Types from '../../../../generated/graphql';

import { gql } from '@apollo/client';
import * as Apollo from '@apollo/client';
const defaultOptions = {} as const;
export type UpdateUserPasswordMutationVariables = Types.Exact<{
  data: Types.UpdateUserPasswordInput;
}>;


export type UpdateUserPasswordMutation = { __typename?: 'Mutation', updateUserPassword: boolean };

export type UpdateUserPowerMutationVariables = Types.Exact<{
  data: Array<Types.UpdateUserPowerInput> | Types.UpdateUserPowerInput;
}>;


export type UpdateUserPowerMutation = { __typename?: 'Mutation', updateUserPower: boolean };


export const UpdateUserPasswordDocument = gql`
    mutation updateUserPassword($data: UpdateUserPasswordInput!) {
  updateUserPassword(data: $data)
}
    `;
export type UpdateUserPasswordMutationFn = Apollo.MutationFunction<UpdateUserPasswordMutation, UpdateUserPasswordMutationVariables>;

/**
 * __useUpdateUserPasswordMutation__
 *
 * To run a mutation, you first call `useUpdateUserPasswordMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useUpdateUserPasswordMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [updateUserPasswordMutation, { data, loading, error }] = useUpdateUserPasswordMutation({
 *   variables: {
 *      data: // value for 'data'
 *   },
 * });
 */
export function useUpdateUserPasswordMutation(baseOptions?: Apollo.MutationHookOptions<UpdateUserPasswordMutation, UpdateUserPasswordMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<UpdateUserPasswordMutation, UpdateUserPasswordMutationVariables>(UpdateUserPasswordDocument, options);
      }
export type UpdateUserPasswordMutationHookResult = ReturnType<typeof useUpdateUserPasswordMutation>;
export type UpdateUserPasswordMutationResult = Apollo.MutationResult<UpdateUserPasswordMutation>;
export type UpdateUserPasswordMutationOptions = Apollo.BaseMutationOptions<UpdateUserPasswordMutation, UpdateUserPasswordMutationVariables>;
export const UpdateUserPowerDocument = gql`
    mutation updateUserPower($data: [UpdateUserPowerInput!]!) {
  updateUserPower(data: $data)
}
    `;
export type UpdateUserPowerMutationFn = Apollo.MutationFunction<UpdateUserPowerMutation, UpdateUserPowerMutationVariables>;

/**
 * __useUpdateUserPowerMutation__
 *
 * To run a mutation, you first call `useUpdateUserPowerMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useUpdateUserPowerMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [updateUserPowerMutation, { data, loading, error }] = useUpdateUserPowerMutation({
 *   variables: {
 *      data: // value for 'data'
 *   },
 * });
 */
export function useUpdateUserPowerMutation(baseOptions?: Apollo.MutationHookOptions<UpdateUserPowerMutation, UpdateUserPowerMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<UpdateUserPowerMutation, UpdateUserPowerMutationVariables>(UpdateUserPowerDocument, options);
      }
export type UpdateUserPowerMutationHookResult = ReturnType<typeof useUpdateUserPowerMutation>;
export type UpdateUserPowerMutationResult = Apollo.MutationResult<UpdateUserPowerMutation>;
export type UpdateUserPowerMutationOptions = Apollo.BaseMutationOptions<UpdateUserPowerMutation, UpdateUserPowerMutationVariables>;