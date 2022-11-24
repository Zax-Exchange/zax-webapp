// THIS FILE IS GENERATED. DO NOT EDIT.
import * as Types from '../../../../generated/graphql';

import { gql } from '@apollo/client';
import { FileFragmentFragmentDoc } from '../../utils/common/file.generated';
import * as Apollo from '@apollo/client';
const defaultOptions = {} as const;
export type UploadBidRemarkMutationVariables = Types.Exact<{
  file: Types.Scalars['Upload'];
}>;


export type UploadBidRemarkMutation = { __typename?: 'Mutation', uploadBidRemark: { __typename?: 'BidRemark', fileId: string, filename: string, url: string } };


export const UploadBidRemarkDocument = gql`
    mutation uploadBidRemark($file: Upload!) {
  uploadBidRemark(file: $file) {
    ...FileFragment
  }
}
    ${FileFragmentFragmentDoc}`;
export type UploadBidRemarkMutationFn = Apollo.MutationFunction<UploadBidRemarkMutation, UploadBidRemarkMutationVariables>;

/**
 * __useUploadBidRemarkMutation__
 *
 * To run a mutation, you first call `useUploadBidRemarkMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useUploadBidRemarkMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [uploadBidRemarkMutation, { data, loading, error }] = useUploadBidRemarkMutation({
 *   variables: {
 *      file: // value for 'file'
 *   },
 * });
 */
export function useUploadBidRemarkMutation(baseOptions?: Apollo.MutationHookOptions<UploadBidRemarkMutation, UploadBidRemarkMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<UploadBidRemarkMutation, UploadBidRemarkMutationVariables>(UploadBidRemarkDocument, options);
      }
export type UploadBidRemarkMutationHookResult = ReturnType<typeof useUploadBidRemarkMutation>;
export type UploadBidRemarkMutationResult = Apollo.MutationResult<UploadBidRemarkMutation>;
export type UploadBidRemarkMutationOptions = Apollo.BaseMutationOptions<UploadBidRemarkMutation, UploadBidRemarkMutationVariables>;