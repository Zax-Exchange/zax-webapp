import { gql } from "@apollo/client";
import { USER_FRAGMENT } from "../user/user";

const GET_ALL_USERS_WITHIN_COMPANY = gql`
${USER_FRAGMENT}
  query getAllUsersWithinCompany($data: GetAllUsersWithinCompanyInput!) {
    getAllUsersWithinCompany(data: $data) {
      ...UserFragment
      status
    }
  }
`;


// const GET_COMPANY_PLAN_DETAIL= gql`
//   query getCompanyPlanDetail($data: GetCompanyPlanDetailInput!) {
//     getCompanyPlanDetail(data: $data) {
//       tier
//       price
//       billingFrequency
//       memberSince
//       subscriptionStartDate
//       subscriptionEndDate
//       trialStartDate
//       trialEndDate
//     }
//   }
// `;

const GET_COMPANY_PLAN_TYPE = gql`
  query getCompanyPlan($data: GetCompanyPlanInput!) {
    getCompanyPlan(data: $data) {
      planType
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