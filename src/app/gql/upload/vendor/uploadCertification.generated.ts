// THIS FILE IS GENERATED. DO NOT EDIT.
import * as Types from '../../../../generated/graphql';

import { gql } from '@apollo/client';
import { FileFragmentFragmentDoc } from '../../utils/common/file.generated';
import * as Apollo from '@apollo/client';
const defaultOptions = {} as const;
export type UploadCertificationMutationVariables = Types.Exact<{
  file: Types.Scalars['Upload'];
}>;


export type UploadCertificationMutation = { __typename?: 'Mutation', uploadCertification: { __typename?: 'GenericFile', fileId: string, filename: string, url: string } };


export const UploadCertificationDocument = gql`
    mutation uploadCertification($file: Upload!) {
  uploadCertification(file: $file) {
    ...FileFragment
  }
}
    ${FileFragmentFragmentDoc}`;
export type UploadCertificationMutationFn = Apollo.MutationFunction<UploadCertificationMutation, UploadCertificationMutationVariables>;

/**
 * __useUploadCertificationMutation__
 *
 * To run a mutation, you first call `useUploadCertificationMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useUploadCertificationMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [uploadCertificationMutation, { data, loading, error }] = useUploadCertificationMutation({
 *   variables: {
 *      file: // value for 'file'
 *   },
 * });
 */
export function useUploadCertificationMutation(baseOptions?: Apollo.MutationHookOptions<UploadCertificationMutation, UploadCertificationMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<UploadCertificationMutation, UploadCertificationMutationVariables>(UploadCertificationDocument, options);
      }
export type UploadCertificationMutationHookResult = ReturnType<typeof useUploadCertificationMutation>;
export type UploadCertificationMutationResult = Apollo.MutationResult<UploadCertificationMutation>;
export type UploadCertificationMutationOptions = Apollo.BaseMutationOptions<UploadCertificationMutation, UploadCertificationMutationVariables>;