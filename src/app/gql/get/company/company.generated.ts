// THIS FILE IS GENERATED. DO NOT EDIT.
import * as Types from '../../../../generated/graphql';

import { gql } from '@apollo/client';
import * as Apollo from '@apollo/client';
const defaultOptions = {} as const;
export type GetAllUsersWithinCompanyQueryVariables = Types.Exact<{
  data: Types.GetAllUsersWithinCompanyInput;
}>;


export type GetAllUsersWithinCompanyQuery = { __typename?: 'Query', getAllUsersWithinCompany: Array<{ __typename?: 'User', id: string, email: string, name: string }> };

export type GetCompanyPlanDetailQueryVariables = Types.Exact<{
  data: Types.GetCompanyPlanDetailInput;
}>;


export type GetCompanyPlanDetailQuery = { __typename?: 'Query', getCompanyPlanDetail: { __typename?: 'CompanyPlanDetail', tier: Types.PlanTier, price: number, billingFrequency: string, memberSince: string, subscriptionStartDate: string, subscriptionEndDate: string, trialStartDate?: string | null, trialEndDate?: string | null } };

export type GetAllPlansQueryVariables = Types.Exact<{
  data: Types.GetAllPlansInput;
}>;


export type GetAllPlansQuery = { __typename?: 'Query', getAllPlans: Array<{ __typename?: 'Plan', id: string, isVendor: boolean, companySize?: Types.CompanySize | null, tier: Types.PlanTier, pricings: { __typename?: 'Pricings', monthly?: { __typename?: 'PricingDetail', price: number, priceId: string } | null, annual?: { __typename?: 'PricingDetail', price: number, priceId: string } | null, perUser: { __typename?: 'PricingDetail', price: number, priceId: string } } }> };


export const GetAllUsersWithinCompanyDocument = gql`
    query getAllUsersWithinCompany($data: GetAllUsersWithinCompanyInput!) {
  getAllUsersWithinCompany(data: $data) {
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
 *      data: // value for 'data'
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
export const GetCompanyPlanDetailDocument = gql`
    query getCompanyPlanDetail($data: GetCompanyPlanDetailInput!) {
  getCompanyPlanDetail(data: $data) {
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
 * __useGetCompanyPlanDetailQuery__
 *
 * To run a query within a React component, call `useGetCompanyPlanDetailQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetCompanyPlanDetailQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetCompanyPlanDetailQuery({
 *   variables: {
 *      data: // value for 'data'
 *   },
 * });
 */
export function useGetCompanyPlanDetailQuery(baseOptions: Apollo.QueryHookOptions<GetCompanyPlanDetailQuery, GetCompanyPlanDetailQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<GetCompanyPlanDetailQuery, GetCompanyPlanDetailQueryVariables>(GetCompanyPlanDetailDocument, options);
      }
export function useGetCompanyPlanDetailLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<GetCompanyPlanDetailQuery, GetCompanyPlanDetailQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<GetCompanyPlanDetailQuery, GetCompanyPlanDetailQueryVariables>(GetCompanyPlanDetailDocument, options);
        }
export type GetCompanyPlanDetailQueryHookResult = ReturnType<typeof useGetCompanyPlanDetailQuery>;
export type GetCompanyPlanDetailLazyQueryHookResult = ReturnType<typeof useGetCompanyPlanDetailLazyQuery>;
export type GetCompanyPlanDetailQueryResult = Apollo.QueryResult<GetCompanyPlanDetailQuery, GetCompanyPlanDetailQueryVariables>;
export const GetAllPlansDocument = gql`
    query getAllPlans($data: GetAllPlansInput!) {
  getAllPlans(data: $data) {
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
 *      data: // value for 'data'
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