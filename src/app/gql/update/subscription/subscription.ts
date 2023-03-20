import { gql } from "@apollo/client";

const UPDATE_CUSTOMER_UPGRADE_TO_PAID_PLAN = gql`
  mutation updateCustomerUpgradeToPaidPlan($data: UpdateCustomerUpgradeToPaidPlanInput!) {
    updateCustomerUpgradeToPaidPlan(data: $data)
  }
`