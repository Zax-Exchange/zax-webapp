// THIS FILE IS GENERATED. DO NOT EDIT.
import * as Types from '../../../../generated/graphql';

import { gql } from '@apollo/client';
import * as Apollo from '@apollo/client';
const defaultOptions = {} as const;
export type DeleteInvoiceMutationVariables = Types.Exact<{
  data: Types.DeleteInvoiceInput;
}>;


export type DeleteInvoiceMutation = { __typename?: 'Mutation', deleteInvoice: boolean };

export type DeleteCertificationsMutationVariables = Types.Exact<{
  data: Types.DeleteCertificationsInput;
}>;


export type DeleteCertificationsMutation = { __typename?: 'Mutation', deleteCertifications: boolean };

export type DeleteProductImagesMutationVariables = Types.Exact<{
  data: Types.DeleteProductImagesInput;
}>;


export type DeleteProductImagesMutation = { __typename?: 'Mutation', deleteProductImages: boolean };

export type DeleteFactoryMutationVariables = Types.Exact<{
  data: Types.DeleteFactoryInput;
}>;


export type DeleteFactoryMutation = { __typename?: 'Mutation', deleteFactory: boolean };


export const DeleteInvoiceDocument = gql`
    mutation deleteInvoice($data: DeleteInvoiceInput!) {
  deleteInvoice(data: $data)
}
    `;
export type DeleteInvoiceMutationFn = Apollo.MutationFunction<DeleteInvoiceMutation, DeleteInvoiceMutationVariables>;

/**
 * __useDeleteInvoiceMutation__
 *
 * To run a mutation, you first call `useDeleteInvoiceMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useDeleteInvoiceMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [deleteInvoiceMutation, { data, loading, error }] = useDeleteInvoiceMutation({
 *   variables: {
 *      data: // value for 'data'
 *   },
 * });
 */
export function useDeleteInvoiceMutation(baseOptions?: Apollo.MutationHookOptions<DeleteInvoiceMutation, DeleteInvoiceMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<DeleteInvoiceMutation, DeleteInvoiceMutationVariables>(DeleteInvoiceDocument, options);
      }
export type DeleteInvoiceMutationHookResult = ReturnType<typeof useDeleteInvoiceMutation>;
export type DeleteInvoiceMutationResult = Apollo.MutationResult<DeleteInvoiceMutation>;
export type DeleteInvoiceMutationOptions = Apollo.BaseMutationOptions<DeleteInvoiceMutation, DeleteInvoiceMutationVariables>;
export const DeleteCertificationsDocument = gql`
    mutation deleteCertifications($data: DeleteCertificationsInput!) {
  deleteCertifications(data: $data)
}
    `;
export type DeleteCertificationsMutationFn = Apollo.MutationFunction<DeleteCertificationsMutation, DeleteCertificationsMutationVariables>;

/**
 * __useDeleteCertificationsMutation__
 *
 * To run a mutation, you first call `useDeleteCertificationsMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useDeleteCertificationsMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [deleteCertificationsMutation, { data, loading, error }] = useDeleteCertificationsMutation({
 *   variables: {
 *      data: // value for 'data'
 *   },
 * });
 */
export function useDeleteCertificationsMutation(baseOptions?: Apollo.MutationHookOptions<DeleteCertificationsMutation, DeleteCertificationsMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<DeleteCertificationsMutation, DeleteCertificationsMutationVariables>(DeleteCertificationsDocument, options);
      }
export type DeleteCertificationsMutationHookResult = ReturnType<typeof useDeleteCertificationsMutation>;
export type DeleteCertificationsMutationResult = Apollo.MutationResult<DeleteCertificationsMutation>;
export type DeleteCertificationsMutationOptions = Apollo.BaseMutationOptions<DeleteCertificationsMutation, DeleteCertificationsMutationVariables>;
export const DeleteProductImagesDocument = gql`
    mutation deleteProductImages($data: DeleteProductImagesInput!) {
  deleteProductImages(data: $data)
}
    `;
export type DeleteProductImagesMutationFn = Apollo.MutationFunction<DeleteProductImagesMutation, DeleteProductImagesMutationVariables>;

/**
 * __useDeleteProductImagesMutation__
 *
 * To run a mutation, you first call `useDeleteProductImagesMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useDeleteProductImagesMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [deleteProductImagesMutation, { data, loading, error }] = useDeleteProductImagesMutation({
 *   variables: {
 *      data: // value for 'data'
 *   },
 * });
 */
export function useDeleteProductImagesMutation(baseOptions?: Apollo.MutationHookOptions<DeleteProductImagesMutation, DeleteProductImagesMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<DeleteProductImagesMutation, DeleteProductImagesMutationVariables>(DeleteProductImagesDocument, options);
      }
export type DeleteProductImagesMutationHookResult = ReturnType<typeof useDeleteProductImagesMutation>;
export type DeleteProductImagesMutationResult = Apollo.MutationResult<DeleteProductImagesMutation>;
export type DeleteProductImagesMutationOptions = Apollo.BaseMutationOptions<DeleteProductImagesMutation, DeleteProductImagesMutationVariables>;
export const DeleteFactoryDocument = gql`
    mutation deleteFactory($data: DeleteFactoryInput!) {
  deleteFactory(data: $data)
}
    `;
export type DeleteFactoryMutationFn = Apollo.MutationFunction<DeleteFactoryMutation, DeleteFactoryMutationVariables>;

/**
 * __useDeleteFactoryMutation__
 *
 * To run a mutation, you first call `useDeleteFactoryMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useDeleteFactoryMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [deleteFactoryMutation, { data, loading, error }] = useDeleteFactoryMutation({
 *   variables: {
 *      data: // value for 'data'
 *   },
 * });
 */
export function useDeleteFactoryMutation(baseOptions?: Apollo.MutationHookOptions<DeleteFactoryMutation, DeleteFactoryMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<DeleteFactoryMutation, DeleteFactoryMutationVariables>(DeleteFactoryDocument, options);
      }
export type DeleteFactoryMutationHookResult = ReturnType<typeof useDeleteFactoryMutation>;
export type DeleteFactoryMutationResult = Apollo.MutationResult<DeleteFactoryMutation>;
export type DeleteFactoryMutationOptions = Apollo.BaseMutationOptions<DeleteFactoryMutation, DeleteFactoryMutationVariables>;