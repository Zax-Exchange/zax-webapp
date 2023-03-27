// THIS FILE IS GENERATED. DO NOT EDIT.
import * as Types from '../../../../generated/graphql';

import { gql } from '@apollo/client';
import { FileFragmentFragmentDoc } from '../../utils/common/file.generated';
import * as Apollo from '@apollo/client';
const defaultOptions = {} as const;
export type UploadProductImageMutationVariables = Types.Exact<{
  file: Types.Scalars['Upload'];
}>;


export type UploadProductImageMutation = { __typename?: 'Mutation', uploadProductImage: { __typename?: 'GenericFile', fileId: string, filename: string, url: string } };


export const UploadProductImageDocument = gql`
    mutation uploadProductImage($file: Upload!) {
  uploadProductImage(file: $file) {
    ...FileFragment
  }
}
    ${FileFragmentFragmentDoc}`;
export type UploadProductImageMutationFn = Apollo.MutationFunction<UploadProductImageMutation, UploadProductImageMutationVariables>;

/**
 * __useUploadProductImageMutation__
 *
 * To run a mutation, you first call `useUploadProductImageMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useUploadProductImageMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [uploadProductImageMutation, { data, loading, error }] = useUploadProductImageMutation({
 *   variables: {
 *      file: // value for 'file'
 *   },
 * });
 */
export function useUploadProductImageMutation(baseOptions?: Apollo.MutationHookOptions<UploadProductImageMutation, UploadProductImageMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<UploadProductImageMutation, UploadProductImageMutationVariables>(UploadProductImageDocument, options);
      }
export type UploadProductImageMutationHookResult = ReturnType<typeof useUploadProductImageMutation>;
export type UploadProductImageMutationResult = Apollo.MutationResult<UploadProductImageMutation>;
export type UploadProductImageMutationOptions = Apollo.BaseMutationOptions<UploadProductImageMutation, UploadProductImageMutationVariables>;