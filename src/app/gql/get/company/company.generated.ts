// THIS FILE IS GENERATED. DO NOT EDIT.
import * as Types from '../../../../generated/graphql';

import { gql } from '@apollo/client';
import * as Apollo from '@apollo/client';
const defaultOptions = {} as const;
export type GetAllUsersWithinCompanyQueryVariables = Types.Exact<{
  companyId: Types.Scalars['String'];
}>;


export type GetAllUsersWithinCompanyQuery = { __typename?: 'Query', getAllUsersWithinCompany: Array<{ __typename?: 'User', id: string, email: string, name: string }> };

export type GetCompanyPlanWithCompanyIdQueryVariables = Types.Exact<{
  companyId: Types.Scalars['String'];
}>;


export type GetCompanyPlanWithCompanyIdQuery = { __typename?: 'Query', getCompanyPlanWithCompanyId: { __typename?: 'CompanyPlanDetail', tier: Types.PlanTier, price: number, billingFrequency: string, memberSince: string, subscriptionStartDate: string, subscriptionEndDate: string, trialStartDate?: string | null, trialEndDate?: string | null } };

export type GetCompanyDetailQueryVariables = Types.Exact<{
  companyId: Types.Scalars['String'];
}>;


export type GetCompanyDetailQuery = { __typename?: 'Query', getCompanyDetail?: { __typename?: 'CompanyDetail', id: string, name: string, contactEmail: string, logo?: string | null, phone: string, fax?: string | null, country: string, isActive: boolean, isVendor: boolean, isVerified: boolean, companyUrl?: string | null, locations?: Array<string> | null, materials?: Array<string> | null, moq?: string | null, leadTime?: number | null } | null };

export type GetAllPlansQueryVariables = Types.Exact<{
  isVendor: Types.Scalars['Boolean'];
}>;


export type GetAllPlansQuery = { __typename?: 'Query', getAllPlans: Array<{ __typename?: 'Plan', id: string, isVendor: boolean, companySize?: Types.CompanySize | null, tier: Types.PlanTier, pricings: { __typename?: 'Pricings', monthly?: { __typename?: 'PricingDetail', price: number, priceId: string } | null, annual?: { __typename?: 'PricingDetail', price: number, priceId: string } | null, perUser: { __typename?: 'PricingDetail', price: number, priceId: string } } }> };


export const GetAllUsersWithinCompanyDocument = gql`
    query getAllUsersWithinCompany($companyId: String!) {
  getAllUsersWithinCompany(companyId: $companyId) {
    id
    email
    name
  }
}
    `;

/**
 * __useGetAllUsersWithinCompanyQuery__
 *
 * To run a query within a React component, call `useGetAllUsersWithinCompanyQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetAllUsersWithinCompanyQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetAllUsersWithinCompanyQuery({
 *   variables: {
 *      companyId: // value for 'companyId'
 *   },
 * });
 */
export function useGetAllUsersWithinCompanyQuery(baseOptions: Apollo.QueryHookOptions<GetAllUsersWithinCompanyQuery, GetAllUsersWithinCompanyQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<GetAllUsersWithinCompanyQuery, GetAllUsersWithinCompanyQueryVariables>(GetAllUsersWithinCompanyDocument, options);
      }
export function useGetAllUsersWithinCompanyLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<GetAllUsersWithinCompanyQuery, GetAllUsersWithinCompanyQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<GetAllUsersWithinCompanyQuery, GetAllUsersWithinCompanyQueryVariables>(GetAllUsersWithinCompanyDocument, options);
        }
export type GetAllUsersWithinCompanyQueryHookResult = ReturnType<typeof useGetAllUsersWithinCompanyQuery>;
export type GetAllUsersWithinCompanyLazyQueryHookResult = ReturnType<typeof useGetAllUsersWithinCompanyLazyQuery>;
export type GetAllUsersWithinCompanyQueryResult = Apollo.QueryResult<GetAllUsersWithinCompanyQuery, GetAllUsersWithinCompanyQueryVariables>;
export const GetCompanyPlanWithCompanyIdDocument = gql`
    query getCompanyPlanWithCompanyId($companyId: String!) {
  getCompanyPlanWithCompanyId(companyId: $companyId) {
    tier
    price
    billingFrequency
    memberSince
    subscriptionStartDate
    subscriptionEndDate
    trialStartDate
    trialEndDate
  }
}
    `;

/**
 * __useGetCompanyPlanWithCompanyIdQuery__
 *
 * To run a query within a React component, call `useGetCompanyPlanWithCompanyIdQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetCompanyPlanWithCompanyIdQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetCompanyPlanWithCompanyIdQuery({
 *   variables: {
 *      companyId: // value for 'companyId'
 *   },
 * });
 */
export function useGetCompanyPlanWithCompanyIdQuery(baseOptions: Apollo.QueryHookOptions<GetCompanyPlanWithCompanyIdQuery, GetCompanyPlanWithCompanyIdQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<GetCompanyPlanWithCompanyIdQuery, GetCompanyPlanWithCompanyIdQueryVariables>(GetCompanyPlanWithCompanyIdDocument, options);
      }
export function useGetCompanyPlanWithCompanyIdLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<GetCompanyPlanWithCompanyIdQuery, GetCompanyPlanWithCompanyIdQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<GetCompanyPlanWithCompanyIdQuery, GetCompanyPlanWithCompanyIdQueryVariables>(GetCompanyPlanWithCompanyIdDocument, options);
        }
export type GetCompanyPlanWithCompanyIdQueryHookResult = ReturnType<typeof useGetCompanyPlanWithCompanyIdQuery>;
export type GetCompanyPlanWithCompanyIdLazyQueryHookResult = ReturnType<typeof useGetCompanyPlanWithCompanyIdLazyQuery>;
export type GetCompanyPlanWithCompanyIdQueryResult = Apollo.QueryResult<GetCompanyPlanWithCompanyIdQuery, GetCompanyPlanWithCompanyIdQueryVariables>;
export const GetCompanyDetailDocument = gql`
    query getCompanyDetail($companyId: String!) {
  getCompanyDetail(companyId: $companyId) {
    id
    name
    contactEmail
    logo
    phone
    fax
    country
    isActive
    isVendor
    isVerified
    companyUrl
    locations
    materials
    moq
    leadTime
  }
}
    `;

/**
 * __useGetCompanyDetailQuery__
 *
 * To run a query within a React component, call `useGetCompanyDetailQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetCompanyDetailQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetCompanyDetailQuery({
 *   variables: {
 *      companyId: // value for 'companyId'
 *   },
 * });
 */
export function useGetCompanyDetailQuery(baseOptions: Apollo.QueryHookOptions<GetCompanyDetailQuery, GetCompanyDetailQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<GetCompanyDetailQuery, GetCompanyDetailQueryVariables>(GetCompanyDetailDocument, options);
      }
export function useGetCompanyDetailLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<GetCompanyDetailQuery, GetCompanyDetailQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<GetCompanyDetailQuery, GetCompanyDetailQueryVariables>(GetCompanyDetailDocument, options);
        }
export type GetCompanyDetailQueryHookResult = ReturnType<typeof useGetCompanyDetailQuery>;
export type GetCompanyDetailLazyQueryHookResult = ReturnType<typeof useGetCompanyDetailLazyQuery>;
export type GetCompanyDetailQueryResult = Apollo.QueryResult<GetCompanyDetailQuery, GetCompanyDetailQueryVariables>;
export const GetAllPlansDocument = gql`
    query getAllPlans($isVendor: Boolean!) {
  getAllPlans(isVendor: $isVendor) {
    id
    isVendor
    companySize
    tier
    pricings {
      monthly {
        price
        priceId
      }
      annual {
        price
        priceId
      }
      perUser {
        price
        priceId
      }
    }
  }
}
    `;

/**
 * __useGetAllPlansQuery__
 *
 * To run a query within a React component, call `useGetAllPlansQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetAllPlansQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetAllPlansQuery({
 *   variables: {
 *      isVendor: // value for 'isVendor'
 *   },
 * });
 */
export function useGetAllPlansQuery(baseOptions: Apollo.QueryHookOptions<GetAllPlansQuery, GetAllPlansQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<GetAllPlansQuery, GetAllPlansQueryVariables>(GetAllPlansDocument, options);
      }
export function useGetAllPlansLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<GetAllPlansQuery, GetAllPlansQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<GetAllPlansQuery, GetAllPlansQueryVariables>(GetAllPlansDocument, options);
        }
export type GetAllPlansQueryHookResult = ReturnType<typeof useGetAllPlansQuery>;
export type GetAllPlansLazyQueryHookResult = ReturnType<typeof useGetAllPlansLazyQuery>;
export type GetAllPlansQueryResult = Apollo.QueryResult<GetAllPlansQuery, GetAllPlansQueryVariables>;