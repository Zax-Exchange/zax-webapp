// THIS FILE IS GENERATED. DO NOT EDIT.
import * as Types from '../../../../generated/graphql';

import { gql } from '@apollo/client';
import * as Apollo from '@apollo/client';
const defaultOptions = {} as const;
export type UploadProjectDesignMutationVariables = Types.Exact<{
  file: Types.Scalars['Upload'];
}>;


export type UploadProjectDesignMutation = { __typename?: 'Mutation', uploadProjectDesign: { __typename?: 'ProjectDesign', filename: string, fileId: string, url: string } };


export const UploadProjectDesignDocument = gql`
    mutation uploadProjectDesign($file: Upload!) {
  uploadProjectDesign(file: $file) {
    filename
    fileId
    url
  }
}
    `;
export type UploadProjectDesignMutationFn = Apollo.MutationFunction<UploadProjectDesignMutation, UploadProjectDesignMutationVariables>;

/**
 * __useUploadProjectDesignMutation__
 *
 * To run a mutation, you first call `useUploadProjectDesignMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useUploadProjectDesignMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [uploadProjectDesignMutation, { data, loading, error }] = useUploadProjectDesignMutation({
 *   variables: {
 *      file: // value for 'file'
 *   },
 * });
 */
export function useUploadProjectDesignMutation(baseOptions?: Apollo.MutationHookOptions<UploadProjectDesignMutation, UploadProjectDesignMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<UploadProjectDesignMutation, UploadProjectDesignMutationVariables>(UploadProjectDesignDocument, options);
      }
export type UploadProjectDesignMutationHookResult = ReturnType<typeof useUploadProjectDesignMutation>;
export type UploadProjectDesignMutationResult = Apollo.MutationResult<UploadProjectDesignMutation>;
export type UploadProjectDesignMutationOptions = Apollo.BaseMutationOptions<UploadProjectDesignMutation, UploadProjectDesignMutationVariables>;