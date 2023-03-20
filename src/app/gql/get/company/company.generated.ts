// THIS FILE IS GENERATED. DO NOT EDIT.
import * as Types from '../../../../generated/graphql';

import { gql } from '@apollo/client';
import { UserFragmentFragmentDoc } from '../user/user.generated';
import * as Apollo from '@apollo/client';
const defaultOptions = {} as const;
export type GetAllUsersWithinCompanyQueryVariables = Types.Exact<{
  data: Types.GetAllUsersWithinCompanyInput;
}>;


export type GetAllUsersWithinCompanyQuery = { __typename?: 'Query', getAllUsersWithinCompany: Array<{ __typename?: 'GenericUser', status: Types.UserStatus, id: string, name: string, email: string, companyId: string, isVendor: boolean, power: Types.UserPower }> };

export type GetCompanyPlanQueryVariables = Types.Exact<{
  data: Types.GetCompanyPlanInput;
}>;


export type GetCompanyPlanQuery = { __typename?: 'Query', getCompanyPlan?: { __typename?: 'CompanyPlan', planType: Types.CompanyPlanType } | null };

export type GetAllPlansQueryVariables = Types.Exact<{
  data: Types.GetAllPlansInput;
}>;


export type GetAllPlansQuery = { __typename?: 'Query', getAllPlans: Array<{ __typename?: 'Plan', id: string, isVendor: boolean, companySize?: Types.CompanySize | null, tier: Types.PlanTier, pricings: { __typename?: 'Pricings', monthly?: { __typename?: 'PricingDetail', price: number, priceId: string } | null, annual?: { __typename?: 'PricingDetail', price: number, priceId: string } | null, perUser: { __typename?: 'PricingDetail', price: number, priceId: string } } }> };


export const GetAllUsersWithinCompanyDocument = gql`
    query getAllUsersWithinCompany($data: GetAllUsersWithinCompanyInput!) {
  getAllUsersWithinCompany(data: $data) {
    ...UserFragment
    status
  }
}
    ${UserFragmentFragmentDoc}`;

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
export const GetCompanyPlanDocument = gql`
    query getCompanyPlan($data: GetCompanyPlanInput!) {
  getCompanyPlan(data: $data) {
    planType
  }
}
    `;

/**
 * __useGetCompanyPlanQuery__
 *
 * To run a query within a React component, call `useGetCompanyPlanQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetCompanyPlanQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetCompanyPlanQuery({
 *   variables: {
 *      data: // value for 'data'
 *   },
 * });
 */
export function useGetCompanyPlanQuery(baseOptions: Apollo.QueryHookOptions<GetCompanyPlanQuery, GetCompanyPlanQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<GetCompanyPlanQuery, GetCompanyPlanQueryVariables>(GetCompanyPlanDocument, options);
      }
export function useGetCompanyPlanLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<GetCompanyPlanQuery, GetCompanyPlanQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<GetCompanyPlanQuery, GetCompanyPlanQueryVariables>(GetCompanyPlanDocument, options);
        }
export type GetCompanyPlanQueryHookResult = ReturnType<typeof useGetCompanyPlanQuery>;
export type GetCompanyPlanLazyQueryHookResult = ReturnType<typeof useGetCompanyPlanLazyQuery>;
export type GetCompanyPlanQueryResult = Apollo.QueryResult<GetCompanyPlanQuery, GetCompanyPlanQueryVariables>;
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