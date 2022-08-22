import { gql } from "@apollo/client";

const GET_ALL_COMPANY_USERS = gql`
  query getAllUsersWithinCompany($companyId: String!) {
    getAllUsersWithinCompany(companyId: $companyId) {
      id
      email
      name
    }
  }
`;


const GET_COMPANY_PLAN = gql`
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

const GET_COMPANY_DETAIL = gql`
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


const GET_ALL_PLANS = gql`
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