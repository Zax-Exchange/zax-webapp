// THIS FILE IS GENERATED. DO NOT EDIT.
import * as Types from '../../../../generated/graphql';

import { gql } from '@apollo/client';
import { FileFragmentFragmentDoc } from '../../utils/common/file.generated';
import * as Apollo from '@apollo/client';
const defaultOptions = {} as const;
export type UploadPurchaseOrderMutationVariables = Types.Exact<{
  file: Types.Scalars['Upload'];
}>;


export type UploadPurchaseOrderMutation = { __typename?: 'Mutation', uploadPurchaseOrder: { __typename?: 'PurchaseOrder', status: Types.PurchaseOrderStatus, fileId: string, filename: string, url: string } };


export const UploadPurchaseOrderDocument = gql`
    mutation uploadPurchaseOrder($file: Upload!) {
  uploadPurchaseOrder(file: $file) {
    ...FileFragment
    status
  }
}
    ${FileFragmentFragmentDoc}`;
export type UploadPurchaseOrderMutationFn = Apollo.MutationFunction<UploadPurchaseOrderMutation, UploadPurchaseOrderMutationVariables>;

/**
 * __useUploadPurchaseOrderMutation__
 *
 * To run a mutation, you first call `useUploadPurchaseOrderMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useUploadPurchaseOrderMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [uploadPurchaseOrderMutation, { data, loading, error }] = useUploadPurchaseOrderMutation({
 *   variables: {
 *      file: // value for 'file'
 *   },
 * });
 */
export function useUploadPurchaseOrderMutation(baseOptions?: Apollo.MutationHookOptions<UploadPurchaseOrderMutation, UploadPurchaseOrderMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<UploadPurchaseOrderMutation, UploadPurchaseOrderMutationVariables>(UploadPurchaseOrderDocument, options);
      }
export type UploadPurchaseOrderMutationHookResult = ReturnType<typeof useUploadPurchaseOrderMutation>;
export type UploadPurchaseOrderMutationResult = Apollo.MutationResult<UploadPurchaseOrderMutation>;
export type UploadPurchaseOrderMutationOptions = Apollo.BaseMutationOptions<UploadPurchaseOrderMutation, UploadPurchaseOrderMutationVariables>;