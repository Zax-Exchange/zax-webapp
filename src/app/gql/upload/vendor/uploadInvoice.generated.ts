// THIS FILE IS GENERATED. DO NOT EDIT.
import * as Types from '../../../../generated/graphql';

import { gql } from '@apollo/client';
import { FileFragmentFragmentDoc } from '../../utils/common/file.generated';
import * as Apollo from '@apollo/client';
const defaultOptions = {} as const;
export type UploadInvoiceMutationVariables = Types.Exact<{
  file: Types.Scalars['Upload'];
}>;


export type UploadInvoiceMutation = { __typename?: 'Mutation', uploadInvoice: { __typename?: 'Invoice', status: Types.InvoiceStatus, fileId: string, filename: string, url: string } };


export const UploadInvoiceDocument = gql`
    mutation uploadInvoice($file: Upload!) {
  uploadInvoice(file: $file) {
    ...FileFragment
    status
  }
}
    ${FileFragmentFragmentDoc}`;
export type UploadInvoiceMutationFn = Apollo.MutationFunction<UploadInvoiceMutation, UploadInvoiceMutationVariables>;

/**
 * __useUploadInvoiceMutation__
 *
 * To run a mutation, you first call `useUploadInvoiceMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useUploadInvoiceMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [uploadInvoiceMutation, { data, loading, error }] = useUploadInvoiceMutation({
 *   variables: {
 *      file: // value for 'file'
 *   },
 * });
 */
export function useUploadInvoiceMutation(baseOptions?: Apollo.MutationHookOptions<UploadInvoiceMutation, UploadInvoiceMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<UploadInvoiceMutation, UploadInvoiceMutationVariables>(UploadInvoiceDocument, options);
      }
export type UploadInvoiceMutationHookResult = ReturnType<typeof useUploadInvoiceMutation>;
export type UploadInvoiceMutationResult = Apollo.MutationResult<UploadInvoiceMutation>;
export type UploadInvoiceMutationOptions = Apollo.BaseMutationOptions<UploadInvoiceMutation, UploadInvoiceMutationVariables>;