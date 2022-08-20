import { gql, useQuery } from "@apollo/client";
import { useContext } from "react";
import { AuthContext } from "../../../context/AuthContext";
import { GetAllCompanyUsersData, GetAllCompanyUsersInput, GetCompanyDetailData, GetCompanyPlanData, GetCompanyPlanInput } from "../types/company/getCompanyTypes";
import { LoggedInUser } from "../types/user/userTypes";

const GET_ALL_COMPANY_USERS = gql`
  query getAllUsersWithinCompany($companyId: String) {
    getAllUsersWithinCompany(companyId: $companyId) {
      id
      email
      name
    }
  }
`;

export const useGetAllCompanyUsers = (companyId: string) => {
    const  { data: getAllCompanyUsersData, error: getAllCompanyUsersError, loading: getAllCompanyUsersLoading } = useQuery<GetAllCompanyUsersData, GetAllCompanyUsersInput>(GET_ALL_COMPANY_USERS, {
        variables: {
          companyId
        },
        fetchPolicy: "no-cache"
    });

    return {
        getAllCompanyUsersData,
        getAllCompanyUsersError,
        getAllCompanyUsersLoading
    }
}

const GET_COMPANY_PLAN = gql`
  query getCompanyPlanWithCompanyId($companyId: String) {
    getCompanyPlanWithCompanyId(companyId: $companyId) {
      name
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
 * Gets company plan details
 * @param {string} companyId
 * @returns
 */
export const useGetCompanyPlan = (companyId: string) => {
  const {
    data: getCompanyPlanData,
    error: getCompanyPlanError,
    loading: getCompanyPlanLoading,
  } = useQuery<GetCompanyPlanData, GetCompanyPlanInput>(GET_COMPANY_PLAN, {
    variables: {
      companyId,
    },
  });

  return {
    getCompanyPlanData,
    getCompanyPlanError,
    getCompanyPlanLoading,
  };
};

const GET_COMPANY_DETAIL = gql`
  query getCompanyDetail($companyId: String) {
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

export const useGetCompanyDetail = () => {
  const { user }: {user: LoggedInUser | null} = useContext(AuthContext);

  const {
    error: getCompanyDetailError,
    loading: getCompanyDetailLoading,
    data: getCompanyDetailData,
    refetch: getCompanyDetailRefetch,
  } = useQuery<GetCompanyDetailData>(GET_COMPANY_DETAIL, {
    variables: {
      companyId: user!.companyId,
    },
  });

  return {
    getCompanyDetailRefetch,
    getCompanyDetailError,
    getCompanyDetailData,
    getCompanyDetailLoading,
  };
};