// THIS FILE IS GENERATED. DO NOT EDIT.
import * as Types from '../../../../generated/graphql';

import { gql } from '@apollo/client';
import * as Apollo from '@apollo/client';
const defaultOptions = {} as const;
export type DeletePurchaseOrderMutationVariables = Types.Exact<{
  data: Types.DeletePurchaseOrderInput;
}>;


export type DeletePurchaseOrderMutation = { __typename?: 'Mutation', deletePurchaseOrder: boolean };


export const DeletePurchaseOrderDocument = gql`
    mutation deletePurchaseOrder($data: DeletePurchaseOrderInput!) {
  deletePurchaseOrder(data: $data)
}
    `;
export type DeletePurchaseOrderMutationFn = Apollo.MutationFunction<DeletePurchaseOrderMutation, DeletePurchaseOrderMutationVariables>;

/**
 * __useDeletePurchaseOrderMutation__
 *
 * To run a mutation, you first call `useDeletePurchaseOrderMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useDeletePurchaseOrderMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [deletePurchaseOrderMutation, { data, loading, error }] = useDeletePurchaseOrderMutation({
 *   variables: {
 *      data: // value for 'data'
 *   },
 * });
 */
export function useDeletePurchaseOrderMutation(baseOptions?: Apollo.MutationHookOptions<DeletePurchaseOrderMutation, DeletePurchaseOrderMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<DeletePurchaseOrderMutation, DeletePurchaseOrderMutationVariables>(DeletePurchaseOrderDocument, options);
      }
export type DeletePurchaseOrderMutationHookResult = ReturnType<typeof useDeletePurchaseOrderMutation>;
export type DeletePurchaseOrderMutationResult = Apollo.MutationResult<DeletePurchaseOrderMutation>;
export type DeletePurchaseOrderMutationOptions = Apollo.BaseMutationOptions<DeletePurchaseOrderMutation, DeletePurchaseOrderMutationVariables>;