import { gql } from "@apollo/client";

const GET_ALL_USERS_WITHIN_COMPANY = gql`
  query getAllUsersWithinCompany($data: GetAllUsersWithinCompanyInput!) {
    getAllUsersWithinCompany(data: $data) {
      id
      email
      name
    }
  }
`;


const GET_COMPANY_PLAN_DETAIL= gql`
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

const GET_COMPANY_DETAIL = gql`
  query getCompanyDetail($data: GetCompanyDetailInput!) {
    getCompanyDetail(data: $data) {
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
      products
      moq
      leadTime
    }
  }
`;


const GET_ALL_PLANS = gql`
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