// THIS FILE IS GENERATED. DO NOT EDIT.
import * as Types from '../../../../generated/graphql';

import { gql } from '@apollo/client';
import * as Apollo from '@apollo/client';
const defaultOptions = {} as const;
export type CreateProjectBidMutationVariables = Types.Exact<{
  data: Types.CreateProjectBidInput;
}>;


export type CreateProjectBidMutation = { __typename?: 'Mutation', createProjectBid: boolean };

export type CreateProjectMutationVariables = Types.Exact<{
  data: Types.CreateProjectInput;
}>;


export type CreateProjectMutation = { __typename?: 'Mutation', createProject: boolean };

export type UploadProjectDesignMutationVariables = Types.Exact<{
  file: Types.Scalars['Upload'];
}>;


export type UploadProjectDesignMutation = { __typename?: 'Mutation', uploadProjectDesign: { __typename?: 'UploadProjectDesignResponse', filename: string, designId: string, url: string } };


export const CreateProjectBidDocument = gql`
    mutation CreateProjectBid($data: CreateProjectBidInput!) {
  createProjectBid(data: $data)
}
    `;
export type CreateProjectBidMutationFn = Apollo.MutationFunction<CreateProjectBidMutation, CreateProjectBidMutationVariables>;

/**
 * __useCreateProjectBidMutation__
 *
 * To run a mutation, you first call `useCreateProjectBidMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useCreateProjectBidMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [createProjectBidMutation, { data, loading, error }] = useCreateProjectBidMutation({
 *   variables: {
 *      data: // value for 'data'
 *   },
 * });
 */
export function useCreateProjectBidMutation(baseOptions?: Apollo.MutationHookOptions<CreateProjectBidMutation, CreateProjectBidMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<CreateProjectBidMutation, CreateProjectBidMutationVariables>(CreateProjectBidDocument, options);
      }
export type CreateProjectBidMutationHookResult = ReturnType<typeof useCreateProjectBidMutation>;
export type CreateProjectBidMutationResult = Apollo.MutationResult<CreateProjectBidMutation>;
export type CreateProjectBidMutationOptions = Apollo.BaseMutationOptions<CreateProjectBidMutation, CreateProjectBidMutationVariables>;
export const CreateProjectDocument = gql`
    mutation createProject($data: CreateProjectInput!) {
  createProject(data: $data)
}
    `;
export type CreateProjectMutationFn = Apollo.MutationFunction<CreateProjectMutation, CreateProjectMutationVariables>;

/**
 * __useCreateProjectMutation__
 *
 * To run a mutation, you first call `useCreateProjectMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useCreateProjectMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [createProjectMutation, { data, loading, error }] = useCreateProjectMutation({
 *   variables: {
 *      data: // value for 'data'
 *   },
 * });
 */
export function useCreateProjectMutation(baseOptions?: Apollo.MutationHookOptions<CreateProjectMutation, CreateProjectMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<CreateProjectMutation, CreateProjectMutationVariables>(CreateProjectDocument, options);
      }
export type CreateProjectMutationHookResult = ReturnType<typeof useCreateProjectMutation>;
export type CreateProjectMutationResult = Apollo.MutationResult<CreateProjectMutation>;
export type CreateProjectMutationOptions = Apollo.BaseMutationOptions<CreateProjectMutation, CreateProjectMutationVariables>;
export const UploadProjectDesignDocument = gql`
    mutation uploadProjectDesign($file: Upload!) {
  uploadProjectDesign(file: $file) {
    filename
    designId
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