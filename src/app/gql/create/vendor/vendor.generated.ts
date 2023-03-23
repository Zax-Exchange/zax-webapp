// THIS FILE IS GENERATED. DO NOT EDIT.
import * as Types from '../../../../generated/graphql';

import { gql } from '@apollo/client';
import * as Apollo from '@apollo/client';
const defaultOptions = {} as const;
export type CreateVendorMutationVariables = Types.Exact<{
  data: Types.CreateVendorInput;
}>;


export type CreateVendorMutation = { __typename?: 'Mutation', createVendor: string };

export type CreateVendorSubscriptionMutationVariables = Types.Exact<{
  data: Types.CreateVendorSubscriptionInput;
}>;


export type CreateVendorSubscriptionMutation = { __typename?: 'Mutation', createVendorSubscription: { __typename?: 'StripeSubscription', clientSecret: string, subscriptionId: string } };

export type CreateInvoiceMutationVariables = Types.Exact<{
  data: Types.CreateInvoiceInput;
}>;


export type CreateInvoiceMutation = { __typename?: 'Mutation', createInvoice: boolean };

export type CreateGuestProjectLinkMutationVariables = Types.Exact<{
  data: Types.CreateGuestProjectLinkInput;
}>;


export type CreateGuestProjectLinkMutation = { __typename?: 'Mutation', createGuestProjectLink: boolean };

export type CreateCertificationsMutationVariables = Types.Exact<{
  data: Types.CreateCertificationsInput;
}>;


export type CreateCertificationsMutation = { __typename?: 'Mutation', createCertifications: boolean };

export type CreateFactoryMutationVariables = Types.Exact<{
  data: Types.CreateFactoryInput;
}>;


export type CreateFactoryMutation = { __typename?: 'Mutation', createFactory: boolean };


export const CreateVendorDocument = gql`
    mutation createVendor($data: CreateVendorInput!) {
  createVendor(data: $data)
}
    `;
export type CreateVendorMutationFn = Apollo.MutationFunction<CreateVendorMutation, CreateVendorMutationVariables>;

/**
 * __useCreateVendorMutation__
 *
 * To run a mutation, you first call `useCreateVendorMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useCreateVendorMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [createVendorMutation, { data, loading, error }] = useCreateVendorMutation({
 *   variables: {
 *      data: // value for 'data'
 *   },
 * });
 */
export function useCreateVendorMutation(baseOptions?: Apollo.MutationHookOptions<CreateVendorMutation, CreateVendorMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<CreateVendorMutation, CreateVendorMutationVariables>(CreateVendorDocument, options);
      }
export type CreateVendorMutationHookResult = ReturnType<typeof useCreateVendorMutation>;
export type CreateVendorMutationResult = Apollo.MutationResult<CreateVendorMutation>;
export type CreateVendorMutationOptions = Apollo.BaseMutationOptions<CreateVendorMutation, CreateVendorMutationVariables>;
export const CreateVendorSubscriptionDocument = gql`
    mutation createVendorSubscription($data: CreateVendorSubscriptionInput!) {
  createVendorSubscription(data: $data) {
    clientSecret
    subscriptionId
  }
}
    `;
export type CreateVendorSubscriptionMutationFn = Apollo.MutationFunction<CreateVendorSubscriptionMutation, CreateVendorSubscriptionMutationVariables>;

/**
 * __useCreateVendorSubscriptionMutation__
 *
 * To run a mutation, you first call `useCreateVendorSubscriptionMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useCreateVendorSubscriptionMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [createVendorSubscriptionMutation, { data, loading, error }] = useCreateVendorSubscriptionMutation({
 *   variables: {
 *      data: // value for 'data'
 *   },
 * });
 */
export function useCreateVendorSubscriptionMutation(baseOptions?: Apollo.MutationHookOptions<CreateVendorSubscriptionMutation, CreateVendorSubscriptionMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<CreateVendorSubscriptionMutation, CreateVendorSubscriptionMutationVariables>(CreateVendorSubscriptionDocument, options);
      }
export type CreateVendorSubscriptionMutationHookResult = ReturnType<typeof useCreateVendorSubscriptionMutation>;
export type CreateVendorSubscriptionMutationResult = Apollo.MutationResult<CreateVendorSubscriptionMutation>;
export type CreateVendorSubscriptionMutationOptions = Apollo.BaseMutationOptions<CreateVendorSubscriptionMutation, CreateVendorSubscriptionMutationVariables>;
export const CreateInvoiceDocument = gql`
    mutation createInvoice($data: CreateInvoiceInput!) {
  createInvoice(data: $data)
}
    `;
export type CreateInvoiceMutationFn = Apollo.MutationFunction<CreateInvoiceMutation, CreateInvoiceMutationVariables>;

/**
 * __useCreateInvoiceMutation__
 *
 * To run a mutation, you first call `useCreateInvoiceMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useCreateInvoiceMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [createInvoiceMutation, { data, loading, error }] = useCreateInvoiceMutation({
 *   variables: {
 *      data: // value for 'data'
 *   },
 * });
 */
export function useCreateInvoiceMutation(baseOptions?: Apollo.MutationHookOptions<CreateInvoiceMutation, CreateInvoiceMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<CreateInvoiceMutation, CreateInvoiceMutationVariables>(CreateInvoiceDocument, options);
      }
export type CreateInvoiceMutationHookResult = ReturnType<typeof useCreateInvoiceMutation>;
export type CreateInvoiceMutationResult = Apollo.MutationResult<CreateInvoiceMutation>;
export type CreateInvoiceMutationOptions = Apollo.BaseMutationOptions<CreateInvoiceMutation, CreateInvoiceMutationVariables>;
export const CreateGuestProjectLinkDocument = gql`
    mutation createGuestProjectLink($data: CreateGuestProjectLinkInput!) {
  createGuestProjectLink(data: $data)
}
    `;
export type CreateGuestProjectLinkMutationFn = Apollo.MutationFunction<CreateGuestProjectLinkMutation, CreateGuestProjectLinkMutationVariables>;

/**
 * __useCreateGuestProjectLinkMutation__
 *
 * To run a mutation, you first call `useCreateGuestProjectLinkMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useCreateGuestProjectLinkMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [createGuestProjectLinkMutation, { data, loading, error }] = useCreateGuestProjectLinkMutation({
 *   variables: {
 *      data: // value for 'data'
 *   },
 * });
 */
export function useCreateGuestProjectLinkMutation(baseOptions?: Apollo.MutationHookOptions<CreateGuestProjectLinkMutation, CreateGuestProjectLinkMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<CreateGuestProjectLinkMutation, CreateGuestProjectLinkMutationVariables>(CreateGuestProjectLinkDocument, options);
      }
export type CreateGuestProjectLinkMutationHookResult = ReturnType<typeof useCreateGuestProjectLinkMutation>;
export type CreateGuestProjectLinkMutationResult = Apollo.MutationResult<CreateGuestProjectLinkMutation>;
export type CreateGuestProjectLinkMutationOptions = Apollo.BaseMutationOptions<CreateGuestProjectLinkMutation, CreateGuestProjectLinkMutationVariables>;
export const CreateCertificationsDocument = gql`
    mutation createCertifications($data: CreateCertificationsInput!) {
  createCertifications(data: $data)
}
    `;
export type CreateCertificationsMutationFn = Apollo.MutationFunction<CreateCertificationsMutation, CreateCertificationsMutationVariables>;

/**
 * __useCreateCertificationsMutation__
 *
 * To run a mutation, you first call `useCreateCertificationsMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useCreateCertificationsMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [createCertificationsMutation, { data, loading, error }] = useCreateCertificationsMutation({
 *   variables: {
 *      data: // value for 'data'
 *   },
 * });
 */
export function useCreateCertificationsMutation(baseOptions?: Apollo.MutationHookOptions<CreateCertificationsMutation, CreateCertificationsMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<CreateCertificationsMutation, CreateCertificationsMutationVariables>(CreateCertificationsDocument, options);
      }
export type CreateCertificationsMutationHookResult = ReturnType<typeof useCreateCertificationsMutation>;
export type CreateCertificationsMutationResult = Apollo.MutationResult<CreateCertificationsMutation>;
export type CreateCertificationsMutationOptions = Apollo.BaseMutationOptions<CreateCertificationsMutation, CreateCertificationsMutationVariables>;
export const CreateFactoryDocument = gql`
    mutation createFactory($data: CreateFactoryInput!) {
  createFactory(data: $data)
}
    `;
export type CreateFactoryMutationFn = Apollo.MutationFunction<CreateFactoryMutation, CreateFactoryMutationVariables>;

/**
 * __useCreateFactoryMutation__
 *
 * To run a mutation, you first call `useCreateFactoryMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useCreateFactoryMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [createFactoryMutation, { data, loading, error }] = useCreateFactoryMutation({
 *   variables: {
 *      data: // value for 'data'
 *   },
 * });
 */
export function useCreateFactoryMutation(baseOptions?: Apollo.MutationHookOptions<CreateFactoryMutation, CreateFactoryMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<CreateFactoryMutation, CreateFactoryMutationVariables>(CreateFactoryDocument, options);
      }
export type CreateFactoryMutationHookResult = ReturnType<typeof useCreateFactoryMutation>;
export type CreateFactoryMutationResult = Apollo.MutationResult<CreateFactoryMutation>;
export type CreateFactoryMutationOptions = Apollo.BaseMutationOptions<CreateFactoryMutation, CreateFactoryMutationVariables>;